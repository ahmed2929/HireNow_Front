import { gql } from '@apollo/client';

export const GET_CHAT_ROOMS = gql`
query{
  getChatRooms{
  ChatRoomUsers{
   roomId,user{name,photo,id}latestMessage{content},
  }
  
  }
}
`;


export const GET_CHAT = 
gql`
  query getChat($RoomId: String!) {
   
    getChat(RoomId: $RoomId) {
        messages{
      content,
      _id,
     from,to,RoomId
    }
      
    }
  



  }
`;



export const SEND_MESSAGE = 
gql`
  mutation sendMessage($content: String!,$roomId: String,$to: String!) {
   
    sendMessage(roomId: $roomId,to:$to,content:$content) {
        content
      
    }
  



  }



 

`;





export const MESSAGE_RECIVED = gql`
  subscription newMessage {
    newMessage {
      RoomId,
    content,
    from,
    to
    }
  }
`;






