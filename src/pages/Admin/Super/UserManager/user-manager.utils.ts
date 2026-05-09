import type { User } from "../../../../types/user.entity";

export const PAGE_SIZE = 8;

export function getRole(u: User): string {
  return u.adminType && u.adminType !== "Not Admin" ? u.adminType : "Client";
}

export function getInitials(u: User): string {
  return `${u.name?.[0] ?? ""}${u.surname?.[0] ?? ""}`.toUpperCase();
}
