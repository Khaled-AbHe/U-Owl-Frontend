import { VehicleFormModal } from "./vehicle-form-modal.component";

export function CreateVehicleModal(props: { onClose: () => void; onSuccess: () => void }) {
  return <VehicleFormModal {...props} />;
}
