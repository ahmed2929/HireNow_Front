import React,{useState,useEffect} from 'react';
import classes from "./Chat.module.css"
import ChatUsers from './ChatUsers/ChatUsers';
import ChatBox from './ChatBox/ChatBox';
import {GET_CHAT_ROOMS,GET_CHAT,SEND_MESSAGE,MESSAGE_RECIVED} from "../../services/graphal/chat/Chat"
import Loader from "../loader/Loader";
import {useQuery ,useLazyQuery,useMutation,useSubscription} from '@apollo/client';
const Chat = props => {
  
  const [ChatRoomUsers ,setChatRoomUsers]=useState([])
  const [displayChatBox,setdisplayChatBox]=useState(false)
  const [RoomIdState,setRoomId]=useState(null)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ToUser,setToUser]=useState(null)
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS,{onCompleted:(data)=>{
    
    console.log("on complet runs and data is ",data.getChatRooms.ChatRoomUsers)
    setChatRoomUsers(data.getChatRooms.ChatRoomUsers)
   
  
  }})


  const [getChatBoxMessages, { loading:loadingChatBox, data:chatBoxData }]= useLazyQuery(GET_CHAT)
  const [sendMessageMutation, { data:sendMessageData, loading:sendMessageMutationLoading, error:sendMessageMutationError }] = useMutation(SEND_MESSAGE);
  const { data:newMessageSubscriptionData, error:subscriptionError} = useSubscription(MESSAGE_RECIVED);

  useEffect(()=>{
    if(subscriptionError){
      console.log("subscription error",subscriptionError)
    }

    if(newMessageSubscriptionData){
      console.log("newMessageSubscriptionData",newMessageSubscriptionData.newMessage)
      let index = ChatRoomUsers.findIndex(user => user.user.id === newMessageSubscriptionData.newMessage.from);
      if(index > -1){

        let newArr = [...ChatRoomUsers]; // copying the old datas array
        newArr[index] = {
          ...newArr[index],
          latestMessage:{
            ...newArr[index].latestMessage,
            content:newMessageSubscriptionData.newMessage.content,
          } 
        };

        setChatRoomUsers(newArr);
      }


      setMessages([...messages,newMessageSubscriptionData.newMessage]);

    }

  },[newMessageSubscriptionData,subscriptionError])


  useEffect(()=>{
    if(chatBoxData){
      setMessages(chatBoxData.getChat.messages)
    }
    

  } ,[chatBoxData])

  const sendMessage =async(e,message,roomId,to)=>{

    try {
      
      e.preventDefault();
      const from = localStorage.getItem("_id")
      setMessages([...messages,{content:message,from:from}]);
      let index = ChatRoomUsers.findIndex(user => user.user.id === to);
      if(index > -1){

        let newArr = [...ChatRoomUsers]; // copying the old datas array
        newArr[index] = {
          ...newArr[index],
          latestMessage:{
            ...newArr[index].latestMessage,
            content:message,
          } 
        };

        setChatRoomUsers(newArr);
      }

      
      const {data}= await sendMessageMutation({ variables: { roomId: roomId, content:message,to:to},
       
      
      
      
      
      }); 
   
  
  
  
    } catch (error) {
      console.log(error);
      
    }
  
  


  }


  


  const handleChatBox=async (RoomId,to)=>{
    console.log("handler room id ",RoomId)
    if(RoomId){


      const res= await getChatBoxMessages({ variables: { RoomId:RoomId },onCompleted:(data)=>{
        console.log(data)
      } })
       setdisplayChatBox(true)
       setRoomId(RoomId)
       setToUser(to)
  

    }
   


    
  }


  if(loading){
    
    return (
    <div className={classes.Loader} >
    <Loader />  
      </div>
  
    
  
    )
 
  
    }

    let ChatBoxDiplay=null;
    if(loadingChatBox){
      ChatBoxDiplay=( <div className={classes.Loader} >
    <Loader />  
      </div>
      )
    
    }else if(displayChatBox&&!loadingChatBox){
     
      ChatBoxDiplay=(
        <ChatBox data={messages} RoomId={RoomIdState} to={ToUser} sendMessage={(e,message,roomId,to)=>{sendMessage(e,message,roomId,to)}}/>

          )
        

    }else{
      ChatBoxDiplay=<p style={{padding:'0px 10px',color: 'gray',margin: "28%"} }>no chat to be displayed</p>
    }


  return (
    <React.Fragment >
      <div className={classes.parentGrid}>
      <div className={classes.chatUsers}>
        <ChatUsers ChatRoomUsers={ChatRoomUsers} handleChatBox={(roomId,to)=>{handleChatBox(roomId,to)}}/>
     </div>

     <div className={classes.chatBox}>

        {
         ChatBoxDiplay
        }

     </div>      
          
        </div>  
    
    </React.Fragment>
  );
}
export default Chat;