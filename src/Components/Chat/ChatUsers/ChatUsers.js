import React,{useState,useEffect} from 'react';
import ChatUser from './ChatUser/ChatUser';
import classes from "./ChatUsers.module.css"

const ChatUsers = props => {
  


  return (
    <React.Fragment >
     <div className={classes.ChatUsers}>
      <div className={classes.ChatUser}>
      {
        props.ChatRoomUsers.length>0?
        props.ChatRoomUsers.map((userData,i)=>{
          return <ChatUser key={i} user={userData} handleChatBox={props.handleChatBox}/>
        }):<p>there is no users</p>

      }

       
      </div>
     </div>
    
    </React.Fragment>
  );
}
export default ChatUsers;