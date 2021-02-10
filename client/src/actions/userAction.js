import axios from 'axios'
import { tokenConfig } from './authAction'
import { getError } from './errorActions'
import { GET_ONE_USER } from './Types'

export const get_one_user = (id) => (dispatch,getState) =>  {
    axios.get("/user/"+id,tokenConfig(getState))
    .then(res => dispatch({type:GET_ONE_USER,payload:res.data}))
    .catch(err => dispatch(getError(err.response.data,err.response.msg)))
}

export const follow = (followId) => (dispatch,getState) =>  {
    axios.get("/user/follow",followId,tokenConfig(getState))
    .then(res => dispatch({type:GET_ONE_USER,payload:res.data}))
    .catch(err => dispatch(getError(err.response.data,err.response.msg)))
}
