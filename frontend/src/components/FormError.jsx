import { FiAlertTriangle } from "react-icons/fi";
import React from "react";


function FormError(props) {
  return (
    <p className={`form-error ${props.className}`}>
      <FiAlertTriangle />
      {' '}
      {props.errorMsg}
    </p>
  );
}

export default FormError;
