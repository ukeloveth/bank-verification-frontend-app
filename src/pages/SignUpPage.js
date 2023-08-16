import { useNavigate } from "react-router-dom";
import './SignUpPage.css';
import axiosInstance from '../utils/axiosInstance';
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { passwordPattern } from "../schemas";

const SignUpPage = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    firstName:yup.string().required("Required"),
    lastName:yup.string().required("Required"),
    email: yup.string().email("Invalid email format").required("Required"),
    password: yup.string().matches(passwordPattern).required("Required"),
  });

  const initialValue = {
    firstName:"",
    lastName:"",
    email: "",
    password: "",
    };


const submit = (values,helpers) =>{
    console.log(values)
  
        axiosInstance.post('/users/signup', values)
            .then(response => {
              console.log(response);
              helpers.setSubmitting(false);
              navigate('/login');
            })
            .catch(error => {
              console.log(error);
              helpers.setSubmitting(false);
            });
    }


  

    const navigateToLogin = () => {
        navigate('/login');
    }

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


                <Field name="firstName">
                  {({ field, meta }) => (
                    <>
                      <label htmlFor="firstName">First Name</label>
                      <div className="form-group">
                        <input
                          type="firstName"
                          id="firstName"
                          placeholder="Enter your First Name"
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


                <Field name="lastName">
                  {({ field, meta }) => (
                    <>
                      <label htmlFor="lastName">Last Name</label>
                      <div className="form-group">
                        <input
                          type="lastName"
                          id="lastName"
                          placeholder="Enter your Last Name"
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

     <p className="signup-form" onClick={() => navigateToLogin()}>Back to Login</p>
      </div>
       </>
    )
}
export default SignUpPage;
