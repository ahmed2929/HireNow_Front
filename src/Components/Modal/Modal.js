import React from 'react';
import classes from "./Modal.module.css"
const Modal = props => {
    const divStyle={
        display:props.displayModal? 'block' :'none'
    }

    const closeModal=(e)=>{
        e.stopPropagation();
        props.closeModal()
    }

  return (
     <div className={classes.modal} onClick={closeModal} style={divStyle} >
       <div className={classes.modalContent} onClick={(e)=>{e.stopPropagation()}}>
          <span className={classes.close} onClick={closeModal}>&times;</span>
         {props.children}
       </div>
     </div>
  );
}
export default Modal;