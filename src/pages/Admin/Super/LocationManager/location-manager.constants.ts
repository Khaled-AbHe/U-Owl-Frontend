export const SORT_FILTER_DATA = [
  {
    value: "id",
    display: "Sort: ID",
  },
  {
    value: "name",
    display: "Sort: Name",
  },
  {
    value: "inventory",
    display: "Sort: Inventory size",
  },
];

export const LOCATION_COLUMNS = [
  { label: "#", width: 40 },
  { label: "ID", width: 60 },
  { label: "Depot", align: "left" as const },
  { label: "Address", align: "left" as const },
  { label: "Inventory" },
  { label: "Actions", width: 100 },
];
