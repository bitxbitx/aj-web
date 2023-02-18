import { React, useState, useCallback } from "react";
import styles from "./AddNoteForm.module.css";
import InputField from "../../../../common/InputField/InputField";
import Button from "../../../../common/Button/Button";
import { Form, Formik } from "formik";
import { noteSchema } from "../../../../../schemas/noteSchema";
import SelectField from "../../../../common/SelectField/SelectField";
import { useDropzone } from 'react-dropzone';
import ImageIcon from '../../../../../assets/icons/ImageIcon.svg';


// TODO - Add image upload
// TODO - Change Methods to Radio Buttons

const AddNoteForm = () => {
    const [files, setFiles] = useState([]);
    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
    });
    return (
        <Formik
            initialValues={{
                amount: "",
                methods: "",
                image: "",
            }}
            validationSchema={noteSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form className={styles.form}>
                    <InputField
                        label="Amount"
                        name="amount"
                        type="number"
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.amount}
                        touched={touched.amount}
                    />
                    <SelectField
                        label="Methods"
                        name="methods"
                        value={values.methods}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.methods}
                        touched={touched.methods}
                    >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="Check">Check</option>
                    </SelectField>
                    <div {...getRootProps()} className={styles.dropzone}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <>
                                <img src={ImageIcon} alt="Dropzone Icon" />
                                <p>Drop the files here ...</p>
                            </>
                        ) : (
                            <>
                                <img src={ImageIcon} alt="Dropzone Icon" />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </>
                        )}
                    </div>
                    <ul>
                        {files.map((file) => (
                            <li key={file.path}>
                                {file.path} - {file.size} bytes
                            </li>
                        ))}
                    </ul>
                    <Button type="submit" label="Add Note" />
                </Form>
            )}
        </Formik>
    );
}

export default AddNoteForm;