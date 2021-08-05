import react ,{useEffect,useState}from "react"
import HomePage from "./containers/HomePage/HomePage"
import { Route, Switch ,Redirect,withRouter} from 'react-router-dom';
import Auth from "./containers/AuthPage/AuthPage"
import { connect } from 'react-redux';
import * as actions from "./store/actions/index"
import ApplayJob from "./containers/applayJob/applayJob";
import Proposals from "./containers/proposals/Proposals";
import Chat from "./containers/Chat/Chat";
function App(props) {
  const [autologinDone, setAutoLoginDone] = useState(false)
  useEffect(()=>{
    props.AutoLogin()
    setAutoLoginDone(true);
  },[props])
let routes=''
if(autologinDone){



   routes=(
    <react.Fragment>
        <Route path="/auth" component={Auth} />
       <Redirect to={"/auth"}/>
    </react.Fragment>
  
  );
  if (props.isAuthinticated){
    routes=(
      <react.Fragment>
        <Switch>
        <Route path="/applay" component={ApplayJob}  exact />
        <Route path="/proposals" component={Proposals}  exact />
        <Route path="/chat" component={Chat}  exact />
        <Route path="/" component={HomePage}  exact />
        <Redirect to="/"/>
      
        </Switch>
        
      </react.Fragment>
    
      )
    
  }
}

  return (
    
      <react.Fragment>
          {routes}
      </react.Fragment>
     
         
      
   
  );
}

const mapStateToProps = state => {
  return {
     isAuthinticated:state.Auth.token!=null
  };
};

const mapDispatchToProps = dispatch => {
  return {
     
      AutoLogin: ( ) => dispatch( actions.autoLogin( ) ) ,
     
      
  };
};


export default withRouter(connect( mapStateToProps,mapDispatchToProps )( App ));


