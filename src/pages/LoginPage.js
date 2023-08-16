import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axiosInstance, { setAuthToken } from "../utils/axiosInstance";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { passwordPattern } from "../schemas";

const LoginPage = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Required"),
    password: yup.string().matches(passwordPattern).required("Required"),
  });

  const initialValue = {
    email: "",
    password: "",
  };

  const submit = (values, helpers) => {
    console.log(values);
    axiosInstance
      .post("/users/login", values)
      .then((response) => {
        localStorage.setItem("userData", JSON.stringify(response.data));
        setAuthToken(response.data.body.confirmationToken);
        helpers.setSubmitting(false);

        navigate("/dashboard");
      })
      .catch((error) => {
        helpers.setSubmitting(false);
        console.log(error);
      });
  };
  

  const navigateToSignUp = () => {
    navigate("/signUp");
  };

  return (
    <>
      <h1 className="login-page">Login Page</h1>
      <div className="login-form">
        <Formik
          initialValues={initialValue}
          onSubmit={submit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Field name="email">
                {({ field, meta }) => (
                  <>
                    <label htmlFor="email">Email</label>
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className={`form-control ${
                          meta.touched && meta.error ? "input-error" : ""
                        }`}
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <p className="error">{meta.error}</p>
                      )}
                    </div>
                  </>
                )}
              </Field>

              <Field name="password">
                {({ field, meta }) => (
                  <>
                    <label htmlFor="password">Password</label>
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className={`form-control ${
                          meta.touched && meta.error ? "input-error" : ""
                        }`}
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <p className="error">{meta.error}</p>
                      )}
                    </div>
                  </>
                )}
              </Field>

              <button
                disabled={isSubmitting || !isValid}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>

        <p
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={navigateToSignUp}
        >
          Sign Up
        </p>
      </div>
    </>
  );
};
export default LoginPage;

