import type { User } from "../../../../types/user.entity";

export function getRole(u: User): string {
  return u.adminType && u.adminType !== "Not Admin" ? u.adminType : "Client";
}

export function getInitials(u: User): string {
  return `${u.name?.[0] ?? ""}${u.surname?.[0] ?? ""}`.toUpperCase();
}
