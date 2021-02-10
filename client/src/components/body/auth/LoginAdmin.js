import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { loginValid } from "../../utils/validation/userValidation";

import {  Link,useHistory } from "react-router-dom";
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import {login} from '../../../actions/authAction'

import {useDispatch} from 'react-redux'

export const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState("")
  const history = useHistory()
  const dispatch = useDispatch()
  
  const handleSubmit = async () => {
      try {
        const res = await axios.post("/user/login/admin",{email,password})
        setSuccess(res.data.msg)
        localStorage.setItem("firstLogin",true)
        
        dispatch(login())
        history.push("/")
      } catch (error) {
        error.response.data.msg && setErr(error.response.data.msg)
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
        Admin Login
      </h1>
      <Formik
        initialValues={{
          email,
          password,
        }}
        validationSchema={loginValid}
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

          <button
            className="btn btn-md btn-warning col-sm-6 btn-block"
            type="submit"
          >
            Submit
          </button>
        
        </Form>
      </Formik>
      <div
        className="col-sm-6 mt-1"
        style={{ fontSize: "20px", textAlign: "center" }}
      >
        <Link to="/forgot">Forgot password</Link>
      </div>
    </div>
  );
};
