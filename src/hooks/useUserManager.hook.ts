import { useState, useMemo } from "react";
import { useLoaderData, useFetcher } from "react-router-dom";
import type { User } from "../constants/interfaces/user.entity";
import { getRole } from "../pages/Admin/Super/UserManager/user-manager.utils";

export type RoleFilter = "" | "Client" | "Location Admin" | "Super Admin";
export type SortKey = "name" | "id" | "type";

export const PAGE_SIZE = 8;

export function useUserManager() {
  const { users, currentUserId } = useLoaderData() as { users: User[]; currentUserId: number };
  const deleteFetcher = useFetcher();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("");
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const isDeletingId =
    deleteFetcher.state !== "idle" ? Number(deleteFetcher.formData?.get("userId")) : null;

  const filtered = useMemo(() => {
    return users
      .filter((u) => u.userId !== isDeletingId)
      .filter((u) => {
        const full = `${u.name} ${u.surname} ${u.email}`.toLowerCase();
        const role = getRole(u);
        return full.includes(search.toLowerCase()) && (!roleFilter || role === roleFilter);
      })
      .sort((a, b) => {
        if (sortBy === "name")
          return `${a.name}${a.surname}`.localeCompare(`${b.name}${b.surname}`);
        if (sortBy === "id") return a.userId - b.userId;
        if (sortBy === "type") return getRole(a).localeCompare(getRole(b));
        return 0;
      });
  }, [users, search, roleFilter, sortBy, isDeletingId]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const stats = {
    total: users.length,
    clients: users.filter((u) => u.userType === "Client").length,
    locAdmins: users.filter((u) => u.adminType === "Location Admin").length,
    superAdmins: users.filter((u) => u.adminType === "Super Admin").length,
  };

  function handleDelete(u: User) {
    if (!window.confirm(`Delete ${u.name} ${u.surname}? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.append("userId", String(u.userId));
    deleteFetcher.submit(fd, { method: "POST", action: "/superAdmin/users/delete" });
  }

  return {
    currentUserId,
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
    safePage,
    slice,
    filtered,
    stats,
    handleDelete,
  };
}
