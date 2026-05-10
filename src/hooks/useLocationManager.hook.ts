import { useState, useMemo } from "react";
import { useLoaderData, useFetcher } from "react-router-dom";
import type { Location } from "../types/location.entity";
import type { Vehicle } from "../types/vehicle.entity";

export type SortKey = "id" | "name" | "inventory";

export const PAGE_SIZE = 8;

export function useLocationManager() {
  const { locations, vehicles } = useLoaderData() as {
    locations: Location[];
    vehicles: Vehicle[];
  };
  const deleteFetcher = useFetcher();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("id");
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [managingLocation, setManagingLocation] = useState<Location | null>(null);

  const isDeletingId =
    deleteFetcher.state !== "idle" ? Number(deleteFetcher.formData?.get("locationId")) : null;

  const filtered = useMemo(() => {
    return (locations ?? [])
      .filter((loc) => loc.locationId !== isDeletingId)
      .filter((loc) => {
        const haystack = `${loc.depotName} ${loc.phoneNumber}`.toLowerCase();
        return haystack.includes(search.toLowerCase());
      })
      .sort((a, b) => {
        if (sortBy === "id") return a.locationId - b.locationId;
        if (sortBy === "name") return a.depotName.localeCompare(b.depotName);
        if (sortBy === "inventory") return b.inventory.length - a.inventory.length;
        return 0;
      });
  }, [locations, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const stats = {
    total: locations.length,
    totalVehiclesAssigned: locations.reduce((sum, loc) => sum + loc.inventory.length, 0),
    avgInventory:
      locations.length > 0
        ? Math.round(
            locations.reduce((sum, loc) => sum + loc.inventory.length, 0) / locations.length,
          )
        : 0,
    // Vehicles not yet assigned to any location
    unassigned: vehicles.filter(
      (v) => !locations.some((loc) => loc.inventory.some((inv) => inv.vehicleId === v.vehicleId)),
    ).length,
  };

  function handleDelete(loc: Location) {
    if (!window.confirm(`Delete ${loc.depotName} This cannot be undone.`)) return;
    const fd = new FormData();
    fd.append("locationId", String(loc.locationId));
    deleteFetcher.submit(fd, {
      method: "POST",
      action: "/superAdmin/locations/delete",
    });
  }

  return {
    showCreateModal,
    setShowCreateModal,
    managingLocation,
    setManagingLocation,
    search,
    setSearch,
    sortBy,
    setSortBy,
    setPage,
    totalPages,
    safePage,
    slice,
    filtered,
    stats,
    vehicles,
    handleDelete,
  };
}
