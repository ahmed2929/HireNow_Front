import react from "react"
import classes from "./Proposals.module.css"
import continer from "../../asset/sharedcss.module.css"
import NavBar from "../../Components/Navigation/ToolBar/ToolBar"
import ProfileCard from "../../Components/Person/PersonSamaryCard/PersonSamaryCard"
import CreatePost from "../../Components/Posts/CreatePost/CreatePost"
import Jobs from "../../Components/jobs/jobs"
import { withRouter} from 'react-router-dom';
import ProposalsComponent from "../../Components/Proposals/Proposals";
import { connect } from 'react-redux';
const Proposals=(props)=>{
   
 

    //nav
    return (
        <react.Fragment>
            <NavBar />
            
            <div className={continer.continer+' '+classes.body}>
                <div className={classes.ProfileCard}>
                <ProfileCard />
                </div>
                
                  
               
                <div className={classes.Jobs}>
                <ProposalsComponent />
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
  
 
  
  
export default withRouter(connect( mapStateToProps )( Proposals ));

