import react ,{useState,useEffect,useHistory} from "react"
import classes from "./Medications.module.css"

import axios from "axios";
import Loader from "../loader/Loader";
import SingleMedication from "./SingleMedication/SingleMedication";
import BaseUrl from "../../StaticData";

const  Medications=()=> {
  const [loading,setLoading]= useState(true);
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
              return <SingleMedication proposalData={elem} key={i}/>
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

export default Medications;
