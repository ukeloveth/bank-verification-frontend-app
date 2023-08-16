import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./verification.css";
import { toast } from "react-hot-toast";
import axiosInstance, { setAuthToken } from "../utils/axiosInstance";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { bvnPattern } from "../schemas";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));


  const validationSchema = yup.object().shape({
    bvn:yup.string().matches(bvnPattern,{message:"Please enter a valid 11-digit BVN"}).required("Required")
  });

  const initialValue = {
    bvn: "",
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

 
  
  const submit = async (values, helpers) => {
    console.log(values);
    try {
      const response = await axiosInstance.post(
        `/users/verifyUserBvn`, values.bvn
      );

      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      helpers.setSubmitting(false);
    } catch (error) {
      console.log(error);
      helpers.setSubmitting(false);
    }
}

  const handleLogout = () => {
    setAuthToken()
    localStorage.removeItem("userData");
    navigate("/login");
  };



  return (
    <>
      <h1 className="bvn">BVN Verification App</h1>
      <div className="dashboard-header">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

    <div className="verification-container">
      <div className="mb-3">
       
        <Formik
          initialValues={initialValue}
          onSubmit={submit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Field name="bvn">
                {({ field, meta }) => (
                  <>
                    <label htmlFor="bvn" >Verify Your BVN</label>
                    <div className="form-group">
                      <input
                        type="text"
                        id="bvn"
                        placeholder="Please input your BVN"
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
                Verify BVN
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
};

export default Dashboard;







