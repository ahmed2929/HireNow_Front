import React from 'react';

import './ChatMessage.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { content, from }}) => {
  let isSentByCurrentUser = false;
const userId=  localStorage.getItem("_id")
console.log("userid and from ",userId, from)

  if(userId === from) {
    console.log("if runs")
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
         
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(content)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(content)}</p>
            </div>
          
          </div>
        )
  );
}

export default Message;