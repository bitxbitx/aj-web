import React from "react";
import {
    useGetResultByIdQuery,
    useDeleteResultMutation,
    useUpdateResultMutation
} from "../../../../../feature/services/results";
import styles from "./ResultDetails.module.css";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import BounceLoader from "react-spinners/BounceLoader";
import InputField from "../../../../common/InputField/InputField";
import Button from "../../../../common/Button/Button";
import SelectField from "../../../../common/SelectField/SelectField";
import { useGetPlatformsQuery } from "../../../../../feature/services/platform";
import { resultSchema } from "../../../../../schemas/resultSchema";


const ResultDetails = (props) => {
    const { id } = useParams();
    const history = useHistory();
    const { data: result, isLoading: resultIsLoading } = useGetResultByIdQuery(id);
    const [deleteResult] = useDeleteResultMutation();
    const [updateResult] = useUpdateResultMutation();
    const { data: platforms, isLoading: platformsIsLoading } = useGetPlatformsQuery();

    const handleDelete = async () => {
        await deleteResult(id)
            .unwrap()
            .then((res) => {
                history.push("/admin/results");
            });
    };

    const handleSubmit = async (values) => {
        await updateResult({ id, ...values })
            .unwrap()
            .then((res) => {
                history.push("/admin/results");
            });
    };

    return (
        <div className={styles.container}>
            {resultIsLoading || platformsIsLoading ? (
                <div className={styles.loader}>
                    <BounceLoader color="#484B6A" size={100} />
                </div>
            ) : (
                <div className={styles.result__container}>
                    <div className={styles.result__card}>
                        <div className={styles.result__card__header}>
                            <h3>Result Details</h3>
                            <div className={styles.result__card__header__buttons}>
                                <Button
                                    type="button"
                                    onClick={handleDelete}
                                    label="Delete"
                                    disabled={props.isLoading}
                                    btnColor="#CC6577"
                                />
                            </div>
                        </div>
                        <div className={styles.result__card__body}>
                            <Formik
                                initialValues={{
                                    amount: result.amount,
                                    account: result.account.username,
                                    platform: result.platform.name,
                                }}
                                validationSchema={resultSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values }) => (
                                    <Form>
                                        <div className={styles.result__card__body__input}>
                                            <InputField
                                                name="amount"
                                                type="number"
                                                label="Amount"
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                        <div className={styles.result__card__body__input}>
                                            <InputField
                                                name="account"
                                                type="text"
                                                label="Account"
                                                placeholder="Enter account"
                                            />
                                        </div>
                                        <div className={styles.result__card__body__input}>
                                            <SelectField

                                                name="platform"
                                                label="Platform"
                                                options={platforms}
                                                placeholder="Select platform"
                                            >
                                                {platforms.map((platform) => (
                                                    <option key={platform._id} value={platform.name}>
                                                        {platform.name}
                                                    </option>
                                                ))}
                                            </SelectField>
                                            
                                        </div>
                                        <div className={styles.result__card__body__input}>
                                            <Button
                                                type="submit"
                                                label="Update"
                                                disabled={props.isLoading}
                                                vertMargin="2rem"
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResultDetails;