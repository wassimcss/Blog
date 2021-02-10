import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { passwordValid } from "../../utils/validation/userValidation";

import axios from 'axios'
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import { useParams } from "react-router";

export const ResetPassword = () => {
  
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState("")
  const {token} = useParams()
  console.log(token)
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/user/reset",{password},{headers:{authtoken:token}})
      setSuccess(res.data.msg)
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg)
    }
  };

  return (
    <div>
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
            password,
          }}
          validationSchema={passwordValid}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <div className="form-group">
              <label htmlFor="password">password</label> <br />
              <input
                name="password"
                type="password"
                placeholder="password"
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
      </div>
    </div>
  );
};
