import react,{useState,useEffect} from "react"
import classes from "./SingleMedication.module.css"
import { connect } from 'react-redux';


function Medication(props) {
  const frequancyArr=[`Days of week schedule `, `As Needed  `, `Every Day` , `Days Interval`]
 

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

export default connect( mapStateToProps )( Medication )


