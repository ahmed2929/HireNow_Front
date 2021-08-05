
import React from 'react';

//import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './ChatMessage/ChatMessage';

import './ChatMessages.css';

const Messages = ({ messages }) => {
  console.log('Messages', messages);
  
  return(
  
  <div className="messages">
    {messages.length>0?
    messages.map((message, i) => <div key={i}><Message message={message} /></div>):
    <p>send quick messgae</p>
    }
  </div>
);

}

export default Messages;