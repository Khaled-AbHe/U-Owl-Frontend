export const TYPE_FILTER_DATA = [
  {
    value: "",
    display: "All types",
  },
  {
    value: "Truck",
    display: "Truck",
  },
  {
    value: "Trailer",
    display: "Trailer",
  },
];

export const SORT_FILTER_DATA = [
  {
    value: "id",
    display: "Sort: ID",
  },
  {
    value: "plate",
    display: "Sort: Plate",
  },
  {
    value: "type",
    display: "Sort: Type",
  },
  {
    value: "subtype",
    display: "Sort: Subtype",
  },
  {
    value: "cost",
    display: "Sort: Cost/km",
  },
];

export const VEHICLE_COLUMNS = [
  { label: "#", width: 40 },
  { label: "ID", width: 40 },
  { label: "License Plate" },
  { label: "Type", width: 100 },
  { label: "Subtype" },
  { label: "Status", width: 110 },
  { label: "Safe", width: 110 },
  { label: "Cost/km", width: 110 },
  { label: "Actions", width: 110 },
];
