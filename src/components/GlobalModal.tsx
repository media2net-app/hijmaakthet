'use client';

import { useModal } from '@/contexts/ModalContext';
import Modal from './Modal';

export default function GlobalModal() {
  const { modalState, closeModal } = useModal();

  return (
    <Modal
      isOpen={modalState.isOpen}
      onClose={closeModal}
      title={modalState.title}
      size={modalState.size}
      showCloseButton={modalState.showCloseButton}
      closeOnBackdrop={modalState.closeOnBackdrop}
    >
      {modalState.content}
    </Modal>
  );
}
