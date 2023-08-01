import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, IconButton, TextareaAutosize } from "@mui/material";
import styles from "./ResultSubmitForm.module.css";
import { useCreateTransactionsMutation } from "../../../../../feature/services/transactions";

export default function ResultSubmitForm() {
  const [createTransactions, { isLoading }] = useCreateTransactionsMutation();

  const handleSubmit = (values) => {
    // Split the input string by the newline character to get individual entries
    const entries = values.result.split('\n');
  
    // Initialize an array to store the final JSON objects
    const resultArray = [];
  
    // Process each entry and create JSON objects
    for (const entry of entries) {
      const [platform, account, amount] = entry.split(' ');
      const amountValue = parseInt(amount);
  
      // Create the JSON object and push it to the result array
      const jsonObject = { platform, account, amount: amountValue };
      resultArray.push(jsonObject);
    }
  
    console.log(resultArray);

    createTransactions(resultArray);
  };

  return (
    <>
      <Formik
        initialValues={{
          result: "",
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValueisSubmitting,
        }) => (
          <Form className={styles.form}>
            <TextareaAutosize
              name="result"
              label="Result"
              placeholder="Enter result"
              value={values.result}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.result && Boolean(errors.result)}
              fullWidth
              margin="normal"
              variant="outlined"
              minRows={10}
              className={styles.textarea}
            />

            <Button 
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              fullWidth
              
            >
              Submit
            </Button>

          </Form>
        )}
      </Formik>
    </>
  );
}