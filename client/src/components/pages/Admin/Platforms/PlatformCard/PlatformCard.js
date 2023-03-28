import { Formik, Form } from "formik";
import { React, useState } from "react";
import ImageIcon from '../../../../../assets/icons/ImageIcon.svg';
import {
    useDeletePlatformMutation, useUpdatePlatformMutation
} from "../../../../../feature/services/platform";
import Button from "../../../../common/Button/Button";
import InputField from "../../../../common/InputField/InputField";
import styles from "./PlatformCard.module.css";
import Dropzone from 'react-dropzone';
import { useHistory } from "react-router-dom";

const PlatformCard = ({ platform }) => {
    const [updatePlatform] = useUpdatePlatformMutation();
    const [deletePlatform] = useDeletePlatformMutation();
    const [isEditing, setIsEditing] = useState(false);
    const history = useHistory();

    const handleDelete = () => {
        deletePlatform(platform._id);
    };

    return (
        <div className={styles.card}>
            {isEditing ? (
                <Formik
                initialValues={{
                    name: platform.name,
                    icon: null,
                }}
                // validationSchema={platformSchema}
                onSubmit={(values) => {
                    let formData = new FormData();
                    formData.append('name', values.name);
                    values.icon ?? formData.append('icon', values.icon);
                    values = formData;
                    console.log("values", values);
                    updatePlatform({platform: values, id: platform._id}).then(
                        (res) => {
                            console.log("res", res);
                            setIsEditing(false);
                            history.go(0);
                        }
                    );
                }}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <InputField
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter name"
                            />
                            {errors.name && touched.name ? (
                                <div className="text-danger">{errors.name}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <Dropzone
                                onDrop={(acceptedFiles) => {
                                    setFieldValue('icon', acceptedFiles[0]);
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} className={styles.dropzone}>
                                        <input {...getInputProps()} />
                                        {values.icon ? (
                                            <div>
                                                {values.icon.name} ({values.icon.size} bytes)
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
                            {errors.icon && touched.icon ? (
                                <div className="text-danger">{errors.image}</div>
                            ) : null}
                        </div>
                        <Button marginTop="2rem" label="Save" type="submit" />
                        <Button marginTop="1rem" label="Cancel" onClick={() => setIsEditing(false)} btnColor="#CC6577"/>
                    </Form>
                )}
            </Formik>
            ) : (
                <>
                    <div className={styles.content}>
                        <img src={`http://localhost:8000/file/assets/${platform.icon}`} alt={platform.name} className={styles.icon}/>
                        <p>{platform.name}</p>
                        <Button onClick={() => setIsEditing(true)} label="Edit" />
                        <Button onClick={handleDelete} label="Delete" btnColor="#CC6577"/>
                    </div>
                </>
            )}
        </div>
    );
};

export default PlatformCard;