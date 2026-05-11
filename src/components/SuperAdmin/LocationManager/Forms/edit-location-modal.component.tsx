import type { Location } from "../../../../types/location.entity";
import { LocationFormModal } from "./location-form-modal.component";

export function EditLocationModal(props: {
  location: Location;
  onClose: () => void;
  onSuccess: () => void;
}) {
  return <LocationFormModal {...props} />;
}
