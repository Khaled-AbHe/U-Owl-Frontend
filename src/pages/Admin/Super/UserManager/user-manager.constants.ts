export const ROLE_FILTER_DATA = [
  {
    value: "",
    display: "All roles",
  },
  {
    value: "Client",
    display: "Client",
  },
  {
    value: "Location Admin",
    display: "Location Admin",
  },
  {
    value: "Super Admin",
    display: "Super Admin",
  },
];

export const SORT_FILTER_DATA = [
  {
    value: "name",
    display: "Sort: Name",
  },
  {
    value: "id",
    display: "Sort: ID",
  },
  {
    value: "type",
    display: "Sort: Role",
  },
];

export const USER_COLUMNS = [
  { label: "#", width: 40 },
  { label: "ID" },
  { label: "User", width: 500 },
  { label: "Role", width: 350 },
  { label: "Actions", width: 100 },
];
