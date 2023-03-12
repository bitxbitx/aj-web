import React from "react";
import styles from "./AddResult.module.css";
import { Form, Formik } from "formik";
import { resultSchema } from "../../../../schemas/resultSchema";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import { useCreateMultipleResultsMutation } from "../../../../feature/services/results";
import { useHistory } from "react-router-dom";
import SelectField from "../../../common/SelectField/SelectField";
import { useGetPlatformsQuery } from "../../../../feature/services/platform";
import BounceLoader from "react-spinners/BounceLoader";

const AddResult = () => {
    const [createMultipleResults, { isLoading }] = useCreateMultipleResultsMutation();
    const history = useHistory();
    const { data: platforms, isLoading: platformsIsLoading } = useGetPlatformsQuery();
    const handleSubmit = async (values) => {
        const { results } = values;
        await createMultipleResults(results)
            .unwrap()
            .then((res) => {
                history.push("/admin/results");
            }
            );
    };

    return (
        <div className={styles.container}>
            {platformsIsLoading ? (
                <div className={styles.loader}>
                    <BounceLoader color="#484B6A" size={100} />
                </div>
            ) : (
                <Formik
                    initialValues={{ results: [{ amount: "", account: "", platform: "" }] }}
                    validationSchema={resultSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className={styles.button__container}>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setFieldValue("results", [
                                            ...values.results,
                                            { amount: "", account: "", platform: "" },
                                        ])
                                    }
                                    label="Add Result"
                                />

                                <Button type="submit" label="Submit" disabled={isLoading} />
                            </div>
                            <div className={styles.result__container}>
                                {values.results.map((result, index) => (
                                    <div className={styles.result__card} key={index}>
                                        <div className={styles.result__card__header}>
                                            <h3>Result {index + 1}</h3>
                                            <Button
                                                label="Remove"
                                                type="button"
                                                btnColor="#CC6577"
                                                onClick={() => {
                                                    const results = values.results.filter((_, i) => i !== index);
                                                    setFieldValue("results", results);
                                                }} />
                                        </div>
                                        <InputField
                                            name={`results[${index}].amount`}
                                            label="Amount"
                                            type="number"
                                            placeholder="Amount"
                                        />
                                        <InputField
                                            name={`results[${index}].account`}
                                            label="Account"
                                            type="text"
                                            placeholder="Account"
                                        />
                                        <SelectField
                                            name={`results[${index}].platform`}
                                            label="Platform"
                                            options={platforms}
                                        >
                                            <option value="">Select Platform</option>
                                            {platforms && platforms.map((platform) => (
                                                <option key={platform.id} value={platform.id}>
                                                    {platform.name}
                                                </option>
                                            ))}
                                        </SelectField>

                                    </div>
                                ))}
                            </div>
                        </Form>
                    )}
                </Formik>
            )}

        </div>
    );
}

export default AddResult;