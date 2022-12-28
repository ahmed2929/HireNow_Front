import react,{useEffect, useState} from "react"
import continer from "../../asset/sharedcss.module.css"
import NavBar from "../../Components/Navigation/ToolBar/ToolBar"
import classes from "./applayJob.module.css"
import { withRouter,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from "../../Components/loader/Loader";
import axios from 'axios';
import Calendar from 'react-calendar';
import BaseUrl from "../../StaticData";
import "./applayJob.module.css"
const HomePage=(props)=>{
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);
    const [date, setDate] = useState(new Date());
    const [doses,setDoses] =useState([])

    const onChange = (selectedDate) => {
      setDate(selectedDate);
    }
   
    useEffect(()=>{
      setLoading(true)
      axios.get(`${BaseUrl}general/doses?date=${date.getTime()}`,{
        headers:{
          "Authorization":`Bearer ${props.userInfo.token}`
        }
      })
      .then(res=>{
        setLoading(false)
        console.log(res.data.data.data)
        setDoses(res.data.data.data)
      })
      .catch(err=>{
        setLoading(false)
        setError(err)
      })



    },[date])


    if (loading) return (
      <div className={classes.Loader} >
      <Loader />  
        </div>
    
      
    
      )
 
    if (error) return `Error! ${error}`;
  
    
  
     return (
        <react.Fragment>
            <NavBar />
          
            <Calendar onChange={onChange}   value={date}  className={classes.calendar}/>
           <p style={{margin:"15px"}}>{`curent date is ${date}`}</p>
          <p>{error}</p>
          <div className={classes.doses}>
            {doses.length>0 ? doses.map(dose=>

<div className={classes.medication}>
<div className={classes.medication_header}>
  <img src={dose.MedInfo.img||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtj43GM1cgJmdGTKQyJASVq-9KlbYot3L_ZEiXjvbvh0zJ_2YwEQPXZc&s=10'} alt="medication" />
  <div className={classes.medication_info}>
    <div className={classes.medication_name}>{dose.MedInfo.name}</div>
    <div className={classes.medication_strength}>{dose.MedInfo.strenth} {dose.MedInfo.unit}</div>
  </div>
</div>
<div className={classes.medication_body}>
  <div className={classes.medication_planned_time}>Planned time: {
  `${new Date( dose.PlannedDateTime).toLocaleTimeString()}`
 
  
  }</div>
  <div className={classes.medication_planned_dose}>Planned dose: {dose.PlannedDose}</div>
  <div className={classes.medication_status}>Status: {dose.Status}</div>
  <div className={classes.medication_condition}>Condition: {dose.MedInfo.condition}</div>
        <div className={classes.medication_instructions}>Instructions: {dose.MedInfo.instructions}</div>
      </div>
    </div>


        ):<h1>No doses</h1>}
            
          </div>
            
        </react.Fragment>
     )
   
   
}

const mapStateToProps = state => {
    return {
       userInfo:state.Auth
    };
  };
  
 
  
  
export default withRouter(connect( mapStateToProps )( HomePage ));

