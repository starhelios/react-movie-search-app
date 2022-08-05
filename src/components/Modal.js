import React from "react";
import '../App.css';

const Modal = ({children, isOpen, onClose}) => isOpen && (<>
  <div className="overlay" onClick={onClose}/>
  <div className="modal">
    <div className="close-btn" onClick={onClose}>X</div>
    {children}
  </div>
</>)

export default Modal;
