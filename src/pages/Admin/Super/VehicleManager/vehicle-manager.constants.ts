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
  { label: "ID", width: 60 },
  { label: "License Plate", width: 110 },
  { label: "Type" },
  { label: "Subtype" },
  { label: "Status" },
  { label: "Safe" },
  { label: "Cost/km", width: 100 },
  { label: "Actions", width: 100 },
];
