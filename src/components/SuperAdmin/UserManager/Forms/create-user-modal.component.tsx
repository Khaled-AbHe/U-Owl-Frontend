import { UserFormModal } from "./user-form-modal.component";

export function CreateUserModal(props: { onClose: () => void; onSuccess: () => void }) {
  return <UserFormModal {...props} />;
}
