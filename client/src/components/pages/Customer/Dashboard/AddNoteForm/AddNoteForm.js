import { Form, Formik } from "formik";
import React from "react";
import Dropzone from "react-dropzone";
import ImageIcon from '../../../../../assets/icons/ImageIcon.svg';
import { useAddNoteMutation } from "../../../../../feature/services/note";
import { noteSchema } from "../../../../../schemas/noteSchema";
import Button from "../../../../common/Button/Button";
import InputField from "../../../../common/InputField/InputField";
import SelectField from "../../../../common/SelectField/SelectField";
import styles from "./AddNoteForm.module.css";

// TODO - Add image upload
// TODO - Change method to Radio Buttons

const AddNoteForm = () => {
    const [createNote] = useAddNoteMutation();

    return (
        <div className={styles.form}>
            <Formik
                initialValues={{
                    amount: "",
                    method: "Cash",
                    image: null,
                }}
                validationSchema={noteSchema}
                onSubmit={(values, { resetForm }) => {
                    let formData = new FormData();
                    formData.append('amount', values.name);
                    formData.append('method', values.method);
                    formData.append('image', values.image);
                    values = formData;
                    console.log("values", values);
                    createNote(values).then(
                        (res) => {
                            console.log("res", res);
                            resetForm();
                        }
                    );
                }}
            >
                {({ values, errors, touched, handleChange, setFieldValue }) => (
                    <Form>
                        <InputField
                            label="Amount"
                            name="amount"
                            type="number"
                            value={values.amount}
                            error={errors.amount}
                        />
                        <SelectField
                            label="Method"
                            name="method"
                            value={values.method}
                            error={errors.method}
                        >
                            <option value="Cash">Cash</option>
                            <option value="Card">Card</option>
                            <option value="Check">Check</option>
                        </SelectField>
                        <div className="form-group">
                            <Dropzone
                                onDrop={(acceptedFiles) => {
                                    setFieldValue('image', acceptedFiles[0]);
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} className={styles.dropzone}>
                                        <input {...getInputProps()} />
                                        {values.image ? (
                                            <div>
                                                {values.image.name} ({values.image.size} bytes)
                                            </div>
                                        ) : (
                                            <>
                                                <img src={ImageIcon} alt="Icon" />
                                                <div>Drag and drop or click to select a file</div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                            {errors.image && touched.image ? (
                                <div className="text-danger">{errors.image}</div>
                            ) : null}
                        </div>
                        <Button marginTop="2rem" label="Create" type="submit" />
                    </Form>
                )}
            </Formik>

        </div>
    );
}

export default AddNoteForm;