import React , {useEffect , useState } from "react";
import {useSelector} from 'react-redux'
//import { get_one_user } from "../../../actions/userAction";
import {useParams} from 'react-router-dom'
import axios from 'axios'

export const UserProfile = () => {
  const id = useParams()
  //const [Id, setId] = useState(id)
  const token = useSelector(state => state.token)
  const [user, setUser] = useState("")
  console.log(id)
    //const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(get_one_user(id.id))
     
    // }, [dispatch,id])
    useEffect(() => {
      axios.get("/user/"+id.id,{headers:{authtoken:token}})
      .then(res => setUser(res.data.user))
      .catch(err => console.log(err))
     
    }, [id,token])
    console.log(user)
    //const user = useSelector(state => state.user)
    //console.log(user)
  return (
    <div>
         <div className=" d-flex justify-content-center">
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card p-3">
            <div className="d-flex align-items-center">
              <div className="image avatar">
                <img src={user.avatar} alt="profile" />
              </div>

              <div className="ml-3 w-100">
                <h4 className="mb-0 mt-0">
                 {user.name}
                </h4>{" "}
                <span>
                  {user.profession}
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
                      {user.age}
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
      </div>
    </div>
  );
};
