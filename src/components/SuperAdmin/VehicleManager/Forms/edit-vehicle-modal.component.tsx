import type { Vehicle } from "../../../../constants/interfaces/vehicle.entity";
import { VehicleFormModal } from "./vehicle-form-modal.component";

export function EditVehicleModal(props: {
  vehicle: Vehicle;
  onClose: () => void;
  onSuccess: () => void;
}) {
  return <VehicleFormModal {...props} />;
}
