import React from "react";
import styles from "./AddAccount.module.css";
import { useCreateAccountMutation } from "../../../../feature/services/accounts";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { createAccountSchema } from "../../../../schemas/createAccountSchema";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import SelectField from "../../../common/SelectField/SelectField";

const AddAccount = () => {
    const [createAccount] = useCreateAccountMutation();
    const history = useHistory();
    const [ error, setError ] = React.useState(null);

    return (
        <div className={styles.addAccount}>
            <h1 className={styles.title}>Add Account</h1>
            <Formik
                initialValues={{
                    username: "testaccount",
                    email: "cookiecouple123@live.com",
                    password: "Sn1234",
                    confirmPassword: "Sn1234",
                    role: "customer",
                    birthdate: "",
                }}
                validationSchema={createAccountSchema}
                onSubmit={(values, { setSubmitting }) => {
                    createAccount(values).then((res) => {
                        console.log(res)
                        if (res.data) {
                            history.push("/admin/accounts")
                        }
                        else { 
                            setError(res.error.data.message);
                        }
                    }, setSubmitting(false));
                }}
            >
                {({ isSubmitting }) => (
                    <Form >
                        {error && <div className={styles.error__card}> <p className={styles.error}>{error}</p></div>}
                        <InputField label="Username" name="username" type="text" />
                        <InputField label="Email" name="email" type="email" />
                        <InputField label="Password" name="password" type="password" />
                        <InputField label="Confirm Password" name="confirmPassword" type="password" />
                        <SelectField label="Role" name="role">
                            <option value="customer" default >Customer</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                        </SelectField>
                        <InputField label="Birthdate" name="birthdate" type="date" />
                        <Button type="submit" label="Submit" disabled={isSubmitting} />
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddAccount;