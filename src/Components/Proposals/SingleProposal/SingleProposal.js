import react,{useState,useEffect} from "react"
import classes from "./SingleProposal.module.css"
import {NavLink, Redirect,Link} from "react-router-dom"
import { connect } from 'react-redux';
import { useMutation,useLazyQuery, from,useQuery } from '@apollo/client';
import {CHANGE_PROPOSAL_STATUS} from "../../../services/graphal/jobs/proposals"
import {SEND_MESSAGE,GET_CHAT_ROOMS} from "../../../services/graphal/chat/Chat"
import Loader from "../../loader/Loader"
import  Modal  from "../../Modal/Modal";
import ChatBox from "../../Chat/ChatBox/ChatBox";
import Chat from "../../Chat/Chat";
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  return hours 
}
function Job(props) {
  const [showModal,setShowModal] = useState(false);
  const [ChatRoomUsers ,setChatRoomUsers]=useState([])
  const [acceptProposal, { data, loading, error }] = useMutation(CHANGE_PROPOSAL_STATUS);
  const [sendMessageMutation, { data:sendMessageData, loading:sendMessageMutationLoading, error:sendMessageMutationError }] = useMutation(SEND_MESSAGE);
  const {  data:getChatRoomsData,loading:getChatRoomsDataLoading } = useQuery(GET_CHAT_ROOMS,{onCompleted:(data)=>{
    
    console.log("on complet runs and data is ",data.getChatRooms.ChatRoomUsers)
    setChatRoomUsers(data.getChatRooms.ChatRoomUsers)
    data.getChatRooms.ChatRoomUsers.forEach(element => {
      
      if(element.user.id === props.proposalData.applicant.id){
        console.log("found user in chat room")
        setRoomId(element.roomId);
        return
      }
      
    });
   
  
  }})


  const [ModalState, setModalState] = useState(false);
  const [RoomIdState,setRoomId]=useState(null)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const closeModal=()=>{
    setModalState(!ModalState)
  }
  const openModal=()=>{
    setModalState(true)
  }

  const sendMessage =async(e,message,roomId,to)=>{

    try {
      
      e.preventDefault();
      const from = localStorage.getItem("_id")
      setMessages([...messages,{content:message,from:from}]);
     

      
      const {data}= await sendMessageMutation({ variables: { roomId: roomId, content:message,to:to},
       
      
      
      
      
      }); 
   
  
  
  
    } catch (error) {
      console.log(error);
      
    }
  
  


  }




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
const chatHandler=()=>{
setShowModal(true)
openModal()



}

if(showModal){
  return (
    <Modal 
    displayModal={ModalState}
    closeModal={closeModal}
    setShowModal={setShowModal}
  > 
  {
    !getChatRoomsDataLoading? <ChatBox data={messages} RoomId={RoomIdState} to={props.proposalData.applicant.id} sendMessage={(e,message,roomId,to)=>{sendMessage(e,message,roomId,to)}}/>:null
  }
 
  
  </Modal>
  )
}

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
        {props.proposalData.file_uri?<p className={classes.jobDiscribition}>attachedFile: <a href={props.proposalData.file_uri} download className={classes.downloadButton}> download</a> </p>:null}
   {
     props.act ==='2' ?  
     <react.Fragment>
       <button className={classes.button} onClick={(e)=>acceptPropsalHandler(e,props.key)}>accept</button>
    <button className={classes.button} onClick={rejectPropsalHandler}>reject</button>
    <button className={classes.button} onClick={chatHandler}>chat</button>
     </react.Fragment>
     
     
     : <p className={classes.jobDiscribition}>proposal status : <span className={classes.skill}>{props.proposalData.status}</span>  </p>


   }
    
          
        

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


