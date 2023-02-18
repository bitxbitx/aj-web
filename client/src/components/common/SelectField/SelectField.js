import React from "react";
import styles from "./SelectField.module.css";
import classnames from "classnames";
import { useField } from "formik";

const SelectField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    
    return (
        <div
        className={classnames(
            styles.field,
            !meta.error ? styles.valid : styles.error
        )}
        >
        <label htmlFor={label}>{label}</label>
        <select
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

    export default SelectField;