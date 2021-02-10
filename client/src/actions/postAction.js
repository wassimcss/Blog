import axios from 'axios'
import { tokenConfig } from './authAction'
import { getError } from './errorActions'
import {GET_POSTS,ADD_POST,MY_POSTS,FOLLOWED_POST} from './Types'

export const load_posts = () => (dispatch) => {
   axios.get("/api/all_posts")
   
   .then(res =>  dispatch({type:GET_POSTS,payload:res.data}))
   .catch(err => dispatch(getError(err.response.data,err.response.status)))
}


export const add_post = (post) => (dispatch,getState) => {
    axios.post("/api/create_post",post,tokenConfig(getState))
    .then(res => dispatch({type:ADD_POST,payload:res.data}))
    .catch(err => {
        dispatch(getError(err.response.data,err.response.status))
    })   
 }

export const get_myposts = () => (dispatch,getState) =>{
    axios.get("/api/myposts",tokenConfig(getState))
    .then(res => dispatch({type:MY_POSTS,payload:res.data}))
    .catch(err => dispatch(getError(err.response.data,err.response.msg)))
} 

export const followed_posts = () => (dispatch,getState) =>{
    axios.get("/api/followed_posts",tokenConfig(getState))
    .then(res => dispatch({type:FOLLOWED_POST,payload:res.data}))
    .catch(err => dispatch(getError(err.response.data,err.response.msg)))
} 

export const like_post = (postId) => (dispatch,getState) =>{
    axios.put("/api/like",postId,tokenConfig(getState))
    .then(res => dispatch(load_posts()))
    .catch(err => dispatch(getError(err.response.data,err.response.msg)))
} 

export const unlike_post = (postId) => (dispatch,getState) =>{
    axios.put("/api/unlike",postId,tokenConfig(getState))
    .then(res => dispatch(load_posts()))
    .catch(err => dispatch(getError(err.response.data,err.response.msg)))
} 

export const add_comment = (comment) => (dispatch,getState) =>{
    axios.put("/api/comment",comment,tokenConfig(getState))
    .then(res => dispatch(load_posts()))
    .catch(err => dispatch(getError(err.response.data,err.response.msg)))
}
