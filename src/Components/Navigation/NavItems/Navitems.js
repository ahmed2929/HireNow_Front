import react,{useState} from "react"
import classes from "./Navitems.module.css"
import NavigationItem from "./NavItem/NavItem"
import sharedClasses from "../../../asset/sharedcss.module.css"
import Profile from "../ProfileShortCut/ProfileShortCut"
import Search from "../../UI/Search/Search"
import Drower from "./Drower/Drower"
function NavItems(props) {
  const [showDrawer, setShowDrawer] = useState(false)
  const handleDrwaerClick=()=>{
    setShowDrawer(!showDrawer)

    
  }

  const closeDrawer=()=>{
    setShowDrawer(false)
  }

  return (
    <react.Fragment>
      <div className={sharedClasses.continer}>
        <div className={classes.HeaderContiner}>
        <div className={classes.search}>
        <Search />
        </div>
        
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/proposals">proposals</NavigationItem>
        <NavigationItem link="/chat">chat</NavigationItem>
        
      
    </ul>

    <div className={classes.DrawerToggle} onClick={handleDrwaerClick}>
        <div></div>
        <div></div>
        <div></div>
    </div>

    <Drower open ={showDrawer} closed={closeDrawer}/>

    <div className={classes.Profile}>
      
    <Profile />
    </div>
    
    

        </div>
     
      </div>
     
    </react.Fragment>
  );
}

export default NavItems;
