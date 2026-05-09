import type { Vehicle } from "../../../../types/vehicle.entity";
import { VehicleFormModal } from "./vehicle-form-modal.component";

export function EditVehicleModal(props: {
  vehicle: Vehicle;
  onClose: () => void;
  onSuccess: () => void;
}) {
  return <VehicleFormModal {...props} />;
}
