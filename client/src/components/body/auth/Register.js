import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { registerValid } from "../../utils/validation/userValidation";


import axios from 'axios'
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";

function Register() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cf_password, setCf_password] = useState("");
 
  
  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      const res = await axios.post("/user/register", {
          name, email, password
      })
      setSuccess(res.data.msg)

     
  } catch (err) {
     err.response.data.msg && setError(err.response.data.msg)
  }
    
  }
  
  return (
    <div className="container">
      {error && showErrMsg(error)}
      {success && showSuccessMsg(success)}
      <h1
        style={{
          fontFamily: "monospace",
          fontSize: 40,
          color: "coral",
        }}
      >
        Register
      </h1>

      <Formik
        initialValues={{
         name,email,password,cf_password
        }}
        validationSchema={registerValid}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        <Form style={{ display: "flex", flexDirection: "column" }} >
          <div className="form-group">
            <label htmlFor="name">Name</label> <br />
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="First Name"
              className="form-control col-sm-6"
            />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red", margin: "4px" }}
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="password">Password</label> <br />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control col-sm-6"
            />
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red", margin: "4px" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cf_password">confirm password</label> <br />
            <input
              name="cf_password"
              type="password"
              placeholder="confirm your password"
              value={cf_password}
              onChange={(e) => setCf_password(e.target.value)}
              className="form-control col-sm-6"
            />
            <ErrorMessage
              name="cf_password"
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
}

export default Register;
