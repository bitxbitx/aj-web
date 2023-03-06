import React from "react";
import styles from "./AccountDetails.module.css";
import { useGetAccountByIdQuery, useDeleteAccountMutation, useUpdateAccountMutation } from "../../../../../feature/services/accounts";
import { useParams } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { Form, Formik, FieldArray } from "formik";
import InputField from "../../../../common/InputField/InputField";
import Button from "../../../../common/Button/Button";
import SelectField from "../../../../common/SelectField/SelectField";
import { Divider } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useGetPlatformsQuery } from "../../../../../feature/services/platform";

const AccountDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetAccountByIdQuery(id);
    const [deleteAccount] = useDeleteAccountMutation();
    const [updateAccount] = useUpdateAccountMutation();
    const { data: platforms } = useGetPlatformsQuery();
    const [ platform, setPlatform ] = React.useState("");
    const history = useHistory();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Account Details</h1>
                <Button
                    btnColor="#CC6577"
                    label="Delete"
                    onClick={() => {
                        deleteAccount(id).then(
                            (res) => {
                                console.log("res", res);
                                history.push("/admin/accounts");
                            }
                        );
                    }}
                />
            </div>
            {isLoading ? (
                <div className={styles.loader}>
                    <BounceLoader color="#484B6A" />
                </div>
            ) : (
                < Formik
                    initialValues={{
                        _id: data._id,
                        username: data.username,
                        totalbalance: data.totalbalance,
                        email: data.email,
                        password: data.password,
                        role: data.role,
                        birthdate: data.birthdate.substring(0, 10),
                        platformAccounts: data.platformAccounts,
                        confirmPassword: "",
                    }}
                    onSubmit={(values) => {
                        console.log("values", values);
                        updateAccount(values).then(
                            (res) => {
                                console.log("res", res);
                                history.push("/admin/accounts");
                            }
                        );
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={styles.basic__info}>
                                <div className={styles.basic__info__left}>
                                    <InputField label="Username" name="username" type="text" />
                                    <InputField label="Total Balance" name="totalbalance" type="number" disabled />
                                    <SelectField label="Role" name="role"                                    >
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                        <option value="customer">Customer</option>
                                    </SelectField>
                                    <InputField label="Birthdate" name="birthdate" type="date" />
                                </div>
                                <div className={styles.basic__info__right}>
                                    <InputField label="Email" name="email" type="email" disabled />
                                    <InputField label="New Password" name="password" type="password" />
                                    <InputField label="Confirm Password" name="confirmPassword" type="password" />
                                </div>
                            </div>
                            <Divider
                                sx={{
                                    borderBottomWidth: "medium",
                                    borderColor: "#484B6A1A",
                                    borderRadius: "10px",
                                }}
                            />

                            <FieldArray
                                name="platformAccounts"
                                render={arrayHelpers => (
                                    <>
                                        <div className={styles.platform__info__toolbar}>
                                            <SelectField label="Platform" name="platforms" value={platform}>
                                                {platforms.map((platform, index) => (
                                                    <option key={index} value={platform.name}>{platform.name}</option>
                                                ))}
                                            </SelectField>
                                            <Button
                                                label="Add Platform"
                                                onClick={() => {
                                                    arrayHelpers.push({
                                                        platform: {
                                                            name: "",
                                                        },
                                                        balance: 0,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className={styles.platform__info__content}>

                                            {data.platformAccounts.map((platformAccount, index) => (
                                                <div className={styles.platform__info__content__card} key={index}>
                                                    <div className={styles.platform__info__content__card__header}>
                                                        {platformAccount.platform.name}
                                                    </div>
                                                    <InputField
                                                        type="number"
                                                        key={index}
                                                        name={`platformAccounts[${index}].balance`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                            />


                            <Button label="Save" type="submit" />
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}

export default AccountDetails;