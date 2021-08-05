import react from "react"
import classes from "./HomePage.module.css"
import continer from "../../asset/sharedcss.module.css"
import NavBar from "../../Components/Navigation/ToolBar/ToolBar"
import ProfileCard from "../../Components/Person/PersonSamaryCard/PersonSamaryCard"
import CreatePost from "../../Components/Posts/CreatePost/CreatePost"
import Jobs from "../../Components/jobs/jobs"
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
const HomePage=(props)=>{
    let createpost=null;
    console.log(props.userInfo)
    if(props.userInfo.act==='2'){
        createpost=(
            <div className={classes.CreatePost}>
            <CreatePost />
            </div>
        )
    }
     

    //nav
    return (
        <react.Fragment>
            <NavBar />
            
            <div className={continer.continer+' '+classes.body}>
                <div className={classes.ProfileCard}>
                <ProfileCard />
                </div>
                
                    {
                        createpost
                    }
               
                <div className={classes.Jobs}>
                <Jobs />
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
  
 
  
  
export default withRouter(connect( mapStateToProps )( HomePage ));

