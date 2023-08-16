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
    {/* <h1>BVN Verification Dashboard</h1> */}
      <h1 className="bvn">BVN Verification Dashboard</h1>
      <div className="mb-3">
     <label htmlFor="bvn" className="form-label">
        Please input your BVN
        </label>
      <div className="dashboard-header">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
   </div>
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
                    <label htmlFor="bvn">Email</label>
                    <div className="form-group">
                      <input
                        type="bvn"
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
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};


export default Dashboard;





// return (
//   <div className="container">

// <div className="container">
// <h1>BVN Verification Dashboard</h1>
//     <div className="dashboard-header">
//       <button className="logout-button" onClick={handleLogout}>
//         Logout
//       </button>
//     </div>

//     <form onSubmit={handleBvnVerification}>
//       <div className="mb-3">
//         <label htmlFor="bvn" className="form-label">
//           Please input your BVN
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           id="bvn"
//           name="bvn"
//           value={bvnInput}
//           value={values.bvn}
//           onChange={handleChange}
//           onChange={(e) => setBvnInput(e.target.value)}
//           // pattern="[0-9]{11}"
//           placeholder="Please enter a valid 11-digit BVN"
//           onBlur={handleBlur}
//           className={errors.bvn && touched.bvn ? "input-error":""}
//         />
//         {errors.bvn && touched.bvn && <p className="error">{errors.bvn}</p>}
//       </div>
//       <button disabled={isSubmitting} type="submit" className="btn btn-primary">
//         Verify BVN
//       </button>
//     </form>
//   </div>
//   </div>
// );
// };







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./verification.css";
// import { toast } from "react-hot-toast";
// import axiosInstance, { setAuthToken } from "../utils/axiosInstance";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("userData"));
//   const [bvnInput, setBvnInput] = useState("");
//   const [isBvnValid, setIsBvnValid] = useState(true); // Track BVN validation

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   const handleBvnVerification = async (e) => {
//     e.preventDefault();

//     // Validate BVN input
//     if (!/^[0-9]{11}$/.test(bvnInput)) {
//       setIsBvnValid(false);
//       return;
//     }

//     try {
//       const response = await axiosInstance.post(
//         `/users/verifyUserBvn?bvn=${bvnInput}`
//       );

//       if (response.data.status === "success") {
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }

//       setIsBvnValid(true); // Reset BVN validation status

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleLogout = () => {
//     setAuthToken();
//     localStorage.removeItem("userData");
//     navigate("/login");
//   };

//   return (
//     <div className="container">
//       <h1>BVN Verification Dashboard</h1>
//       <div className="dashboard-header">
//         <button className="logout-button" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       <form onSubmit={handleBvnVerification}>
//         <div className="mb-3">
//           <label htmlFor="bvn" className="form-label">
//             Please input your BVN
//           </label>
//           <input
//             type="text"
//             className={`form-control ${!isBvnValid ? "is-invalid" : ""}`}
//             id="bvn"
//             name="bvn"
//             value={bvnInput}
//             onChange={(e) => setBvnInput(e.target.value)}
//             pattern="[0-9]{11}"
//             title="Please enter a valid 11-digit BVN"
//             required
//           />
//           {!isBvnValid && (
//             <div className="invalid-feedback">Please enter a valid 11-digit BVN.</div>
//           )}
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Verify BVN
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Dashboard;







