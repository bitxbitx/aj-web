import { React } from "react";
import { useLoginMutation } from "../../../../feature/services/auth";
import { Form, Formik } from "formik";
import { loginSchema } from "../../../../schemas/loginSchema";
import { useHistory } from "react-router-dom";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";

const LoginForm = (props) => {
  const [login, { error }] = useLoginMutation();
  const history = useHistory();

  return (
    <>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            login(values).then((res) => {
              console.log("res", res)
              if ( res.data.role === "admin" ) history.push("/admin")
              else if ( res.data.role === "staff" ) history.push("/admin")
              else if ( res.data.role === "user" ) history.push("/customer")
              
            }, setSubmitting(false));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField label="Username" type="text" name="username" />
              <InputField label="Password" type="password" name="password" />
              {error && <p className="error">{error.data.message}</p>}
              <Button type="submit" disabled={isSubmitting} label="Login" />
            </Form>
          )}
        </Formik>
    </>
  );
};

export default LoginForm;
