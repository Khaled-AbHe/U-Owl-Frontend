import { useLocationManager, PAGE_SIZE } from "../../../../hooks/useLocationManager.hook";
import { PlusCircle, Search, MapPin, Truck, BarChart2, AlertCircle } from "lucide-react";
import { CreateLocationModal } from "../../../../components/SuperAdmin/LocationManager/Forms/create-location-modal.component";
import { ManageInventoryModal } from "../../../../components/SuperAdmin/LocationManager/Forms/manage-inventory-modal.component";
import LocationRow from "../../../../components/SuperAdmin/LocationManager/location-row.component";
import Pagination from "../../../../components/SuperAdmin/UserManager/pagination.component";
import type { SortKey } from "../../../../hooks/useLocationManager.hook";

export default function LocationManager() {
  const {
    showCreateModal,
    setShowCreateModal,
    managingLocation,
    setManagingLocation,
    search,
    setSearch,
    sortBy,
    setSortBy,
    setPage,
    totalPages,
    safePage,
    slice,
    filtered,
    stats,
    vehicles,
    handleDelete,
  } = useLocationManager();

  return (
    <>
      {showCreateModal && (
        <CreateLocationModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />
      )}

      {managingLocation && (
        <ManageInventoryModal
          locationId={managingLocation.locationId}
          allVehicles={vehicles}
          onClose={() => setManagingLocation(null)}
        />
      )}

      <div className="page">
        <div className="page-content">
          {/* ── Header ── */}
          <div className="d-flex align-items-start justify-content-between mb-4">
            <div>
              <h4 className="mb-1 fw-semibold">Location Manager</h4>
              <p className="text-secondary small mb-0">
                Manage all depots and their vehicle inventory
              </p>
            </div>
            <button
              className="btn btn-sm btn-brand d-flex align-items-center gap-2"
              onClick={() => setShowCreateModal(true)}
            >
              <PlusCircle size={15} />
              Add location
            </button>
          </div>

          {/* ── Stats ── */}
          <div className="row g-3 mb-4">
            {[
              {
                label: "Total locations",
                icon: <MapPin size={16} />,
                value: stats.total,
              },
              {
                label: "Vehicles assigned",
                icon: <Truck size={16} />,
                value: stats.totalVehiclesAssigned,
              },
              {
                label: "Avg per location",
                icon: <BarChart2 size={16} />,
                value: stats.avgInventory,
              },
              {
                label: "Unassigned vehicles",
                icon: <AlertCircle size={16} />,
                value: stats.unassigned,
              },
            ].map((s) => (
              <div className="col-6 col-md-3" key={s.label}>
                <div className="bg-white rounded-3 p-3 border" style={{ borderColor: "#f0f0f0" }}>
                  <div className="text-secondary small mb-1 d-flex">
                    <div className="stat-icon me-2">{s.icon}</div> {s.label}
                  </div>
                  <div className="fw-semibold" style={{ fontSize: 22 }}>
                    {s.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Toolbar ── */}
          <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
            <div className="input-group input-group-sm" style={{ maxWidth: 260 }}>
              <span className="input-group-text bg-white border-end-0">
                <Search size={13} className="text-secondary" />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search by name or phone…"
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
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortKey);
                setPage(1);
              }}
            >
              <option value="id">Sort: ID</option>
              <option value="name">Sort: Name</option>
              <option value="inventory">Sort: Inventory size</option>
            </select>
          </div>

          {/* ── Table ── */}
          <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
            <table className="table table-hover align-middle mb-0 small">
              <thead style={{ background: "#f8f9fa" }}>
                <tr>
                  <th className="fw-medium text-secondary ps-3" style={{ width: 40 }}>
                    #
                  </th>
                  <th className="fw-medium text-secondary" style={{ width: 70 }}>
                    ID
                  </th>
                  <th className="fw-medium text-secondary">Depot</th>
                  <th className="fw-medium text-secondary">Coordinates</th>
                  <th className="fw-medium text-secondary">Inventory</th>
                  <th className="fw-medium text-secondary" style={{ width: 60 }}></th>
                </tr>
              </thead>
              <tbody>
                {slice.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-secondary py-5">
                      No locations found.
                    </td>
                  </tr>
                ) : (
                  slice.map((loc, i) => (
                    <LocationRow
                      key={loc.locationId}
                      location={loc}
                      index={i}
                      pageSize={PAGE_SIZE}
                      safePage={safePage}
                      onManage={setManagingLocation}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="mt-3">
              <Pagination
                filtered={filtered}
                safePage={safePage}
                pageSize={PAGE_SIZE}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
