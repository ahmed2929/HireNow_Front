import react,{useEffect, useState} from "react"
import NavBar from "../../Components/Navigation/ToolBar/ToolBar"
import classes from "./doses.module.css"
import { withRouter,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from "../../Components/loader/Loader";
import axios from 'axios';
import Calendar from 'react-calendar';
import BaseUrl from "../../StaticData";
import "./doses.module.css"
import { Button } from "bootstrap";
const Doses=(props)=>{
  const arrOfStatus=['in the future','in transit','taken','missed','rejected']
  const currentDate=new Date
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);
    const [date, setDate] = useState(new Date());
    const [doses,setDoses] =useState([])
    const [ErrorMassage,setErrorMassage]=useState("")
    const [statusRes,setStatusRes]=useState(null)



    const handleStatusConfirm=async(OccuranceId)=>{
      try {
        const result= await axios.put(`${BaseUrl}general/change/dose/status`,{
          OccuranceId:OccuranceId,
          Status:2
        },{
          headers:{
            "Authorization":`Bearer ${props.userInfo.token}`
          }
        })

        if(result.status===200){
          alert("status changed")
          setStatusRes(2)
        }else{
          alert("something went wrong")
        }

        
      } catch (error) {
        console.log(error)
        setErrorMassage(`${error}`)
        
        
      }
  

    }
    const handleStatusReject=async(OccuranceId)=>{

      try {
        const result= await axios.put(`${BaseUrl}general/change/dose/status`,{
          OccuranceId:OccuranceId,
          Status:4
        },{
          headers:{
            "Authorization":`Bearer ${props.userInfo.token}`
          }
        })

        if(result.status===200){
          alert("status changed")
          setStatusRes(4)
        }else{
          alert("something went wrong")
        }

        
      } catch (error) {
        console.log(error)
        setErrorMassage(`${error}`)
        
        
      }


    }



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
           <p style={{margin:"15px"}}>{`current date is ${date.toLocaleDateString()}`}</p>
          <p>{error}</p>
          <div className={classes.doses}>
            {doses.length>0 ? doses.map(dose=>

<div className={classes.medication} key={dose._id}>
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
  <div className={classes.medication_status}>Status: {
  statusRes?
  arrOfStatus[statusRes] 
  :arrOfStatus[dose.Status]

}</div>
  <div className={classes.medication_condition}>Condition: {dose.MedInfo.condition}</div>
        <div className={classes.medication_instructions}>Instructions: {dose.MedInfo.instructions}</div>
      </div>
     
        <div style={{display:"flex", gap: "10px",marginLeft:"10px"}}>

        <button style={{maring:"15px",width:"100px"}} onClick={()=>handleStatusConfirm(dose._id)}>confirm</button>
        <button style={{maringTop:"15px",width:"100px"}} onClick={()=>handleStatusReject(dose._id)}>reject</button>
      </div>

      
      <p>{ErrorMassage}</p>

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
  
 
  
  
export default withRouter(connect( mapStateToProps )( Doses ));

