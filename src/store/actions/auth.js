import * as actionTypes from "./actionTypes"
import { useMutation,useLazyQuery } from '@apollo/client';
import {REGISTER_USER,LOGIN_USER} from "../../services/graphal/auth/authDataSchema"



export const authSuccess=(token,refreshToken ,user)=>{
    console.log("auth action runs")
    return {
        type:actionTypes.AUTH_SUCCESS,
       token,
       refreshToken,
       user
    }
}

export const authFaild=(error)=>{
    console.log(error)
    return {
        type:actionTypes.AUTH_FAILD,
       error
    }
}

export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START,
       
    }
}

export const logout=()=>{
    localStorage.removeItem('token');
      localStorage.removeItem('expireDate');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('_id');
      localStorage.removeItem('act');
      localStorage.removeItem('emailVerfied');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('photo');
    return {
        type:actionTypes.AUTH_LOGOUT,
       
    }
}

export const checkAuthTimeOut=(expireIn)=>{
    const expire=expireIn||3600000
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expire)//1h
        
    }
}


export const auth=(email,password)=>{
    return dispatch=>{
         dispatch(authStart())
         console.log("auth gonaa start")

    
    //  axios.post( '/', authData )
    //      .then( response => {
    //          console.log("auth data is... ",response.data.data.token)
    //        dispatch(authSuccess(response.data))
    //       // PushFunc("/")
    //      } )
    //      .catch( error => {
    //          dispatch(authFaild(error))
    //      } );
    }
}

export const autoLogin=()=>{
    console.log("auto login runs")
    return dispatch=>{
       const token=localStorage.getItem('token')
       if(!token){
           dispatch(logout())
       }else{
        const expireDate=new Date (localStorage.getItem('expireDate'))
        if(expireDate <= new Date()){
                dispatch(logout())

        }else{
            const refreshToken=localStorage.getItem('refreshToken');
            const name =localStorage.getItem('name');
            const email =localStorage.getItem('email');
            const photo =localStorage.getItem('photo'); 
          const id=  localStorage.getItem('_id');
            const act= localStorage.getItem('act');
            const emailVerfied= localStorage.getItem('emailVerfied');
            const user ={
                name,
                email,
                photo,
                id,
                act,
                emailVerfied
            }
            dispatch(authSuccess(token,refreshToken,user))
            const time=(expireDate.getTime()- new Date().getTime())
            console.log("time is ",time)
            dispatch(checkAuthTimeOut())
        }
          
        }
       }
    }
