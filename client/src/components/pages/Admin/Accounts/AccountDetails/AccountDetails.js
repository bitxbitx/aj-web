import { Divider } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { useDeleteAccountMutation, useGetAccountByIdQuery, useUpdateAccountMutation } from "../../../../../feature/services/accounts";
import { useGetPlatformsQuery } from "../../../../../feature/services/platform";
import Button from "../../../../common/Button/Button";
import InputField from "../../../../common/InputField/InputField";
import SelectField from "../../../../common/SelectField/SelectField";
import styles from "./AccountDetails.module.css";

const AccountDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetAccountByIdQuery(id);
    const [deleteAccount] = useDeleteAccountMutation();
    const [updateAccount] = useUpdateAccountMutation();
    const { data: platforms } = useGetPlatformsQuery();
    const [platform, setPlatform] = React.useState("");
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
                                            <SelectField label="Platform" name="platforms" value={platform} onChange={
                                                (e) => {
                                                    setPlatform(e.target.value);
                                                }
                                            }>
                                                {platforms.map((platform, index) => (
                                                    <option key={index} value={platform.name}>{platform.name}</option>
                                                ))}
                                            </SelectField>
                                            <Button
                                                label="Add Platform"
                                                type="button"
                                                onClick={() => {
                                                    console.log("platform", platform)
                                                    if (platform === "") {
                                                        alert("Please select a platform");
                                                        return;
                                                    }
                                                    if (arrayHelpers.form.values.platformAccounts.find((el) => el.platform.name === platform)) {
                                                        alert("Platform already exists");
                                                        return;
                                                    }
                                                    arrayHelpers.push({
                                                        platform: platforms.find((el) => el.name === platform),
                                                        balance: 0,
                                                    });
                                                    console.log(arrayHelpers.form.values.platformAccounts)
                                                    console.log("data.platformAccounts", data.platformAccounts)
                                                    console.log("Filter", platforms.find((el) => el.name === platform))
                                                }}
                                            />
                                        </div>
                                        <div className={styles.platform__info__content}>

                                            {arrayHelpers.form.values.platformAccounts.map((platformAccount, index) => (
                                                <div className={styles.platform__info__content__card} key={index}>
                                                    <div className={styles.platform__info__content__card__header}>
                                                        <img src={`http://localhost:8000/file/assets/${platformAccount.platform.icon}`} alt={platformAccount.platform.name} className={styles.icon} />
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