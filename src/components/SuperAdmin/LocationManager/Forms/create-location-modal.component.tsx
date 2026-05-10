import { LocationFormModal } from "./location-form-modal.component";

export function CreateLocationModal(props: { onClose: () => void; onSuccess: () => void }) {
  return <LocationFormModal {...props} />;
}
