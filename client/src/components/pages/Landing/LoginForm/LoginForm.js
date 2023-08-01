import { React } from "react";
import { useLoginMutation } from "../../../../feature/services/auth";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import { Snackbar } from "@mui/material";

const LoginForm = (props) => {
  const [login, { error }] = useLoginMutation();
  const history = useHistory();
  
  const handleSubmit = (values, { setSubmitting }) => {
    login(values).then((res) => {
      const role = res.data.account.role || "";
      console.log("Role: ", role )

      switch (role) {
        case "user":
          history.push("/user");
          break;
        case "admin":
          history.push("/admin");
          break;
        default:
          history.push("/");
      }
    }, setSubmitting(false));
  }


  return (
    <>
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          message={error.data.error}
          color="error"
        />
      )}

      <Formik
        initialValues={{
          username: "johndoe",
          password: "password123",
        }}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Username" type="text" name="username" />
            <InputField label="Password" type="password" name="password" />
            {error && <p className="error">{error.data.message}</p>}
            <Button
              type="submit"
              marginTop="20px"
              disabled={isSubmitting}
              label="Login"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
