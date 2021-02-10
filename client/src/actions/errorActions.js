  
import { CLEAR_ERRORS, GET_ERRORS } from "./Types";

//GET Errors
export const getError = (msg,status,id=null) => ({
    type: GET_ERRORS,
    payload : {msg , status , id}
})

//CLEAR Errors
export const clearError = () => ({
    type: CLEAR_ERRORS
})