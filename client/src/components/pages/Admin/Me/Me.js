import React from 'react';
import styles from './Me.module.css';
import { Form, Formik } from 'formik';
import { accountDetailsSchema } from '../../../../schemas/accountDetailsSchema';
import InputField from '../../../common/InputField/InputField';
import Button from '../../../common/Button/Button';
import { useGetMeQuery } from '../../../../feature/services/auth';
import BounceLoader from 'react-spinners/BounceLoader';


/* 
    Me component
    Displays a form to edit account details
*/

const Me = () => {
    const [editMode, setEditMode] = React.useState(false);
    const { data, isLoading } = useGetMeQuery();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Account Details</h1>
                <Button
                    btnColor={editMode ? '#CC6577' : '#484B6A'}
                    label={editMode ? 'Cancel' : 'Edit'}
                    onClick={() => setEditMode(!editMode)}
                />
            </div>
            {isLoading ? (
                <BounceLoader color={'#484B6A'} loading={isLoading} size={150} />
            ) : (
                <Formik
                    initialValues={{
                        username: data.username,
                        email: data.email,
                        birthdate: data.birthdate.substring(0, 10),
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={accountDetailsSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <InputField
                                label="Username"
                                name="username"
                                type="text"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.username}
                                touched={touched.username}
                                disabled={!editMode}
                            />
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.email}
                                touched={touched.email}
                                disabled={!editMode}
                            />
                            <InputField
                                label="Birthdate"
                                name="birthdate"
                                type="date"
                                value={values.birthdate}
                                onChange={handleChange}

                                onBlur={handleBlur}
                                error={errors.birthdate}
                                touched={touched.birthdate}
                                disabled={!editMode}
                            />
                            <InputField
                                label="Change Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password}
                                touched={touched.password}
                                disabled={!editMode}
                            />
                            <InputField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                disabled={!editMode}
                            />

                            {editMode && <Button label="Save" type="submit" />}
                        </Form>
                    )}
                </Formik>
            )
            }
        </div>
    );
};

export default Me;