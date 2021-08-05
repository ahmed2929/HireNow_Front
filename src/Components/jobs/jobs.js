import react ,{useState,useEffect,useHistory} from "react"
import classes from "./jobs.module.css"
//import {NavLink} from "react-router-dom"
import Job from "./singleJob/singleJob"
import {useQuery } from '@apollo/client';
import {GET_JOBS} from "../../services/graphal/jobs/getJob"
import Loader from "../loader/Loader";

const  Jobs=()=> {
  const { loading, error, data } = useQuery(GET_JOBS);
  

  if (loading) return (
  <div className={classes.Loader} >
  <Loader />  
    </div>

  

  )
  if (error) return `Error! ${error.message}`
  return (
    <react.Fragment>
     <div className={classes.jobs}>
       
      {
       
          data.getJobs.jobs.map(elem=>{
           console.log("elem ",elem)
            return <Job jobData={elem}/>
          })


       }
    
     </div>
    </react.Fragment>
  );
}

export default Jobs;
