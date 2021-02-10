import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import {useDispatch , useSelector} from 'react-redux'

import axios from 'axios'

export const ActivationEmail = () => {
    //const error = useSelector(state => state.error)
   const isAuth = useSelector(state => state.authReducer.isAuth)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const activation_token = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        const activate_email = async() => {
            try {
                const res = await axios.post("/user/activation",activation_token)
                
                setSuccess(res.data.msg)
            } catch (err) {
                err.response.data.msg && setError(err.response.data.msg)
            }
        }
        activate_email()
    },[dispatch,activation_token,isAuth])

    return (
        <div>
            { error && showErrMsg(error)  }
            { success && showSuccessMsg(success) }
        </div>
    )
}
