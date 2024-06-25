import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
  actions?: JSX.Element;
}

const Modal = ({ show, onClose, title, actions, children }: ModalProps) => {
  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="max-w-lg space-y-4 bg-white p-12 rounded"
        >
          <DialogTitle className="text-lg font-bold flex justify-between">
            <h1 className="text-xl text-primary font-medium">{title}</h1>
            <XMarkIcon
              className="w-6 h-6 text-primary cursor-pointer"
              onClick={onClose}
            />
          </DialogTitle>
          <div className="mb-3">{children}</div>
          <div className="flex gap-4">{actions}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
