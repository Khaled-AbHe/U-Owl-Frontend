import { useVehicleManager, PAGE_SIZE } from "../../../../hooks/useVehicleManager.hook";
import { PlusCircle, Search } from "lucide-react";
import { CreateVehicleModal } from "../../../../components/SuperAdmin/VehicleManager/Forms/create-vehicle-modal.component";
import { EditVehicleModal } from "../../../../components/SuperAdmin/VehicleManager/Forms/edit-vehicle-modal.component";
import VehicleRow from "../../../../components/SuperAdmin/VehicleManager/vehicle-row.component";
import Pagination from "../../../../components/SuperAdmin/UserManager/pagination.component";
import type { TypeFilter, SortKey } from "../../../../hooks/useVehicleManager.hook";

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

      <div className="page">
        <div className="page-content">
          {/* Header */}
          <div className="d-flex align-items-start justify-content-between mb-4">
            <div>
              <h4 className="mb-1 fw-semibold">Vehicle Manager</h4>
              <p className="text-secondary small mb-0">Manage all vehicles across the platform</p>
            </div>
            <button
              className="btn btn-sm btn-brand d-flex align-items-center gap-2"
              onClick={() => setShowCreateModal(true)}
            >
              <PlusCircle size={15} />
              Add vehicle
            </button>
          </div>

          {/* Stats */}
          <div className="row g-3 mb-4">
            {[
              { label: "Total vehicles", value: stats.total },
              { label: "Trucks", value: stats.trucks },
              { label: "Trailers", value: stats.trailers },
              { label: "Currently reserved", value: stats.reserved },
            ].map((s) => (
              <div className="col-6 col-md-3" key={s.label}>
                <div className="bg-white rounded-3 p-3 border" style={{ borderColor: "#f0f0f0" }}>
                  <div className="text-secondary small mb-1">{s.label}</div>
                  <div className="fw-semibold" style={{ fontSize: 22 }}>
                    {s.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            <div className="position-relative flex-grow-1" style={{ maxWidth: 280 }}>
              <Search
                size={14}
                className="position-absolute text-secondary"
                style={{ top: "50%", left: 10, transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ paddingLeft: 30 }}
                placeholder="Search by plate or subtype…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
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
          </div>

          {/* Table */}
          <div
            className="bg-white rounded-3 border overflow-hidden"
            style={{ borderColor: "#f0f0f0" }}
          >
            <table className="table table-hover mb-0" style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: 40 }} />
                <col />
                <col style={{ width: 100 }} />
                <col style={{ width: 110 }} />
                <col style={{ width: 110 }} />
                <col style={{ width: 70 }} />
                <col style={{ width: 90 }} />
              </colgroup>
              <thead className="table-light border-bottom">
                <tr>
                  {["#", "Vehicle", "Type", "Status", "Cost/km", "ID", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-secondary fw-medium small py-2 ps-3"
                      style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
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
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              pageSize={PAGE_SIZE}
              safePage={safePage}
              filtered={filtered}
              totalPages={totalPages}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
