import React,{useState} from 'react';

import classes from "./InputField.module.css"

const Input = ({sendMessage,roomId,to }) => {
  const [message, setMessage] = useState('')
  return(
  <form className={classes.form}>
    <input
      className={classes.inputField}
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? ()=>{
        setMessage('')  
        sendMessage(event,message,roomId,to)} : null
      }
    />
    <button className={classes.sendButton}onClick={e => {
      setMessage('')
      sendMessage(e,message,roomId,to)}
      }>Send</button>
  </form>
)
}

export default Input;