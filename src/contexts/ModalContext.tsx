'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalState {
  isOpen: boolean;
  title: string;
  content: ReactNode | null;
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton: boolean;
  closeOnBackdrop: boolean;
}

interface ModalContextType {
  modalState: ModalState;
  openModal: (config: Partial<ModalState> & { content: ReactNode }) => void;
  closeModal: () => void;
  updateModalContent: (content: ReactNode) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const initialModalState: ModalState = {
  isOpen: false,
  title: '',
  content: null,
  size: 'md',
  showCloseButton: true,
  closeOnBackdrop: true
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const openModal = (config: Partial<ModalState> & { content: ReactNode }) => {
    setModalState({
      ...initialModalState,
      ...config,
      isOpen: true
    });
  };

  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  const updateModalContent = (content: ReactNode) => {
    setModalState(prev => ({
      ...prev,
      content
    }));
  };

  return (
    <ModalContext.Provider value={{
      modalState,
      openModal,
      closeModal,
      updateModalContent
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
