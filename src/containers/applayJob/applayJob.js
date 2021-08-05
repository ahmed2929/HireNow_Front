import react,{useState} from "react"
import classes from "./applayJob.module.css"
import continer from "../../asset/sharedcss.module.css"
import NavBar from "../../Components/Navigation/ToolBar/ToolBar"
import queryString from 'query-string';
import Jobs from "../../Components/jobs/jobs"
import { withRouter,Redirect} from 'react-router-dom';
import {useQuery } from '@apollo/client';
import { connect } from 'react-redux';
import {GET_JOB} from "../../services/graphal/jobs/getJob.js"
import Loader from "../../Components/loader/Loader";
import axios from 'axios';
import { useMutation,useLazyQuery } from '@apollo/client';
import {applayJob} from "../../services/graphal/jobs/jobDataSchema" 

const HomePage=(props)=>{
    const { id } = queryString.parse(props.location.search);
    const [selectedFile, setSelectedFile] = useState(null);
    const [Comment, setComment] = useState(null);
    const [file_uri, setFile_uri] = useState(null);

    const [applayJobMutation,applayLoading] = useMutation(applayJob,{
      variables:{
        job_id:id,
        file_uri:file_uri,
        Comment:Comment
      }
  })
 

  const handleApplayJob=async ()=>{
    if(selectedFile){
      const formData = new FormData();
      formData.append(
        "file",
        selectedFile,
        selectedFile.name
      );
      const {data}=await  axios.post("http://localhost:3006/upload", formData);
      setFile_uri(data.url);
    }
   
    const {data}= await applayJobMutation()
    console.debug("graph data",data)
    window.location.href = "http://localhost:3000";
  
  }
    const { loading, error, data } = useQuery(GET_JOB, {
      variables: { id },
    });
  
    if (loading) return (
      <div className={classes.Loader} >
      <Loader />  
        </div>
    
      
    
      )
      if(applayLoading.loading){
        <div className={classes.Loader} >
        <Loader />  
          </div>
      }
    
    if (error) return `Error! ${error}`;
  
  
      console.log(data.getJob);

  
     
    //nav
    return (
        <react.Fragment>
            <NavBar />
            
            <div className={continer.continer+' '+classes.body}>
                
            <from>
      <div className={classes.parent}>
      <p className={classes.label}>title :</p>
      <p>{data.getJob.title}</p>
      </div>  
      <div className={classes.parent}>
      <p className={classes.label}>country :</p>
      <p>{data.getJob.country}</p>
      </div> 
      <div className={classes.parent}>
      <p className={classes.label}>hour rate :</p>
      <p>{data.getJob.salary}</p>
      </div> 

      <div className={classes.parent}>
      <p className={classes.label}>job type</p>
      <p>{data.getJob.jobType}</p>
      </div> 

      <div className={classes.parent}>
      <p className={classes.label}>job description :</p>
      <p>{data.getJob.Descrition}</p>
      </div>   
    
      
      <p className={classes.label}>technology added :</p>
      <div className={classes.skils}>

      {
       
       data.getJob.technologies.length<1?<p className={classes.noItem} >no item to be dispay</p>:
       data.getJob.technologies.map((element,i) => {
          return(
          <div className={classes.skill} key={i}>
            {element}
            
          </div>)
        })
      }
          

        </div>
      {data.getJob.canApplay?<div className={classes.parent}>
      <p className={classes.label}>attach File :</p>
      <input  type="file" className={classes.attach} onChange={(e)=>setSelectedFile(e.target.files[0] )}></input>
      </div> :null  }
        
      {
        data.getJob.canApplay?<div className={classes.parent}>
        <p className={classes.label}>job proposal :</p>
        <textarea  className={classes.input} placeholder="your proposal" onChange={(e)=>setComment(e.target.value)} ></textarea>
        </div> :null  
      }
        
      
      
      {
        data.getJob.canApplay ? <button className={classes.CreateJob} onClick={handleApplayJob} >applay now</button> : <p style={{color:"red",position:"relative",left:"50%"}}>you aready applayed</p> 
         
      }
      
     
  
      </from>
              
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

