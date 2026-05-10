import { useVehicleManager, PAGE_SIZE } from "../../../../hooks/useVehicleManager.hook";
import { PlusCircle } from "lucide-react";
import { CreateVehicleModal } from "../../../../components/SuperAdmin/VehicleManager/Forms/create-vehicle-modal.component";
import { EditVehicleModal } from "../../../../components/SuperAdmin/VehicleManager/Forms/edit-vehicle-modal.component";
import VehicleRow from "../../../../components/SuperAdmin/VehicleManager/vehicle-row.component";
import type { TypeFilter, SortKey } from "../../../../hooks/useVehicleManager.hook";
import { ManagerShell } from "../../../../components/SuperAdmin/manager-shell.component";
import { StatsBar } from "../../../../components/SuperAdmin/stats-bar.component";
import Pagination from "../../../../components/SuperAdmin/pagination.component";
import ManagerToolbar from "../../../../components/SuperAdmin/manager-toolbar.component";
import ManagerTable from "../../../../components/SuperAdmin/manager-table.component";

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
        <StatsBar
          items={[
            { label: "Total vehicles", value: stats.total },
            { label: "Trucks", value: stats.trucks },
            { label: "Trailers", value: stats.trailers },
            { label: "Currently reserved", value: stats.reserved },
          ]}
        />

        {/* Toolbar */}
        <ManagerToolbar search={search} setSearch={setSearch} setPage={setPage}>
          <select
            className="form-select form-select-sm"
            style={{ width: "auto" }}
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as TypeFilter);
              setPage(1);
            }}
          >
            <option value="">All types</option>
            <option value="Truck">Truck</option>
            <option value="Trailer">Trailer</option>
          </select>
          <select
            className="form-select form-select-sm"
            style={{ width: "auto" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
          >
            <option value="id">Sort: ID</option>
            <option value="plate">Sort: Plate</option>
            <option value="type">Sort: Type</option>
            <option value="subtype">Sort: Subtype</option>
            <option value="cost">Sort: Cost/km</option>
          </select>
        </ManagerToolbar>

        <ManagerTable
          columns={[
            { label: "#", width: 40 },
            { label: "ID", width: 40 },
            { label: "License Plate" },
            { label: "Type", width: 100 },
            { label: "Subtype" },
            { label: "Status", width: 110 },
            { label: "Safe", width: 110 },
            { label: "Cost/km", width: 110 },
            { label: "Actions", width: 110 },
          ]}
        >
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-secondary py-5"
                  style={{ fontSize: 13 }}
                >
                  No vehicles match your search.
                </td>
              </tr>
            ) : (
              slice.map((v, i) => (
                <VehicleRow
                  key={v.vehicleId}
                  vehicle={v}
                  index={i}
                  pageSize={PAGE_SIZE}
                  safePage={safePage}
                  onEdit={setEditingVehicle}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </ManagerTable>

        {totalPages > 1 && (
          <Pagination
            pageSize={PAGE_SIZE}
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
