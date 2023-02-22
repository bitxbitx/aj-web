import React from "react";
import styles from "./AddAccount.module.css";
import { useAddAccountMutation } from "../../../../feature/services/accounts";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { createAccountSchema } from "../../../../feature/services/accounts/accounts.schema";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";

const AddAccount = () => {
    const { mutateAsync } = useAddAccountMutation();
    const history = useHistory();

    return (
        <div className={styles.addAccount}>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    username: "",
                    role: "",
                    confirmPassword: "",
                    birthdate: "",
                }}
                validationSchema={createAccountSchema}
                onSubmit={async (values) => {
                    await mutateAsync(values);
                    history.push("/admin/accounts");
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Username"
                            name="username"
                            type="text"
                            value={values.username}
                            onChange={handleChange}
                        />

                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddAccount;