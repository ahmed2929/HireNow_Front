import React,{useState,useEffect} from 'react';
import classes from "./ChatUser.module.css"

const ChatUser = props => {
  


  return (
    <React.Fragment >
        <div className={classes.profileInfo} onClick={()=>props.handleChatBox(props.handleChatBox(props.user.roomId,props.user.user.id))}>
           <div className={classes.content}> 
           <div className={classes.image}>
           <img  src={props.user.user.photo} alt="user-img" className={classes.img}></img>

           </div>
           <div className={classes.chatDetails}>
           <div className={classes.name}>{props.user.user.name}</div>
            <div className={classes.latestMessage}>{props.user.latestMessage.content}</div>
           
           </div>
        
          

        </div>
           </div>
    
    </React.Fragment>
  );
}
export default ChatUser;