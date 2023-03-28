
import { Form, Formik } from "formik";
import { React } from "react";
import Dropzone from 'react-dropzone';
import BounceLoader from "react-spinners/BounceLoader";
import ImageIcon from '../../../../assets/icons/ImageIcon.svg';
import {
    useAddPlatformMutation, useGetPlatformsQuery
} from "../../../../feature/services/platform";
import Button from "../../../common/Button/Button";
import InputField from "../../../common/InputField/InputField";
import PlatformCard from "./PlatformCard/PlatformCard";
import styles from "./Platforms.module.css";

const Platforms = () => {
    const { data, isLoading, error } = useGetPlatformsQuery();
    const [createPlatform] = useAddPlatformMutation();

    return (
        <>
            <h1>Platforms</h1>
            <div className={styles.error}>
                {error && <p>{error}</p>}
            </div>
            <div className={styles.container}>

                {isLoading ? (
                    <BounceLoader />
                ) : (
                    <>
                        <div className={styles.form}>
                            <Formik
                                initialValues={{
                                    name: '',
                                    icon: null,
                                }}
                                onSubmit={(values) => {
                                    let formData = new FormData();
                                    formData.append('name', values.name);
                                    formData.append('icon', values.icon);
                                    values = formData;
                                    console.log("values", values);
                                    createPlatform(values).then(
                                        (res) => {
                                            console.log("res", res);
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
                                        <Button marginTop="2rem" label="Create" type="submit" />
                                    </Form>
                                )}
                            </Formik>

                        </div>

                        <div className={styles.platforms}>
                            {data && data.map((platform) => (
                                <PlatformCard key={platform.id} platform={platform} />
                            ))}
                        </div>

                    </>
                )}
            </div>
        </>
    )
}

export default Platforms;