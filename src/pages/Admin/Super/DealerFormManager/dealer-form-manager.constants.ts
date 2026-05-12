export const STATUS_FILTER_DATA = [
  { value: "", display: "All" },
  { value: "Pending", display: "Pending" },
  { value: "Approved", display: "Approved" },
  { value: "Declined", display: "Declined" },
];

export const SORT_FILTER_DATA = [
  { value: "id", display: "Sort: ID" },
  { value: "status", display: "Sort: Status" },
];

export const DEALER_FORM_COLUMNS = [
  { label: "#", width: 40 },
  { label: "ID", width: 60 },
  { label: "Applicant", align: "left" as const },
  { label: "Business", align: "left" as const },
  { label: "Location", align: "left" as const },
  { label: "Status", width: 180 },
  { label: "Actions", width: 100 },
];
