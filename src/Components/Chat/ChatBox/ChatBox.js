import React,{useState,useEffect} from 'react';
import  "./ChatBox.css"
import Messages from "./ChatMessages/ChatMessages"
import InputField from "./InputField/InputField"
const ChatBox = props => {
  console.log("props.data from chatBox ",props.RoomId)
  console.log("messages from chatBox ",props.data)
//let name ="ahmed";
//let messages=[{text:'hi how are u sad ',user:"ahmed"},{text:'fi sdf  dsjnf s',user:"fine"},{text:'fine',user:"fine"},{text:'fine',user:"fine"},{text:'fine',user:"fine"},{text:'fine',user:"fine"}]

  return (
    <React.Fragment >
      <div className="container">
          <Messages messages={props.data}  />
          <InputField roomId={props.RoomId} sendMessage={props.sendMessage} to={props.to} />
      </div>
    
    </React.Fragment>
  );
}
export default ChatBox;