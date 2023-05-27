import Modal from "../Modal";

export default function Success({ open, onClose, children }: ModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      Success! New item posted. ✳️
    </Modal>
  );
}
