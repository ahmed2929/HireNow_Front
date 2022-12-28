import react ,{useState,useEffect,useHistory} from "react"
import classes from "./Proposals.module.css"
//import {NavLink} from "react-router-dom"
import axios from "axios";
import {useQuery } from '@apollo/client';
import {GET_JOBS} from "../../services/graphal/jobs/getJob"
import {GET_PROPOSALS} from "../../services/graphal/jobs/proposals"
import Loader from "../loader/Loader";
import SingleProposal from "./SingleProposal/SingleProposal";
import BaseUrl from "../../StaticData";

const  Proposals=()=> {
  const [loading,setLoading]= useState(false);
  const [medications,setMedications] = useState([]);
  try {

    useEffect(()=>{
      console.log("use effect runs",localStorage.getItem("token"))
      setLoading(true)
      axios.get(`${BaseUrl}general/medications`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res=>{
        console.log("res ",res)
        setMedications(res.data.data)
        setLoading(false)
      })
      .catch(err=>{
        console.log("err ",err)
        setLoading(false)
      })
    },[])
    
  
    if (loading) return (
    <div className={classes.Loader} >
    <Loader />  
      </div>
  
    )
  
    
    return (
      <react.Fragment>
       <div className={classes.jobs}>
         {
          console.log("medications ",medications.data)
         }
        {
          
         medications.data.length>0?
         medications.data.map((elem,i)=>{
             console.log("elem ",elem)
              return <SingleProposal proposalData={elem} key={i}/>
            }):(<h1>no med to display</h1>)
  
  
         }
      
       </div>
      </react.Fragment>
    );
 
    
  } catch (error) {
    console.log("error ",error)
    
    if (error) return `Error! ${error.message}`

  }

  




 
}

export default Proposals;
