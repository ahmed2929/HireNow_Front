import react from "react"
import classes from "./Medications.module.css"
import continer from "../../asset/sharedcss.module.css"
import NavBar from "../../Components/Navigation/ToolBar/ToolBar"
import { withRouter} from 'react-router-dom';
import Medications from "../../Components/Medications/Medications";
import { connect } from 'react-redux';
const meds=(props)=>{
   
 

    //nav
    return (
        <react.Fragment>
            <NavBar />
            
            <div className={continer.continer+' '+classes.body}>
                <div className={classes.Jobs}>
                <Medications />
                </div>
                
              
            </div>
        </react.Fragment>
        
    )
}

const mapStateToProps = state => {
    return {
       userInfo:state.Auth
    };
  };
  
 
  
  
export default withRouter(connect( mapStateToProps )( meds ));

