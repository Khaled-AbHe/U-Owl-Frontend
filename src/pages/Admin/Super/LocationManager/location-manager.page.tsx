import { PlusCircle } from "lucide-react";
import ManagerTable from "../../../../components/SuperAdmin/General/manager-table.component";
import Pagination from "../../../../components/SuperAdmin/General/pagination.component";
import { ManagerShell } from "../../../../components/SuperAdmin/General/Shells/manager-shell.component";
import { StatsBar } from "../../../../components/SuperAdmin/General/stats-bar.component";
import ManagerToolbar from "../../../../components/SuperAdmin/General/Toolbar/manager-toolbar.component";
import ToolbarFilter from "../../../../components/SuperAdmin/General/Toolbar/toolbar-filter.component";
import { CreateLocationModal } from "../../../../components/SuperAdmin/LocationManager/Forms/create-location-modal.component";
import { EditLocationModal } from "../../../../components/SuperAdmin/LocationManager/Forms/edit-location-modal.component";
import { ManageInventoryModal } from "../../../../components/SuperAdmin/LocationManager/Forms/manage-inventory-modal.component";
import LocationRow from "../../../../components/SuperAdmin/LocationManager/location-row.component";
import type { SortKey } from "../../../../hooks/useLocationManager.hook";
import { PAGE_SIZE, useLocationManager } from "../../../../hooks/useLocationManager.hook";
import { LOCATION_COLUMNS, SORT_FILTER_DATA } from "./location-manager.constants";

export default function LocationManager() {
  const {
    showCreateModal,
    setShowCreateModal,
    editingLocation,
    setEditingLocation,
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

      {editingLocation && (
        <EditLocationModal
          location={editingLocation}
          onClose={() => setEditingLocation(null)}
          onSuccess={() => setEditingLocation(null)}
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
        <StatsBar items={stats} />

        <ManagerToolbar search={search} setSearch={setSearch} setPage={setPage}>
          <ToolbarFilter
            options={SORT_FILTER_DATA}
            filterKey={sortBy}
            setFilter={(v) => setSortBy(v as SortKey)}
            setPage={setPage}
          />
        </ManagerToolbar>

        {/* Table */}
        <ManagerTable columns={LOCATION_COLUMNS}>
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
                  onEdit={setEditingLocation}
                  onManage={setManagingLocation}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </ManagerTable>

        {totalPages > 1 && (
          <Pagination
            filtered={filtered}
            safePage={safePage}
            pageSize={PAGE_SIZE}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </ManagerShell>
    </>
  );
}
