import react,{useState} from "react"
import classes from "./PersonSamaryCard.module.css"
import {NavLink} from "react-router-dom"
import { connect } from 'react-redux';
import axios from "axios"
import BaseUrl from "../../../StaticData"
import Modal from "../../Modal/Modal"
import Loader  from "../../loader/Loader";
function PersonCard(props) {
  const [ModalState, setModalState] = useState(false);
  const [otp,updateOtp]=useState('')
  const [ErrorMassage,UpdateErrorMassge]=useState("")
  const [loading, updateLoading] = useState(false);
  const [resmessage, Updateresmessage] = useState("");
  const [verifed, UpdateVerfied] = useState(false);
  const closeModal=()=>{
    setModalState(!ModalState)
  }
  const openModal=()=>{
    setModalState(true)
  }
  
// attach bearer token with the request axios ?


  const sendActivationCode=async()=>{
    Updateresmessage("")
    UpdateErrorMassge("")
    try {
      console.log("send activation runs")
      updateLoading(true)
      const {data} =await axios.post(`${BaseUrl}auth/resend/activation/code`,{
      
    
      },{
        headers: { Authorization: `Bearer ${props.user.token}` }
      })

      console.log("sent sucees",data.data.message)

     if(data.data.message){
      console.log("data.message ",data.data.message)
    
      Updateresmessage(data.data.message)
     }
      
      updateLoading(false)
      
    } catch (error) {
      updateLoading(false)
      console.log("erooooo ",error)
      
      UpdateErrorMassge(error.response.data.error)
    }
 


  }

  const sendOtp=async ()=>{
    console.log("send otp runs")
    Updateresmessage("")
    UpdateErrorMassge("")

    try {
      console.log("send activation runs")
      updateLoading(true)
      const {data} =await axios.post(`${BaseUrl}auth/verifyaccount`,{
        verfiycode:otp
    
      },{
        headers: { Authorization: `Bearer ${props.user.token}` }
      })

      console.log("sent sucees",data.data.message)

     if(data.data.message){
      console.log("data.message ",data.data.message)
    
      Updateresmessage(data.data.message)
      localStorage.setItem("verified",true)
     }
      
      updateLoading(false)
      
    } catch (error) {
      updateLoading(false)
      console.log("erooooo ",error.response.data.error)
      
      UpdateErrorMassge(error.response.data.error)
    }
 
    
  }


  return (
    <react.Fragment>
     <div className={classes.card}>
        <div className={classes.header}></div>
        <div className={classes.image}>
            <img src="https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png" className={classes.img}></img>
        </div>
        <div className={classes.info}>
            <h1>{`${props.user.user.firstName} ${props.user.user.lastName}`}</h1>
            <p>verified : {localStorage.getItem('verified')}</p>
        </div>
      
        

        <div className={classes.viewProfile}>
          {
            localStorage.getItem('verified')==="false"?
            <button className={classes.button} onClick={()=>setModalState({ModalState:true})}>activate account</button>
           :null
          }

          

          

        </div>
     </div>

     <Modal 
        displayModal={ModalState}
        closeModal={closeModal}
        setShowModal={setModalState}
      > 
      <button style={{width:'120px',display:'block',margin:"20px"}} onClick={()=>sendActivationCode()}>resend activation code </button>
      <p>{resmessage}</p>
      <input type="number" placeholder="otp"
          defaultValue={otp}
          onChange={(event)=>updateOtp(event.target.value)}
          style={{display:'block',marginTop:"200px"}}></input>
       <button style={{width:'120px',display:'block',margin:"20px"}} onClick={()=>{sendOtp()}}>send otp </button>
      <p>{ErrorMassage}</p>
          {

            loading ?
            <div className={classes.Loader} >
            <Loader />  
              </div>:null

            

            
          }

      </Modal>



    </react.Fragment>
  );
}

const mapStateToProps = state => {
    return {
       user: state.Auth,
     
    };
};

export default connect( mapStateToProps )( PersonCard );


