import react from "react"
import classes from "./ProfileShortCut.module.css"
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from "../../../store/actions/index"

function Profile(props) {
  return (
    <react.Fragment>
        {/* <div className={classes.profileInfo}>
           <div className={classes.content}> 
           <div className={classes.img}>
           <img src="https://gambolthemes.net/workwise-new/images/resources/user.png"  alt="user-img" ></img>

           </div>
            <div className={classes.name}>ahmed</div>
        </div>
           </div> */}
    <div className={classes.dropdown}>
  <button className={classes.dropbtn}>Dropdown</button>
  <div className={classes.dropdownContent}>
    <a href="#">view profile</a>
    <a href="#">settings</a>
    <a href="/auth" onClick={(event)=>{props.Logout()}}>logout</a>
  </div>
</div>

         
    </react.Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
     
      Logout: ( ) => dispatch( actions.logout( ) ) ,
     
      
  };
};

export default withRouter(connect( null,mapDispatchToProps )( Profile ));


