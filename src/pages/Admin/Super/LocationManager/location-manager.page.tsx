import { useLocationManager, PAGE_SIZE } from "../../../../hooks/useLocationManager.hook";
import { PlusCircle } from "lucide-react";
import { CreateLocationModal } from "../../../../components/SuperAdmin/LocationManager/Forms/create-location-modal.component";
import { ManageInventoryModal } from "../../../../components/SuperAdmin/LocationManager/Forms/manage-inventory-modal.component";
import LocationRow from "../../../../components/SuperAdmin/LocationManager/location-row.component";
import type { SortKey } from "../../../../hooks/useLocationManager.hook";
import { ManagerShell } from "../../../../components/SuperAdmin/manager-shell.component";
import { StatsBar } from "../../../../components/SuperAdmin/stats-bar.component";
import Pagination from "../../../../components/SuperAdmin/pagination.component";
import ManagerToolbar from "../../../../components/SuperAdmin/manager-toolbar.component";
import ManagerTable from "../../../../components/SuperAdmin/manager-table.component";
import ToolbarFilter from "../../../../components/SuperAdmin/toolbar-filter.component";
import { LOCATION_COLUMNS, SORT_FILTER_DATA } from "./location-manager.constants";

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
