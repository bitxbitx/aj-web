import React from 'react';
import styles from './AccountDetails.module.css';
import { Form, Formik } from 'formik';
import InputField from '../../../common/InputField/InputField';
import Button from '../../../common/Button/Button';
import { useGetMeQuery } from '../../../../feature/services/auth';
import BounceLoader from 'react-spinners/BounceLoader';
import { useUpdateProfileMutation } from '../../../../feature/services/auth';

/* 
    AccountDetails component
    Displays a form to edit account details
*/

const AccountDetails = () => {
    const [editMode, setEditMode] = React.useState(false);
    const [updateAccount] = useUpdateProfileMutation();
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
                <div className={styles.loader}>
                    <BounceLoader color="#484B6A" />
                </div>
            ) : (
                <Formik
                    initialValues={{
                        username: data?.username || '',
                        email: data?.email || '',
                        changePassword: '',
                        confirmPassword: '',
                        birthdate: data?.birthdate.substring(0, 10) || ''
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        try {
                            await updateAccount({id: data._id, ...values});
                            setEditMode(false);
                        } catch (err) {
                            setErrors(err);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles.form}>
                            <InputField
                                name="username"
                                label="Username"
                                type="text"
                                disabled={true}
                            />
                            <InputField
                                name="email"
                                label="Email"
                                type="email"
                                disabled={true}
                            />
                            <InputField
                                name="changePassword"
                                label="Change Password"
                                type="password"
                                disabled={!editMode}
                            />
                            <InputField
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                disabled={!editMode}
                            />
                            <InputField
                                name="birthdate"
                                label="Birthdate"
                                type="date"
                                disabled={!editMode}
                            />
                            { editMode && (
                                <Button
                                btnColor="#484B6A"
                                label="Save"
                                type="submit"
                                marginTop="1rem"
                                disabled={!editMode || isSubmitting}
                            />
                            )}
                        </Form>
                    )}
                </Formik>
            )
            }
        </div>
    );
};

export default AccountDetails;