import React from 'react';
import styles from './AccountDetails.module.css';
import { Form, Formik } from 'formik';
import { accountDetailsSchema } from '../../../../schemas/accountDetailsSchema';
import InputField from '../../../common/InputField/InputField';
import Button from '../../../common/Button/Button';

/* 
    AccountDetails component
    Displays a form to edit account details
*/

const AccountDetails = () => {
    const [ editMode, setEditMode ] = React.useState(false);

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
            <Formik
                initialValues={{
                    name: '',
                    birthday: ''
                }}
                validationSchema={accountDetailsSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <InputField
                            label="Name"
                            name="name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name}
                            touched={touched.name}
                            disabled={!editMode}
                        />
                        <InputField
                            label="Birthday"
                            name="birthday"
                            type="date"
                            value={values.birthday}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.birthday}
                            touched={touched.birthday}
                            disabled={!editMode}
                        />
                        {editMode && <Button label="Save" type="submit" />}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AccountDetails;