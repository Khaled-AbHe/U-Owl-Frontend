import { useLocationManager, PAGE_SIZE } from "../../../../hooks/useLocationManager.hook";
import { PlusCircle, MapPin, Truck, BarChart2, AlertCircle } from "lucide-react";
import { CreateLocationModal } from "../../../../components/SuperAdmin/LocationManager/Forms/create-location-modal.component";
import { ManageInventoryModal } from "../../../../components/SuperAdmin/LocationManager/Forms/manage-inventory-modal.component";
import LocationRow from "../../../../components/SuperAdmin/LocationManager/location-row.component";
import type { SortKey } from "../../../../hooks/useLocationManager.hook";
import { ManagerShell } from "../../../../components/SuperAdmin/manager-shell.component";
import { StatsBar } from "../../../../components/SuperAdmin/stats-bar.component";
import Pagination from "../../../../components/SuperAdmin/pagination.component";
import ManagerToolbar from "../../../../components/SuperAdmin/manager-toolbar.component";
import ManagerTable from "../../../../components/SuperAdmin/manager-table.component";

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

      <ManagerShell
        title="Location Manager"
        subtitle="Manage all depots and their vehicle inventory"
        addLabel="Add location"
        addIcon={<PlusCircle size={15} />}
        onClickAdd={() => setShowCreateModal(true)}
      >
        <StatsBar
          items={[
            { label: "Total locations", icon: <MapPin size={16} />, value: stats.total },
            {
              label: "Vehicles assigned",
              icon: <Truck size={16} />,
              value: stats.totalVehiclesAssigned,
            },
            { label: "Avg per location", icon: <BarChart2 size={16} />, value: stats.avgInventory },
            {
              label: "Unassigned vehicles",
              icon: <AlertCircle size={16} />,
              value: stats.unassigned,
            },
          ]}
        />

        {/* Toolbar */}
        <ManagerToolbar search={search} setSearch={setSearch} setPage={setPage}>
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
        </ManagerToolbar>

        {/* Table */}
        <ManagerTable
          columns={[
            { label: "#", width: 40 },
            { label: "ID", width: 70 },
            { label: "Depot" },
            { label: "Coordinates" },
            { label: "Inventory" },
            { label: "Actions", width: 90 },
          ]}
        >
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
        </ManagerTable>

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
      </ManagerShell>
    </>
  );
}
