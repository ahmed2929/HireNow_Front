import react ,{useState,useEffect,useHistory} from "react"
import classes from "./Proposals.module.css"
//import {NavLink} from "react-router-dom"

import {useQuery } from '@apollo/client';
import {GET_JOBS} from "../../services/graphal/jobs/getJob"
import {GET_PROPOSALS} from "../../services/graphal/jobs/proposals"
import Loader from "../loader/Loader";
import SingleProposal from "./SingleProposal/SingleProposal";

const  Proposals=()=> {
const [proposals,setProposals] = useState([]);
  const handleDeleteElem=(e,key)=>{
    let newArray=[...proposals];
    newArray.splice(key,1);
    console.log(newArray)
    setProposals(newArray)
  
  } 
  


  const { loading, error, data } = useQuery(GET_PROPOSALS,{onCompleted:(data)=>{
    
    console.log("on complet runs and data is ",data.getProposals.proposals)
    setProposals(data.getProposals.proposals)
  
  
  
  
  
  }
  
  
  });
  

  if (loading) return (
  <div className={classes.Loader} >
  <Loader />  
    </div>

  

  )
  if (error) return `Error! ${error.message}`
  //setProposals(data.getProposals.proposals)
  return (
    <react.Fragment>
     <div className={classes.jobs}>
       
      {
       proposals.length>0?
       proposals.map((elem,i)=>{
           console.log("elem ",elem)
            return <SingleProposal proposalData={elem} key={i} handleDeleteElem={(e,key=i)=>{handleDeleteElem(e,key)}}/>
          }):null


       }
    
     </div>
    </react.Fragment>
  );
}

export default Proposals;
