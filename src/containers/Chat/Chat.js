import react from "react"
import classes from "./Chat.module.css"
import continer from "../../asset/sharedcss.module.css"
import NavBar from "../../Components/Navigation/ToolBar/ToolBar"

import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import ChatComponent from "../../Components/Chat/Chat"
const Chat=(props)=>{
  
     

    //nav
    return (
        <react.Fragment>
            <NavBar />
            
            <div className={continer.continer+' '+classes.body}>
           <ChatComponent />
               
              
            </div>
        </react.Fragment>
        
    )
}

const mapStateToProps = state => {
    return {
       userInfo:state.Auth
    };
  };
  
 
  
  
export default withRouter(connect( mapStateToProps )( Chat ));

