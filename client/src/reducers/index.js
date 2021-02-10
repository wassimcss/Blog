import {combineReducers} from 'redux'
import authReducer from './authReducer'
import error from './errorReducer'
import token from './tokenReducer'
import post from './postReducer'
import user from './userReducer'

export default combineReducers({authReducer,error,token,post,user})