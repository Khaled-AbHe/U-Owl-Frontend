import { useState, useMemo } from "react";
import { useLoaderData, useFetcher } from "react-router-dom";
import type { Location } from "../../types/location.entity";
import type { Vehicle } from "../../types/vehicle.entity";
import { MapPin, Truck, BarChart2, AlertCircle } from "lucide-react";
import { LIST_SIZE } from "../../pages/Admin/Super/manager.utils";

export type SortKey = "id" | "name" | "inventory";

export function useLocationManager() {
  //// Data
  const { locations, vehicles } = useLoaderData() as {
    locations: Location[];
    vehicles: Vehicle[];
  };
  const deleteFetcher = useFetcher();

  //// UI
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("id");
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [managingLocation, setManagingLocation] = useState<Location | null>(null);

  //// List
  const isDeletingId =
    deleteFetcher.state !== "idle" ? Number(deleteFetcher.formData?.get("locationId")) : null;

  // useMemo caches the result of a calculation between re-renders, which makes things faster
  const filtered = useMemo(() => {
    return (
      locations
        .filter((loc) => loc.locationId !== isDeletingId) // removes the object thats being deleted
        // filter for the search bar
        .filter((loc) => {
          const haystack = `${loc.depotName} ${loc.phoneNumber}`.toLowerCase(); // creates a reference
          return haystack.includes(search.toLowerCase()); // returns elements that contains what you search based on the reference
        })
        .sort((a, b) => {
          if (sortBy === "id") return a.locationId - b.locationId;
          if (sortBy === "name") return a.depotName.localeCompare(b.depotName);
          if (sortBy === "inventory") return b.inventory.length - a.inventory.length;
          return 0;
        })
    );
  }, [locations, search, sortBy, isDeletingId]); // it will only recalculate if these variables change

  const totalPages = Math.max(1, Math.ceil(filtered.length / LIST_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleRows = filtered.slice((currentPage - 1) * LIST_SIZE, currentPage * LIST_SIZE);

  //// Stats
  const stats = [
    {
      label: "Total locations",
      count: locations.length,
      icon: MapPin,
    },
    {
      label: "Vehicles assigned",
      count: locations.reduce((sum, loc) => sum + loc.inventory.length, 0),
      icon: Truck,
    },
    {
      label: "Avg per location",
      count:
        locations.length > 0
          ? Math.round(
              locations.reduce((sum, loc) => sum + loc.inventory.length, 0) / locations.length,
            )
          : 0,
      icon: BarChart2,
    },
    {
      label: "Unassigned vehicles",
      count: vehicles.filter(
        (v) => !locations.some((loc) => loc.inventory.some((inv) => inv.vehicleId === v.vehicleId)),
      ).length,
      icon: AlertCircle,
    },
  ];

  //// Handlers
  function handleDelete(loc: Location) {
    if (!window.confirm(`Delete ${loc.depotName}? This cannot be undone.`)) return;
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
    editingLocation,
    setEditingLocation,
    managingLocation,
    setManagingLocation,
    search,
    setSearch,
    sortBy,
    setSortBy,
    setPage,
    totalPages,
    currentPage,
    visibleRows,
    filtered,
    vehicles,
    stats,
    handleDelete,
  };
}
