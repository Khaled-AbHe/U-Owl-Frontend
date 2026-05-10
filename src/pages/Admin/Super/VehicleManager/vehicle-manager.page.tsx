import { useVehicleManager } from "../../../../hooks/useVehicleManager.hook";
import { PlusCircle } from "lucide-react";
import { CreateVehicleModal } from "../../../../components/SuperAdmin/VehicleManager/Forms/create-vehicle-modal.component";
import { EditVehicleModal } from "../../../../components/SuperAdmin/VehicleManager/Forms/edit-vehicle-modal.component";
import VehicleRow from "../../../../components/SuperAdmin/VehicleManager/vehicle-row.component";
import type { TypeFilter, SortKey } from "../../../../hooks/useVehicleManager.hook";
import { ManagerShell } from "../../../../components/SuperAdmin/General/Shells/manager-shell.component";
import { StatsBar } from "../../../../components/SuperAdmin/General/stats-bar.component";
import Pagination from "../../../../components/SuperAdmin/General/pagination.component";
import ManagerToolbar from "../../../../components/SuperAdmin/General/Toolbar/manager-toolbar.component";
import ToolbarFilter from "../../../../components/SuperAdmin/General/Toolbar/toolbar-filter.component";
import { TYPE_FILTER_DATA, SORT_FILTER_DATA, VEHICLE_COLUMNS } from "./vehicle-manager.constants";
import ManagerTable from "../../../../components/SuperAdmin/General/Table/manager-table.component";
import { LIST_SIZE } from "../manager.utils";

export default function VehicleManager() {
  const {
    showCreateModal,
    setShowCreateModal,
    editingVehicle,
    setEditingVehicle,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    setPage,
    totalPages,
    safePage,
    slice,
    filtered,
    stats,
    handleDelete,
  } = useVehicleManager();

  return (
    <>
      {showCreateModal && (
        <CreateVehicleModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />
      )}

      {editingVehicle && (
        <EditVehicleModal
          vehicle={editingVehicle}
          onClose={() => setEditingVehicle(null)}
          onSuccess={() => setEditingVehicle(null)}
        />
      )}

      <ManagerShell
        title="Vehicle Manager"
        subtitle="Manage all vehicles across the platform"
        addLabel="Add vehicle"
        addIcon={<PlusCircle size={15} />}
        onClickAdd={() => setShowCreateModal(true)}
      >
        <StatsBar items={stats} />

        <ManagerToolbar search={search} setSearch={setSearch} setPage={setPage}>
          <ToolbarFilter
            options={TYPE_FILTER_DATA}
            filterKey={typeFilter}
            setFilter={(v) => setTypeFilter(v as TypeFilter)}
            setPage={setPage}
          />
          <ToolbarFilter
            options={SORT_FILTER_DATA}
            filterKey={sortBy}
            setFilter={(v) => setSortBy(v as SortKey)}
          />
        </ManagerToolbar>

        <ManagerTable columns={VEHICLE_COLUMNS}>
          {slice.length === 0 ? (
            <div className="text-center text-secondary py-5" style={{ fontSize: 13 }}>
              No vehicles match your search.
            </div>
          ) : (
            slice.map((v, i) => (
              <VehicleRow
                key={v.vehicleId}
                vehicle={v}
                index={i}
                listSize={LIST_SIZE}
                safePage={safePage}
                onEdit={setEditingVehicle}
                onDelete={handleDelete}
              />
            ))
          )}
        </ManagerTable>

        {totalPages > 1 && (
          <Pagination
            listSize={LIST_SIZE}
            safePage={safePage}
            filtered={filtered}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </ManagerShell>
    </>
  );
}
