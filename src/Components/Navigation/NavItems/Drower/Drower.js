import React from 'react';

import classes from './Drower.module.css';
import Backdrop from '../../../Backdrop/Backdrop';
import NavigationItem from "../../NavItems/NavItem/NavItem"

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                
            <div className={classes.Logo}>
                   <h1>hireNow</h1>
                </div>
                <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/proposals">proposals</NavigationItem>
        <NavigationItem link="/chat">chat</NavigationItem>
        
      
    </ul>
                
            </div>
        </React.Fragment>
    );
};

export default sideDrawer