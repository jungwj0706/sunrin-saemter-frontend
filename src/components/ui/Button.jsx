import React from "react";
import '../../styles/components/button.css'; 

function Button({ children, onClick, className, ...props }) {
  return (
    <button
      className={`default-button ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
