import React from "react";
import styles from "./InputField.module.css";
import classnames from "classnames";
import { useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  
  return (
    <div
      className={classnames(
        styles.field,
        !meta.error ? styles.valid : styles.error
      )}
    >
      <label htmlFor={label}>{label}</label>
      <input
        {...field}
        {...props}
        className={classnames(
          styles.input,
          !meta.error ? styles.valid : styles.error
        )}
      />
      {meta.touched && meta.error && <p className="error">{meta.error} </p>}
    </div>
  );
};

export default InputField;
