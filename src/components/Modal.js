import ReactDOM from "react-dom";
import { useEffect } from "react";

const Modal = ({
  content = '',
  onClose = () => {},
  ...props
}) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    }
  }, []);

  return ReactDOM.createPortal(
    <div {...props} className="content-center">
      <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
      <div className="fixed p-10 bg-white inset-40">{content}</div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;