import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add_post } from "../../../actions/postAction";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
export const AddPost = () => {
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const changePhoto = async (e) => {
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
      setPhoto(res.data.url);
    } catch (err) {
      setErr(err.response.data.msg);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) {
     return setErr("title and content are required")
    }
    else{
        dispatch(add_post({ title, body, photo }));
        setSuccess("Post addes with success");
    }
   
  };

  return (
    <div className="container addpost" onSubmit={handleSubmit}>
      <div className=" d-flex justify-content-center">
        {err && showErrMsg(err)}
      </div>
      <div className=" d-flex justify-content-center">
        {success && showSuccessMsg(success)}
      </div>
      <div className=" d-flex justify-content-center">
        {loading && <h8>Loading.....</h8>}
      </div>
      <form className="form-group" >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body">Content</label>
        <textarea
          className="form-control"
          name="body"
          id=""
          cols="30"
          rows="4"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <br />
        <input type="file" onChange={changePhoto} />
        <button
          style={{ marginLeft: "40%" }}
          type="submit"
          className="btn btn-md btn-success"
        >
          Post
        </button>
      </form>
    </div>
  );
};
