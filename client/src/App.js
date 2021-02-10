//import "bootstrap/dist/css/bootstrap.min.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";
//import "bootstrap-css-only/css/bootstrap.min.css";
//import "mdbreact/dist/css/mdb.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Body } from "./components/body/Body";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/header/Header";
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { get_token, load_user, login } from "./actions/authAction";



function App() {
 const dispatch = useDispatch()
 const isAuth = useSelector(state => state.authReducer.isAuth)
 const firstLogin = localStorage.getItem("firstLogin")
 const token = useSelector(state => state.token)
 
  useEffect(() => {
   if (firstLogin){
     return dispatch(get_token())
   }
  }, [dispatch,firstLogin,isAuth])
  useEffect(() => {
    if (token){
      dispatch(load_user(token))
      dispatch(login())
    }
   
  }, [token,dispatch])
  return (
    <Router>
      <div className="App">
        <Header />
        <Body />
      </div>
    </Router>
  );
}

export default App;
