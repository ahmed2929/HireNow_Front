import React from 'react';

import classes from "./Loader.module.css"
const Loader = props => {
 
    // const divStyle={
    //     display:props.displayModal? 'block' :'none'
    // }

    // const closeModal=(e)=>{
    //     e.stopPropagation();
    //     props.closeModal()
    // }

  return (
    

    <div className={classes.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  );
}
export default Loader;