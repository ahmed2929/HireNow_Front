import React,{useState,useEffect} from 'react';
import classes from "./CreateJob.module.css"
import { useMutation,useLazyQuery, from } from '@apollo/client';
import {jobSchema} from "../../services/graphal/jobs/jobDataSchema"
const CreateJob = props => {
  const [Tech,updateTech]=useState([]);
  const [TechInput,updateTechInput]=useState('')
  const [title,updateTitle]=useState('')
  const [country,updateCountry]=useState('')
  const [hourRate,updateHourRate]=useState()
  const [jobType,updateJobType]=useState()
  const [Descriptipn,updateDescriptipn]=useState('')
  const [ErrorMassage,UpdateErrorMassge]=useState("")

  const [CreateJobSubmmit, CreateJobSubmmitLoding] = useMutation(jobSchema,{
    update(proxy,result){
        console.log(result)
    },
    variables:{
      title:title,
      jobType:jobType,
      country:country,
      salary:Number(hourRate),
      technologies:Tech,
      Descrition:Descriptipn
    }
});


const SubmitJob=async()=>{
  try {
    const {data}= await CreateJobSubmmit(); 
    console.log("job data ",data)  
    
    props.closeModal()
    window.location.reload();



  } catch (error) {
    UpdateErrorMassge(error.message)
    
  }
 
}


const handleuUdateTech=()=>{
  if(TechInput.length!=0&&Tech[Tech.length-1]!=TechInput){
    updateTech([...Tech, TechInput])
    console.log("tech is ",Tech)

  }
  
}
const handleDeleteTech=(e,key)=>{
  let newArray=[...Tech];
  newArray.splice(key,1);
  console.log(newArray)
  updateTech(newArray)

} 



  return (
    <React.Fragment >
      <from>
      <div className={classes.parent}>
      <p className={classes.label}>title :</p>
      <input type="text" className={classes.input} placeholder="title" defaultValue={title} onChange={(e)=>{updateTitle(e.target.value)}}></input>
      </div>  
      <div className={classes.parent}>
      <p className={classes.label}>country :</p>
      <input type="text" className={classes.input} placeholder="country" defaultValue={country} onChange={(e)=>{updateCountry(e.target.value)}}></input>
      </div> 
      <div className={classes.parent}>
      <p className={classes.label}>hour rate :</p>
      <input type="number" className={classes.input} placeholder="hour rate" defaultValue={hourRate} onChange={(e)=>{updateHourRate(e.target.value)}}></input>
      </div> 

      <div className={classes.parent}>
      <p className={classes.label}>job type</p>
      <select className={classes.input} defaultValue={jobType} onChange={(e)=>{updateJobType(e.target.value)}}>
  <option value="" selected disabled hidden >jobType</option>
    <option value="partTime">part time</option>
    <option value="fullTime">full time</option>
  </select>
      </div> 

      <div className={classes.parent}>
      <p className={classes.label}>job description :</p>
      <textarea  className={classes.input} placeholder="job description" defaultValue={Descriptipn} onChange={(e)=>{updateDescriptipn(e.target.value)}}></textarea>
      </div>   
      <div className={classes.parent}>
      <p className={classes.label}>add technology</p>
      <input type="text" className={classes.input} placeholder="react.." onChange={(e)=>{updateTechInput(e.target.value)}}></input>
      <button className={classes.addButton} onClick={handleuUdateTech}>add</button>
      </div> 
    
      
      <p className={classes.label}>technology added :</p>
      <div className={classes.skils}>

      {
       
        Tech.length<1?<p className={classes.noItem} >no item to dispay</p>:
        Tech.map((element,i) => {
          return(
          <div className={classes.skill} key={i} onClick={(e,key=i)=>{handleDeleteTech(e,key)}}>
            {element}
            
          </div>)
        })
      }
          

        </div>
      
      <button className={classes.CreateJob} onClick={SubmitJob} >create job</button>
      <p>{ErrorMassage}</p>
  
      </from>
    </React.Fragment>
  );
}
export default CreateJob;