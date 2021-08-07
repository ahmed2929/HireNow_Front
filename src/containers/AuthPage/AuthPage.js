import react ,{useState,useEffect,useHistory} from "react"
import classes from "./AuthPage.module.css"
import { useMutation,useLazyQuery } from '@apollo/client';
import {REGISTER_USER,LOGIN_USER} from "../../services/graphal/auth/authDataSchema"
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { AUTH_LOGOUT } from "../../store/actions/actionTypes";
const AuthPage=(props)=>{
  
    const [showLogin,updateshowLogin] =useState(true)
    const [showSingup,updateshowSingup] =useState(false)
    const [Name,updateName] =useState("")
    const [Email,updateEmail] =useState("")
    const [password,updatePassword] =useState("")
    const [act,updateAct] =useState("")
    const [ErrorMassage,UpdateErrorMassge]=useState("")
    
    const [registerUser, registerLoading] = useMutation(REGISTER_USER,{
      update(proxy,result){
          console.log(result)
      },
      variables:{
        name:Name,
        email:Email,
        password,
        act
      }
  });
  console.log("act ",act)
  




   const [loginUser,{loading}] = useMutation(LOGIN_USER,{
     variables:{
       email:Email,
       password:password,
     }
 })



  const SubmitRegister=async()=>{
    try {
      const {data}= await registerUser(); 
      console.log("register data ",data)  
        const {token,refreshToken,user}= data.register
    props.AuthSuccess(token,refreshToken,user)
    props.checkAuthTimeOut()
      const expireDate=new Date(new Date().getTime()+3600000)
      localStorage.setItem('token',token);
      localStorage.setItem('expireDate',expireDate);
      localStorage.setItem('refreshToken',refreshToken);
      localStorage.setItem('name',user.name);
      localStorage.setItem('email',user.email);
      localStorage.setItem('photo',user.photo);
      localStorage.setItem('_id',user.id);
      localStorage.setItem('act',user.act);
      localStorage.setItem('emailVerfied',user.emailVerfied);
      window.location.href="/";

    } catch (error) {
      UpdateErrorMassge(error.message)
      
    }
   
  }

  const SubmitLogin=async()=>{
    try {
      const {data}= await loginUser();   
        const {token,refreshToken,user}= data.login
    props.AuthSuccess(token,refreshToken,user)
    console.log("userrrrrrrrrr is ",data.login)
    props.checkAuthTimeOut()
      const expireDate=new Date(new Date().getTime()+3600000)
      localStorage.setItem('token',token);
      localStorage.setItem('expireDate',expireDate);
      localStorage.setItem('refreshToken',refreshToken);
      localStorage.setItem('name',user.name);
      localStorage.setItem('email',user.email);
      localStorage.setItem('photo',user.photo);
      localStorage.setItem('_id',user.id);
      localStorage.setItem('act',user.act);
      localStorage.setItem('emailVerfied',user.emailVerfied);
      window.location.href="/";

    } catch (error) {
      UpdateErrorMassge(error.message)
      
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
          <input type="name" placeholder="name"
          defaultValue={Name}
          onChange={(event)=>updateName(event.target.value)}
          className={classes.form}></input>
      
        <input type="email" placeholder="email"
         defaultValue={Email}
         onChange={(event)=>updateEmail(event.target.value)}
        className={classes.form}></input>
        <input type="password" placeholder="password"
         defaultValue={password}
         onChange={(event)=>updatePassword(event.target.value)}
        className={classes.form}></input>
    
        <div className={classes.customSelect}>
      <select 
      
       onChange={(event)=>{
         console.log("onslect run event is ",event.target.value)
         updateAct(event.target.value)
        }}
      
      >
      <option  selected disabled hidden
      
      
      >account type</option>

        <option value="1">freelancer</option>
        <option value="2">employer</option>
      </select>
    </div>
    
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
            <div className={classes.logo}>HireNow</div>
            <p className={classes.intro}>
            HireNow, is a global freelancing platform and social networking where businesses and independent professionals connect and collaborate remotely
            </p>
           <img src="https://gambolthemes.net/workwise-new/images/cm-main-img.png" className={classes.img}></img>
    
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