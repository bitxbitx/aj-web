import {
    Box,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    useCreateAccountMutation,
    useGetAccountByIdQuery,
    useUpdateAccountMutation,
} from "../../../../../feature/services/accounts";
import Button from "../../../../common/Button/Button";
import Loading from "../../../../common/Loading/Loading";

const AccountUpdate = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAccountByIdQuery(id);
  const [updateAccount] = useUpdateAccountMutation();
  const [createAccount] = useCreateAccountMutation();
  const history = useHistory();

  const handleSubmit = (values) => {
    if (id) {
      updateAccount({ id, ...values })
        .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            console.log(res.data);
            // history.push("/admin/accounts");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const { _id, ...rest } = values;
      createAccount(rest)
        .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            history.push("/admin/accounts");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            _id: data.account?._id || "",
            username: data.account?.username || "",
            password: data.account?.password || "",
            confirmPassword: "",
            role: data.account?.role || "",
            birthday: data.account?.birthday?.substring(0, 10) || "",
          }}
          onSubmit={handleSubmit}>
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
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Box height={20} />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Box height={20} />
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Box height={20} />
                  <FormControl fullWidth>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      labelId="role"
                      name="role"
                      label="Role"
                      value={values.role}
                      onChange={handleChange}>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="staff">Staff</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </FormControl>
                  <Box height={20} />
                  <TextField
                    label="Birthday"
                    name="birthday"
                    type="date"
                    value={values.birthday}
                    onChange={handleChange}
                    fullWidth
                  />
                  {/* White space */}
                  <Box height={20} />
                  <Button label="Save" type="submit" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom component="div">
                    Transactions
                  </Typography>
                  <Divider />
                  <List>
                    {data.account?.transactions?.map((transaction) => (
                      <ListItem key={transaction._id}>
                        <Typography
                          variant="body1"
                          gutterBottom
                          component="div">
                          {transaction._id}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AccountUpdate;
