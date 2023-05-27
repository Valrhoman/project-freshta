import { BsX } from "react-icons/bs";

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    //backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-all duration-500 ${
        open ? "visible bg-black/40" : "invisible"
      }`}
    >
      {/* Actual modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-md shadow
        p-6 transition-all duration-500 ${
          open ? "scale-100 opacity-100" : "scale-105 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <BsX />
        </button>
        {children}
      </div>
    </div>
  );
}
