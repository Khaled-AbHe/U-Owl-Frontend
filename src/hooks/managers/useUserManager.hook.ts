import { useState, useMemo } from "react";
import { useLoaderData, useFetcher } from "react-router-dom";
import type { User } from "../../types/user.entity";
import { getRole } from "../../pages/Admin/Super/UserManager/user-manager.utils";
import { List, MapPin, Shield, User as UserIcon } from "lucide-react";
import { LIST_SIZE } from "../../pages/Admin/Super/manager.utils";

export type RoleFilter = "" | "Client" | "Location Admin" | "Super Admin";
export type SortKey = "name" | "id" | "type";

export function useUserManager() {
  //// Data
  const { users, currentUserId } = useLoaderData() as { users: User[]; currentUserId: number };
  const deleteFetcher = useFetcher();

  //// UI
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("");
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  //// List
  const isDeletingId =
    deleteFetcher.state !== "idle" ? Number(deleteFetcher.formData?.get("userId")) : null;

  // useMemo caches the result of a calculation between re-renders, which makes things faster
  const filtered = useMemo(() => {
    return (
      users
        .filter((u) => u.userId !== isDeletingId) // removes the object thats being deleted
        // filter for the search bar
        .filter((u) => {
          const full = `${u.name} ${u.surname} ${u.email}`.toLowerCase(); // creates a reference
          const role = getRole(u);
          return (
            full.includes(search.toLowerCase()) && // returns elements that contains what you search based on the reference
            (!roleFilter || role === roleFilter) // returns elements that match the selected role
          );
        })
        .sort((a, b) => {
          if (sortBy === "name")
            return `${a.name}${a.surname}`.localeCompare(`${b.name}${b.surname}`);
          if (sortBy === "id") return a.userId - b.userId;
          if (sortBy === "type") return getRole(a).localeCompare(getRole(b));
          return 0;
        })
    );
  }, [users, search, roleFilter, sortBy, isDeletingId]); // it will only recalculate if these variables change

  const totalPages = Math.max(1, Math.ceil(filtered.length / LIST_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleRows = filtered.slice((currentPage - 1) * LIST_SIZE, currentPage * LIST_SIZE);

  //// Stats
  const stats = [
    {
      label: "Total users",
      count: users.length,
      icon: List,
    },
    {
      label: "Clients",
      count: users.filter((u) => u.userType === "Client").length,
      icon: UserIcon,
    },
    {
      label: "Location Admins",
      count: users.filter((u) => u.adminType === "Location Admin").length,
      icon: MapPin,
    },
    {
      label: "Super Admins",
      count: users.filter((u) => u.adminType === "Super Admin").length,
      icon: Shield,
    },
  ];

  //// Handlers
  function handleDelete(u: User) {
    if (!window.confirm(`Delete ${u.name} ${u.surname}? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.append("userId", String(u.userId));
    deleteFetcher.submit(fd, { method: "POST", action: "/superAdmin/users/delete" });
  }

  return {
    showCreateModal,
    setShowCreateModal,
    editingUser,
    setEditingUser,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    sortBy,
    setSortBy,
    setPage,
    totalPages,
    currentPage,
    currentUserId,
    visibleRows,
    filtered,
    stats,
    handleDelete,
  };
}
