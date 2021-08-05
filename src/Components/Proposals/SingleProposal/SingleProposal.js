import react,{useState,useEffect} from "react"
import classes from "./SingleProposal.module.css"
import {NavLink, Redirect,Link} from "react-router-dom"
import { connect } from 'react-redux';
import { useMutation,useLazyQuery, from } from '@apollo/client';
import {CHANGE_PROPOSAL_STATUS} from "../../../services/graphal/jobs/proposals"
import Loader from "../../loader/Loader"
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  return hours 
}
function Job(props) {
  
  const [acceptProposal, { data, loading, error }] = useMutation(CHANGE_PROPOSAL_STATUS);

const acceptPropsalHandler=async(e,key)=>{

  try {
    
    const {data}= await acceptProposal({ variables: { id: props.proposalData.id, status:'approved'} }); 
   console.log("proposla data response form server ",data)  
   
    props.handleDeleteElem(e,key)



  } catch (error) {
    console.log(error);
    
  }




}
const rejectPropsalHandler=async(e,key)=>{

  try {
    console.log("handler runs")
   
    const {data}= await acceptProposal({ variables: { id: props.proposalData.id, status:'rejected'} }); 
   console.log("proposla data response form server ",data)  
   
    props.handleDeleteElem(e,key)



  } catch (error) {
    console.log(error);
    
  }


}
const chatHandler=()=>{}


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
           <img src={props.proposalData.applicant.photo}  alt="user-img" className={classes.img}></img>

           </div>
            <div className={classes.name}>{props.proposalData.applicant.name}</div>
           
          

            
            <h3 className={classes.jobTitle}>{props.proposalData.job_id.title}</h3>
           <div className={classes.jobType}>{props.proposalData.job_id.jobType}</div>
           <span className={classes.MoneyPerHour}>${props.proposalData.job_id.salary}</span>

        </div>
           </div>
          
          

        <p className={classes.jobDiscribition}>
        {props.proposalData.job_id.Descrition}
        
        
        </p>
       
        <div className={classes.skils}>
        {
          props.proposalData.job_id.technologies.map(elem=>{
          
            return(<div className={classes.skill}>
            {elem}
          </div>)
          })
        }
        {props.proposalData.file_uri?<p>attachedFile: <a href={props.proposalData.file_uri} download> download</a> </p>:null}
    
    <button className={classes.button} onClick={(e)=>acceptPropsalHandler(e,props.key)}>accept</button>
    <button className={classes.button} onClick={rejectPropsalHandler}>reject</button>
    <button className={classes.button} onClick={chatHandler}>chat</button>
          
        

        </div>
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


