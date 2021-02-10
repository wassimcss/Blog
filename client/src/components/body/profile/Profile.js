import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { edit_profile } from "../../../actions/authAction";
import { AddPost } from "../posts/AddPost";

import { MyPosts } from "../posts/MyPosts";

export const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [profession, setProfession] = useState(user.profession);
  const [edit, setEdit] = useState(false);
  const [edit1, setEdit1] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    const profile = {
      name: name ? name : user.name,
      avatar: avatar ? avatar : user.avatar,
      age: age ? age : user.age,
      profession: profession ? profession : user.profession,
    };
    dispatch(edit_profile(profile, token));
    setSuccess("Update successd");
  };

  
  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) return setErr("No files were uploaded.");

      if (file.size > 1024 * 1024) return setErr("Size too large.");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setErr("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_avatar", formData, {
        headers: { "content-type": "multipart/form-data", authtoken: token },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setErr(err.response.data.msg);
    }
  };

  return (
    <div className="container ">
      <div className=" d-flex justify-content-center">
        {err && showErrMsg(err)}
      </div>
      <div className=" d-flex justify-content-center">
        {success && showSuccessMsg(success)}
      </div>
      <div className=" d-flex justify-content-center">
        {loading && <h3>Loading.....</h3>}
      </div>

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-3">
          <div className="d-flex align-items-center">
            <div className="image avatar">
              <img
                src={
                  avatar
                    ? avatar
                    : user.avatar
                }
                alt="profile"
              />
              <span>
                <i className="fas fa-camera"></i>
                <p>Change</p>
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  onChange={changeAvatar}
                />
              </span>
            </div>

            <div className="ml-3 w-100">
              <h4 className="mb-0 mt-0">
                {edit ? (
                  <input
                    type="text"
                    value={name ? name : ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  name ? name : user.name
                )}{" "}
                <i className="fas fa-edit" onClick={() => setEdit(!edit) }></i>
                <button
                  className="btn btn-sm btn-danger"
                  style={{ right: "60px", position: "absolute" }}
                  onClick={handleClick}
                >
                  Confirm
                </button>
              </h4>{" "}
              <span>
                {edit1 ? (
                  <input
                    type="text"
                    value={profession ? profession : ""}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                ) : (
                  profession ? profession :user.profession
                )}{" "}
                <i className="fas fa-edit" onClick={() => setEdit1(!edit1)}></i>
              </span>
              <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                <div className="d-flex flex-column">
                  {" "}
                  <span className="articles">Following</span>{" "}
                  <span className="number1">38</span>{" "}
                </div>
                <div className="d-flex flex-column">
                  {" "}
                  <span className="followers">Followers</span>{" "}
                  <span className="number2">980</span>{" "}
                </div>
                <div className="d-flex flex-column">
                  {" "}
                  <span className="rating">Age</span>{" "}
                  <span className="number">
                    {edit2 ? (
                      <input
                        type="number"
                        value={age ? age : ""}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    ) : (
                      age ? age : user.age
                    )}
                    <i
                      className="fas fa-edit"
                      onClick={() => setEdit2(!edit2)}
                    ></i>
                  </span>{" "}
                </div>
              </div>
              <div className="button mt-2 d-flex flex-row align-items-center">
                {" "}
                <button className="btn btn-sm btn-outline-primary w-100">
                  Unfolow
                </button>{" "}
                <button className="btn btn-sm btn-primary w-100 ml-2">
                  Follow
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddPost/>
      <MyPosts/>
    </div>
  );
};
