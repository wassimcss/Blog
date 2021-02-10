import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { emailValid } from "../../utils/validation/userValidation";
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";


export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async() => {
     try {
       const res = await axios.post("/user/forgot",{email})
       console.log({email})
       setSuccess(res.data.msg)
     } catch (error) {
       error.response.data.msg && setErr(error.response.data.msg )
     }
  };

  return (
    <div className="container">
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <h1
        style={{
          fontFamily: "monospace",
          fontSize: 40,
          color: "coral",
        }}
      >
        Forgot Password
      </h1>

      <Formik
        initialValues={{
          email,
        }}
        validationSchema={emailValid}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        <Form style={{ display: "flex", flexDirection: "column" }}>
          <div className="form-group">
            <label htmlFor="email">Email</label> <br />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control col-sm-6"
            />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red", margin: "4px" }}
            />
          </div>

          <button
            className="btn btn-md btn-warning col-sm-6 btn-block"
            type="submit"
          >
            Submit
          </button>
         
        </Form>
      </Formik>
    </div>
  );
};
