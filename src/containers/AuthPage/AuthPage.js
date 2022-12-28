import react ,{useState,useEffect,useHistory} from "react"
import classes from "./AuthPage.module.css"
import { useMutation,useLazyQuery } from '@apollo/client';
import {REGISTER_USER,LOGIN_USER} from "../../services/graphal/auth/authDataSchema"
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { AUTH_LOGOUT } from "../../store/actions/actionTypes";
import axios from 'axios';
import BaseUrl from "../../StaticData";
const AuthPage=(props)=>{
  
    const [showLogin,updateshowLogin] =useState(true)
    const [showSingup,updateshowSingup] =useState(false)
    const [firstName,updateFirstName] =useState("")
    const [lastName,updateLastName] =useState("")
    const [countryCode,updateCountreyCode] =useState("")
    const [phoneNumber,updatePhoneNumber] =useState("")
    const [email,updateEmail] =useState("")
    const [password,updatePassword] =useState("")
    const [ErrorMassage,UpdateErrorMassge]=useState("")
    
    const [registerUser, registerLoading] = useMutation(REGISTER_USER,{
      update(proxy,result){
          console.log(result)
      },
      // variables:{
      //   name:Name,
      //   email:Email,
      //   password,
      //   act
      // }
  });
 
   const [loginUser,{loading}] = useMutation(LOGIN_USER,{
    //  variables:{
    //    email:Email,
    //    password:password,
    //  }
 })



  const SubmitRegister=async()=>{
    try {
      console.log("supmet runns")
      const {data} =await axios.post(`${BaseUrl}auth/signup`,{
        firstName,
        lastName,
        mobileNumber:{
          countryCode,
          phoneNumber
        },
        email,
        password,
      })

      //const {data}= await registerUser(); 
      console.log("register data ",data.data)  
    const {token,refreshToken,user}= data.data
     props.AuthSuccess(token,refreshToken,user)
     props.checkAuthTimeOut()
       const expireDate=new Date(new Date().getTime()+2.592e+9)
       localStorage.setItem('token',token);
       localStorage.setItem('expireDate',expireDate);
       localStorage.setItem('refreshToken',refreshToken);
      localStorage.setItem('firstName',user.firstName);
      localStorage.setItem('lastName',user.lastName);
      localStorage.setItem('email',user.email);
      localStorage.setItem('verified',user.verified);
      window.location.href="/";

    } catch (error) {
      console.log("error is ",{...error})
      UpdateErrorMassge(error.response.data.error)
      
    }
   
  }

  const SubmitLogin=async()=>{
    try {
      console.log("supmet runns")
      const {data} =await axios.post(`${BaseUrl}auth/login`,{
        email,
        password,
      })

      console.log("login data ",data.data)  
    const {token,refreshToken,user}= data.data
     props.AuthSuccess(token,refreshToken,user)
     props.checkAuthTimeOut()
       const expireDate=new Date(new Date().getTime()+2.592e+9)
       localStorage.setItem('token',token);
       localStorage.setItem('expireDate',expireDate);
       localStorage.setItem('refreshToken',refreshToken);
      localStorage.setItem('firstName',user.firstName);
      localStorage.setItem('lastName',user.lastName);
      localStorage.setItem('email',user.email);
      localStorage.setItem('verified',user.verified);
      window.location.href="/";

    } catch (error) {
      console.log("error is ",error.response.data.error)
      if(error.response.data){
        UpdateErrorMassge(error.response.data.error)

      }else{
        UpdateErrorMassge('validation faild')

      }
      
    }
   
  
  }

//  const submitHandler = ( event ) => {
//     event.preventDefault();
//    props.onAuth( Email, password );
// }

    const changViewSingUp=()=>{
        updateshowLogin(false)
        updateshowSingup(true)
    }

    const changViewLogin=()=>{
        updateshowLogin(true)
        updateshowSingup(false)
    }

    var login=(
        <react.Fragment>
    <input type="email" placeholder="email" className={classes.form}   onChange={(event)=>updateEmail(event.target.value)} ></input>
        <input type="password" placeholder="password" className={classes.form}  onChange={(event)=>updatePassword(event.target.value)}></input> 
        <div>
        <button className={classes.submitLogin} onClick={(event)=>SubmitLogin(event)} disabled={loading}  onKeyPress={event => event.key === 'Enter' ? SubmitLogin(event) : null}>login</button>
       
          </div> 
        </react.Fragment>
        
      )
      var singup=(
        <react.Fragment>
          <input type="name" placeholder="firstName"
          defaultValue={firstName}
          onChange={(event)=>updateFirstName(event.target.value)}
          className={classes.form}></input>

        <input type="name" placeholder="lastName"
          defaultValue={lastName}
          onChange={(event)=>updateLastName(event.target.value)}
          className={classes.form}></input>


       
    <div className={classes.customSelect}>
      <select 
      
       onChange={(event)=>{
         console.log("onslect run event is ",event.target.value)
         updateCountreyCode(event.target.value)
        }}
      
      >
      <option  selected disabled hidden>
          select country code
      </option>

        <option value="1">+971</option>
        <option value="2">+2</option>
      </select>
    </div>

    <input type="number" placeholder="phone number"
         defaultValue={phoneNumber}
         onChange={(event)=>updatePhoneNumber(event.target.value)}
        className={classes.form}></input>

      
        <input type="email" placeholder="email"
         defaultValue={email}
         onChange={(event)=>updateEmail(event.target.value)}
        className={classes.form}></input>


        <input type="password" placeholder="password"
         defaultValue={password}
         onChange={(event)=>updatePassword(event.target.value)}
        className={classes.form}></input>
    
    
        <div>
        <button className={classes.submitLogin} onClick={SubmitRegister}  onKeyPress={event => event.key === 'Enter' ? SubmitRegister : null}>singup</button>
          </div> 
        </react.Fragment>
      )
useEffect(()=>{
   
})

      return (
        <react.Fragment>
            <div className={classes.background} >

            
         <div className={classes.card}>
            <div className={classes.rightCard} >
         
            {
                showSingup?<button className={classes.SingupButton +' '+classes.activeButton} onClick={changViewSingUp}>singup</button>
                :  <button className={classes.SingupButton } onClick={changViewSingUp}>singup</button>
            }
            {
                showLogin?<button className={classes.loginButton+' '+classes.activeButton } onClick={changViewLogin}>login</button>
                :  <button className={classes.loginButton } onClick={changViewLogin}>login</button>
            }
          
              <div className={classes.SingInWord}> {showLogin? "singIn":"singup"}</div>
             {
             showLogin ? login : singup

             }
             <p>{ErrorMassage}</p>
              
            </div>
            <div className={classes.leftCard}>
            <div className={classes.logo}>VOITHY</div>
            <p className={classes.intro}>
            VOITHY,Through Voithy’s detailed reporting functionality, doctors are able to review their patients’ medication history and symptoms. This ensures they always have a clear view of how the patient is utilizing and responding to the treatment that has been recommended to them in their environment (outpatient).

            </p>
           <img src="https://voithy.com/wp-content/uploads/2022/08/happy-senior-mother-having-fun-with-adult-daughter-2021-09-29-22-34-03-utc.jpg" className={classes.img}></img>
    
            </div>
         </div>
         </div>
        </react.Fragment>
      );
    
}



const mapDispatchToProps = dispatch => {
  return {
      onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
      AuthSuccess: ( token,refreshToken ,user) => dispatch( actions.authSuccess( token,refreshToken ,user ) ) ,
      AuthFaild: ( error ) => dispatch( actions.authFaild( error ) )  ,
      checkAuthTimeOut: (  ) => dispatch( actions.checkAuthTimeOut(  ) )  
  };
};

export default connect( null, mapDispatchToProps )( AuthPage );