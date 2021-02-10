import React from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {logout} from '../../actions/authAction';


export const Header = () => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)
  const handleLogout = async() => {
    try {
      dispatch(logout())
      localStorage.removeItem("firstLogin")
      //window.location.href = "/"
    } catch (error) {
      window.location.href = "/"
    }
  }
  
  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#">
          <img src="" alt="" /> {user.name}{" "}
          <i className="fas fa-angle-down"></i>
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/followed_posts">Home</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </li>
    );
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>
          <Link to="/">Blog</Link>
        </h1>
      </div>
      <div className="item">
        <ul>
          <li>
            <Link to="/posts">
              <i className="fas fa-blog"></i>Post
            </Link>
          </li>
          <li>
            {isAuth ?(userLink()) : (
              <Link to="/login">
                <i className="fas fa-user"></i>Sign in
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};
