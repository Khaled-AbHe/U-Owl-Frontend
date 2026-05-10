import { useState, useMemo } from "react";
import { useLoaderData, useFetcher } from "react-router-dom";
import type { Vehicle } from "../types/vehicle.entity";
import { List, Truck, Container, CalendarClock } from "lucide-react";
import { LIST_SIZE } from "../pages/Admin/Super/manager.utils";

export type TypeFilter = "" | "Truck" | "Trailer";
export type SortKey = "id" | "plate" | "type" | "subtype" | "cost";

export function useVehicleManager() {
  const { vehicles } = useLoaderData() as { vehicles: Vehicle[] };
  const deleteFetcher = useFetcher();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("");
  const [sortBy, setSortBy] = useState<SortKey>("id");
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const isDeletingId =
    deleteFetcher.state !== "idle" ? Number(deleteFetcher.formData?.get("vehicleId")) : null;

  const filtered = useMemo(() => {
    return vehicles
      .filter((v) => v.vehicleId !== isDeletingId)
      .filter((v) => {
        const haystack = `${v.licensePlate} ${v.vehicleType} ${v.vehicleSubtype}`.toLowerCase();
        return (
          haystack.includes(search.toLowerCase()) && (!typeFilter || v.vehicleType === typeFilter)
        );
      })
      .sort((a, b) => {
        if (sortBy === "id") return a.vehicleId - b.vehicleId;
        if (sortBy === "plate") return a.licensePlate.localeCompare(b.licensePlate);
        if (sortBy === "type") return a.vehicleType.localeCompare(b.vehicleType);
        if (sortBy === "subtype") return a.vehicleSubtype.localeCompare(b.vehicleSubtype);
        if (sortBy === "cost") return a.costPerKm - b.costPerKm;
        return 0;
      });
  }, [vehicles, search, typeFilter, sortBy, isDeletingId]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / LIST_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * LIST_SIZE, safePage * LIST_SIZE);

  const stats = [
    {
      label: "Total vehicles",
      value: vehicles.length,
      icon: List,
    },
    {
      label: "Trucks",
      value: vehicles.filter((v) => v.vehicleType === "Truck").length,
      icon: Truck,
    },
    {
      label: "Trailers",
      value: vehicles.filter((v) => v.vehicleType === "Trailer").length,
      icon: Container,
    },
    {
      label: "Currently reserved",
      value: vehicles.filter((v) => v.isReserved).length,
      icon: CalendarClock,
    },
  ];

  function handleDelete(v: Vehicle) {
    if (
      !window.confirm(
        `Delete ${v.vehicleType} #${v.vehicleId} (${v.licensePlate})? This cannot be undone.`,
      )
    )
      return;
    const fd = new FormData();
    fd.append("vehicleId", String(v.vehicleId));
    deleteFetcher.submit(fd, {
      method: "POST",
      action: "/superAdmin/vehicles/delete",
    });
  }

  return {
    showCreateModal,
    setShowCreateModal,
    editingVehicle,
    setEditingVehicle,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    setPage,
    totalPages,
    safePage,
    slice,
    filtered,
    stats,
    handleDelete,
  };
}
