import react,{useState,useEffect} from "react"
import classes from "./singleJobs.module.css"
import {NavLink, Redirect,Link} from "react-router-dom"
import { connect } from 'react-redux';
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  return hours 
}
function Job(props) {
  
  return (
    <react.Fragment>
     <div className={classes.job}>
     <div>
     <div className={classes.profileInfo}>
           <div className={classes.content}> 
           <div className={classes.image}>
           <img src={props.jobData.creator.photo}  alt="user-img" className={classes.img}></img>

           </div>
            <div className={classes.name}>{props.jobData.creator.name}</div>
           
            <img src=" https://gambolthemes.net/workwise-new/images/clock.png" className={classes.longAgoIcon}></img>
            <span className={classes.longAgo}>{msToTime(props.jobData.createdAt)} hours ago</span>

            <img src="  https://gambolthemes.net/workwise-new/images/icon9.png" className={classes.countryIcon}></img>
            <span className={classes.country}>{props.jobData.country}</span>
            
            <h3 className={classes.jobTitle}>{props.jobData.title}</h3>
           <div className={classes.jobType}>{props.jobData.jobType}</div>
           <span className={classes.MoneyPerHour}>${props.jobData.salary}</span>

        </div>
           </div>
          
           {
              <Link to={`/applay?id=${props.jobData.id}`}>
                {
                  (props.act=== '1') ? <button className={classes.applayNow} >Applay Now</button >:null 
                }
               
            </Link>
            
           }
          

        <p className={classes.jobDiscribition}>
        {
          props.jobData.Descrition
        }
        
        <div className={classes.viewMore}>
        <NavLink 
            to={`viewMore/${ props.jobData.id}`}
            exact={true}
            >
            View More
            </NavLink>

        </div>
        
        </p>
       
        <div className={classes.skils}>
        {
          props.jobData.technologies.map(elem=>{
          
            return(<div className={classes.skill}>
            {elem}
          </div>)
          })
        }

          
        

        </div>
     </div>
     </div>
    </react.Fragment>
  );
}


const mapStateToProps = state => {
  return {
     act:state.Auth.act
  };
};

export default connect( mapStateToProps )( Job )


