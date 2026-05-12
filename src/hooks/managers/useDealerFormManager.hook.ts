import { useState, useMemo } from "react";
import { useLoaderData, useFetcher } from "react-router-dom";
import {
  List,
  Clock,
  CheckCircle,
  XCircle,
  Building2,
  Hash,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { LIST_SIZE } from "../../pages/Admin/Super/manager.utils";
import type { DealerFormStatus, DealerForm } from "../../types/dealer-form.entity";

export type StatusFilter = "" | "Pending" | "Approved" | "Declined";
export type SortKey = "id" | "status";

// Status sort order: Pending first, then Approved, then Declined
const STATUS_ORDER: Record<DealerFormStatus, number> = {
  Pending: 0,
  Accepted: 1,
  Declined: 2,
};

export function useDealerFormManager() {
  //// Data
  const { dealerForms } = useLoaderData() as { dealerForms: DealerForm[] };
  const deleteFetcher = useFetcher();
  const acceptFetcher = useFetcher();
  const declineFetcher = useFetcher();

  //// UI
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("");
  const [sortBy, setSortBy] = useState<SortKey>("id");
  const [page, setPage] = useState(1);
  const [viewingForm, setViewingForm] = useState<DealerForm | null>(null);

  //// Optimistic state
  const isDeletingId =
    deleteFetcher.state !== "idle" ? Number(deleteFetcher.formData?.get("dealerFormId")) : null;

  const isAcceptingId =
    acceptFetcher.state !== "idle" ? Number(acceptFetcher.formData?.get("dealerFormId")) : null;

  const isDecliningId =
    declineFetcher.state !== "idle" ? Number(declineFetcher.formData?.get("dealerFormId")) : null;

  //// List
  const filtered = useMemo(() => {
    return dealerForms
      .filter((f) => f.dealerFormId !== isDeletingId)
      .filter((f) => {
        const haystack =
          `${f.fullName} ${f.businessName} ${f.email} ${f.businessEmail} ${f.city}`.toLowerCase();
        return (
          haystack.includes(search.toLowerCase()) && (!statusFilter || f.status === statusFilter)
        );
      })
      .sort((a, b) => {
        if (sortBy === "id") return a.dealerFormId - b.dealerFormId;
        if (sortBy === "status") return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
        return 0;
      });
  }, [dealerForms, search, statusFilter, sortBy, isDeletingId]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / LIST_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleRows = filtered.slice((currentPage - 1) * LIST_SIZE, currentPage * LIST_SIZE);

  //// Stats
  const stats = [
    { label: "Total applications", count: dealerForms.length, icon: List },
    {
      label: "Pending",
      count: dealerForms.filter((f) => f.status === "Pending").length,
      icon: Clock,
    },
    {
      label: "Accepted",
      count: dealerForms.filter((f) => f.status === "Accepted").length,
      icon: CheckCircle,
    },
    {
      label: "Declined",
      count: dealerForms.filter((f) => f.status === "Declined").length,
      icon: XCircle,
    },
  ];

  const viewFormRows = [
    { icon: User, label: "Full name", value: viewingForm?.fullName },
    { icon: Mail, label: "Personal email", value: viewingForm?.email },
    { icon: Building2, label: "Business name", value: viewingForm?.businessName },
    { icon: Mail, label: "Business email", value: viewingForm?.businessEmail },
    { icon: Phone, label: "Phone number", value: viewingForm?.phoneNumber },
    { icon: MapPin, label: "City", value: viewingForm?.city },
    { icon: Hash, label: "Postal code", value: viewingForm?.postalCode },
  ];

  //// Handlers
  function handleAccept(f: DealerForm) {
    const fd = new FormData();
    fd.append("dealerFormId", String(f.dealerFormId));
    acceptFetcher.submit(fd, { method: "POST", action: "/superAdmin/dealerForms/approve" });
  }

  function handleDecline(f: DealerForm) {
    const fd = new FormData();
    fd.append("dealerFormId", String(f.dealerFormId));
    declineFetcher.submit(fd, { method: "POST", action: "/superAdmin/dealerForms/decline" });
  }

  function handleDelete(f: DealerForm) {
    if (!window.confirm(`Delete application from ${f.fullName}? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.append("dealerFormId", String(f.dealerFormId));
    deleteFetcher.submit(fd, { method: "POST", action: "/superAdmin/dealerForms/delete" });
  }

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    setPage,
    viewingForm,
    setViewingForm,
    viewFormRows,
    totalPages,
    currentPage,
    visibleRows,
    filtered,
    stats,
    isAcceptingId,
    isDecliningId,
    handleAccept,
    handleDecline,
    handleDelete,
  };
}
