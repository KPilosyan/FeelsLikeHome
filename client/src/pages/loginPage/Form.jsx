import { useState } from "react";
import {
  Button,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "helpers/FlexBetween";
import styles from "./styles.module.scss";
import classNames from "classnames";

const trimTransform = value => (value ? value.trim() : value);

const registerSchema = yup.object().shape({
  firstName: yup.string().transform(trimTransform).required("required"),
  lastName: yup.string().transform(trimTransform).required("required"),
  email: yup.string().email("invalid email").transform(trimTransform).required("required"),
  password: yup.string().transform(trimTransform).required("required"),
  location: yup.string().transform(trimTransform).required("required"),
  profession: yup.string().transform(trimTransform).required("required"),
  picture: yup.string().transform(trimTransform).required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").transform(trimTransform).required("required"),
  password: yup.string().transform(trimTransform).required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  profession: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.formWrapper}>
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  className={classNames(styles.name, styles.lastNameField)}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  className={classNames(styles.name, styles.lastNameField)}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  className={classNames(styles.field, styles.locationField)}
                />
                <TextField
                  label="Profession"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.profession}
                  name="profession"
                  error={
                    Boolean(touched.profession) && Boolean(errors.profession)
                  }
                  helperText={touched.profession && errors.profession}
                  className={classNames(styles.field, styles.professionField)}
                />
                <div className={styles.imgUpload}>
                  <Dropzone 
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className={styles.dropzone}>
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <div>{values.picture.name}</div>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              className={styles.field}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              className={styles.field}
            />
          </div>

          {/* BUTTONS */}
          <div>
            <Button
              fullWidth
              type="submit"
              className={styles.submitButton}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <div
              className={styles.signInUpSwitch}
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here"
                : "Already have an account? Login here"}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;