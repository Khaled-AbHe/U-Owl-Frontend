import {
  useDealerFormManager,
  type StatusFilter,
  type SortKey,
} from "../../../../hooks/managers/useDealerFormManager.hook";
import { ManagerShell } from "../../../../components/SuperAdmin/General/Shells/manager-shell.component";
import { StatsBar } from "../../../../components/SuperAdmin/General/Stats/stats-bar.component";
import ManagerToolbar from "../../../../components/SuperAdmin/General/Toolbar/manager-toolbar.component";
import ToolbarFilter from "../../../../components/SuperAdmin/General/Toolbar/toolbar-filter.component";
import ManagerTable from "../../../../components/SuperAdmin/General/Table/manager-table.component";
import Pagination from "../../../../components/SuperAdmin/General/pagination.component";
import DealerFormRow from "../../../../components/SuperAdmin/DealerFormManager/dealer-form-row.component";
import { ViewDealerFormModal } from "../../../../components/SuperAdmin/DealerFormManager/Forms/view-dealer-form-modal.component";
import {
  STATUS_FILTER_DATA,
  SORT_FILTER_DATA,
  DEALER_FORM_COLUMNS,
} from "./dealer-form-manager.constants";
import { LIST_SIZE } from "../manager.utils";

export default function DealerFormManager() {
  const {
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
  } = useDealerFormManager();

  return (
    <>
      {viewingForm && (
        <ViewDealerFormModal
          form={viewingForm}
          viewFormRows={viewFormRows}
          onClose={() => setViewingForm(null)}
        />
      )}

      <ManagerShell
        title="Dealer Form Manager"
        subtitle="Review and action all dealer applications"
      >
        <StatsBar stats={stats} />

        <ManagerToolbar search={search} setSearch={setSearch} setPage={setPage}>
          <ToolbarFilter
            options={STATUS_FILTER_DATA}
            filterKey={statusFilter}
            setFilter={(v) => setStatusFilter(v as StatusFilter)}
            setPage={setPage}
          />
          <ToolbarFilter
            options={SORT_FILTER_DATA}
            filterKey={sortBy}
            setFilter={(v) => setSortBy(v as SortKey)}
          />
        </ManagerToolbar>

        <ManagerTable columns={DEALER_FORM_COLUMNS}>
          {visibleRows.length === 0 ? (
            <div className="text-center text-secondary py-5" style={{ fontSize: 13 }}>
              No applications match your search.
            </div>
          ) : (
            visibleRows.map((form, i) => (
              <DealerFormRow
                key={form.dealerFormId}
                form={form}
                index={i}
                listSize={LIST_SIZE}
                currentPage={currentPage}
                isAccepting={isAcceptingId === form.dealerFormId}
                isDeclining={isDecliningId === form.dealerFormId}
                onView={setViewingForm}
                onAccept={handleAccept}
                onDecline={handleDecline}
                onDelete={handleDelete}
              />
            ))
          )}
        </ManagerTable>

        {totalPages > 1 && (
          <Pagination
            listSize={LIST_SIZE}
            currentPage={currentPage}
            filtered={filtered}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </ManagerShell>
    </>
  );
}
