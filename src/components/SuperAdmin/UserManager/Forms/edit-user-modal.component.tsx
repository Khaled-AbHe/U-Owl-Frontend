import type { User } from "../../../../types/user.entity";
import { UserFormModal } from "./user-form-modal.component";

export function EditUserModal(props: { user: User; onClose: () => void; onSuccess: () => void }) {
  return <UserFormModal {...props} />;
}
