import react from "react"
import classes from "./SingUp.module.css"
import "./SingUp.module.css"
import {NavLink} from "react-router-dom"
function SingUp() {

  var login=(
    <react.Fragment>
<input type="email" placeholder="email" className={classes.form}></input>
    <input type="password" placeholder="password" className={classes.form}></input> 
    <div>
    <button className={classes.submitLogin}>login</button>
      </div> 
    </react.Fragment>
    
  )
  var singup=(
    <react.Fragment>
      <input type="name" placeholder="name" className={classes.form}></input>
  
    <input type="email" placeholder="email" className={classes.form}></input>
    <input type="password" placeholder="password" className={classes.form}></input>

    <div className={classes.customSelect}>
  <select >
  <option value="" selected disabled hidden>account type</option>
    <option value="1">freelancer</option>
    <option value="2">employer</option>
  </select>
</div>

    <div>
    <button className={classes.submitLogin}>singup</button>
      </div> 
    </react.Fragment>
  )
  return (
    <react.Fragment>
     <div className={classes.card}>
        <div className={classes.rightCard} >
        <button className={classes.SingupButton}>singup</button>
        <button className={classes.loginButton +' '+classes.activeButton}>login</button>
          <div className={classes.SingInWord}> singIn</div>
         {singup}
          
        </div>
        <div className={classes.leftCard}>
        <div className={classes.logo}>HireNow</div>
        <p className={classes.intro}>
        Workwise, is a global freelancing platform and social networking where businesses and independent professionals connect and collaborate remotely
        </p>
       <img src="https://gambolthemes.net/workwise-new/images/cm-main-img.png" className={classes.img}></img>

        </div>
     </div>
    </react.Fragment>
  );
}

export default SingUp;
