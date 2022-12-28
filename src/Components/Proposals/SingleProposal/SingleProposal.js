import react,{useState,useEffect} from "react"
import classes from "./SingleProposal.module.css"
import {NavLink, Redirect,Link} from "react-router-dom"
import { connect } from 'react-redux';
import { useMutation,useLazyQuery, from,useQuery } from '@apollo/client';
import {CHANGE_PROPOSAL_STATUS} from "../../../services/graphal/jobs/proposals"
import {SEND_MESSAGE,GET_CHAT_ROOMS} from "../../../services/graphal/chat/Chat"
import Loader from "../../loader/Loader"
import  Modal  from "../../Modal/Modal";
import ChatBox from "../../Chat/ChatBox/ChatBox";
import Chat from "../../Chat/Chat";
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  return hours 
}
function Job(props) {
  const frequancyArr=[`Days of week schedule `, `As Needed  `, `Every Day` , `Days Interval`]
  const [showModal,setShowModal] = useState(false);
  const [loading,setLoading] = useState(false); 
 
   
  
  


  const [ModalState, setModalState] = useState(false);
  const closeModal=()=>{
    setModalState(!ModalState)
  }
  const openModal=()=>{
    setModalState(true)
  }

 







if (loading) return (
  <div className={classes.Loader} >
  <Loader />  
    </div>
  )

  return (
    <react.Fragment>
     <div className={classes.job}>
     <div>
     <div className={classes.profileInfo}>
           <div className={classes.content}> 
           <div className={classes.image}>
           <img src={props.proposalData.img||'https://www.shutterstock.com/image-vector/vector-medicine-illustration-medical-pill-260nw-1067945834.jpg'}  alt="med-img" className={classes.img}></img>

           </div>
            <div className={classes.name}>{`${props.proposalData.name}`}</div>
      

          
        </div>
           </div>

        <div >
          {`strenth : ${props.proposalData.strenth}`}
          <br/>
          {`condition : ${props.proposalData.condition}`}
          <br/>
          {`quantity : ${props.proposalData.quantity}`}
          <br/>
          {`frequancy : ${frequancyArr[props.proposalData.Schduler.ScheduleType]}`}
          <br/>
          {`start date : ${new Date(props.proposalData.Schduler.StartDate)}`}
          <br/>
          {`end date : ${new Date(props.proposalData.Schduler.EndDate)}`}
          <br/>
          {`dosage per day : ${props.proposalData.Schduler.dosage.length}`}
          <br/>
        </div>  
        

        <p className={classes.jobDiscribition}>
        {props.proposalData.description}
        
        
        </p>
       
      
     </div>
     </div>
    </react.Fragment>
  );
}


const mapStateToProps = state => {
  return {
     act:state.Auth.act
  };
};

export default connect( mapStateToProps )( Job )


