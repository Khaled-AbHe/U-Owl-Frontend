import { PlusCircle } from "lucide-react";
import Pagination from "../../../../components/SuperAdmin/General/pagination.component";
import { ManagerShell } from "../../../../components/SuperAdmin/General/Shells/manager-shell.component";
import { StatsBar } from "../../../../components/SuperAdmin/General/Stats/stats-bar.component";
import ManagerToolbar from "../../../../components/SuperAdmin/General/Toolbar/manager-toolbar.component";
import ToolbarFilter from "../../../../components/SuperAdmin/General/Toolbar/toolbar-filter.component";
import { CreateLocationModal } from "../../../../components/SuperAdmin/LocationManager/Forms/create-location-modal.component";
import { EditLocationModal } from "../../../../components/SuperAdmin/LocationManager/Forms/edit-location-modal.component";
import { ManageInventoryModal } from "../../../../components/SuperAdmin/LocationManager/Forms/manage-inventory-modal.component";
import LocationRow from "../../../../components/SuperAdmin/LocationManager/location-row.component";
import type { SortKey } from "../../../../hooks/managers/useLocationManager.hook";
import { useLocationManager } from "../../../../hooks/managers/useLocationManager.hook";
import { LOCATION_COLUMNS, SORT_FILTER_DATA } from "./location-manager.constants";
import ManagerTable from "../../../../components/SuperAdmin/General/Table/manager-table.component";
import { LIST_SIZE } from "../manager.utils";

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
    currentPage,
    visibleRows,
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
        <StatsBar stats={stats} />

        <ManagerToolbar search={search} setSearch={setSearch} setPage={setPage}>
          <ToolbarFilter
            options={SORT_FILTER_DATA}
            filterKey={sortBy}
            setFilter={(v) => setSortBy(v as SortKey)}
            setPage={setPage}
          />
        </ManagerToolbar>

        <ManagerTable columns={LOCATION_COLUMNS}>
          {visibleRows.length === 0 ? (
            <div className="text-center text-secondary py-5" style={{ fontSize: 13 }}>
              No locations found.
            </div>
          ) : (
            visibleRows.map((loc, i) => (
              <LocationRow
                key={loc.locationId}
                location={loc}
                index={i}
                listSize={LIST_SIZE}
                currentPage={currentPage}
                onEdit={setEditingLocation}
                onManage={setManagingLocation}
                onDelete={handleDelete}
              />
            ))
          )}
        </ManagerTable>

        {totalPages > 1 && (
          <Pagination
            filtered={filtered}
            currentPage={currentPage}
            listSize={LIST_SIZE}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </ManagerShell>
    </>
  );
}
