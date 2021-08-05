import react from "react"
import classes from "./PersonSamaryCard.module.css"
import {NavLink} from "react-router-dom"
import { connect } from 'react-redux';
function PersonCard(props) {
  return (
    <react.Fragment>
     <div className={classes.card}>
        <div className={classes.header}></div>
        <div className={classes.image}>
            <img src={props.user.photo} className={classes.img}></img>
        </div>
        <div className={classes.info}>
            <h1>{props.user.name}</h1>
            <p>sowftware dev</p>
        </div>
        <div className={classes.Follow}>
            <h1>Following</h1>
            <h2>15</h2>
        </div>
        <div className={classes.Follow}>
            <h1>Follower</h1>
            <h2>150</h2>
        </div>
        <div className={classes.viewProfile}>
        <NavLink 
            to="profile/123"
            exact={true}
            >
            View Profile
            </NavLink>

        </div>
     </div>
    </react.Fragment>
  );
}

const mapStateToProps = state => {
    return {
       user: state.Auth,
     
    };
};

export default connect( mapStateToProps )( PersonCard );


