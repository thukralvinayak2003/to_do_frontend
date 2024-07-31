"use client";

import { Dialog } from "@headlessui/react";
import { useRef, ReactNode } from "react";

interface ModalProps {
  onClose?: () => void;
  children: ReactNode;
}

export function Modal({ onClose = () => {}, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay
        ref={overlayRef}
        className="fixed inset-0 bg-gray-800/60"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full h-full bg-white rounded-lg overflow-auto">
          {children}
        </div>
      </div>
    </Dialog>
  );
}
