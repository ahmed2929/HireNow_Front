import react from "react"
import classes from "./Navitems.module.css"
import NavigationItem from "./NavItem/NavItem"
import sharedClasses from "../../../asset/sharedcss.module.css"
import Profile from "../ProfileShortCut/ProfileShortCut"
import Search from "../../UI/Search/Search"
function NavItems() {
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
        <NavigationItem link="/messages">messages</NavigationItem>
        <NavigationItem link="/notifications">notifications</NavigationItem>
      
    </ul>
    <div className={classes.Profile}>
      
    <Profile />
    </div>
    

        </div>
     
      </div>
     
    </react.Fragment>
  );
}

export default NavItems;
