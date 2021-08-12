import react,{useState} from "react"
import classes from "./CreatePost.module.css"
import {NavLink} from "react-router-dom"
import Modal from "../../Modal/Modal"
import CreateJob from "../../CreateJob/CreateJob"
function CreatePost() {
  const [ModalState, setModalState] = useState(false);
  const closeModal=()=>{
    setModalState(!ModalState)
  }
  const openModal=()=>{
    setModalState(true)
  }
  return (
    <react.Fragment>
     <div className={classes.createPost}>
     
            <img src="https://gambolthemes.net/workwise-new/images/resources/user-pic.png" className={classes.img}></img>
        
        <button className={classes.CreateProject} onClick={openModal}>CreateJob</button>
        {/* <button className={classes.Createjob}>CreateJob</button> */}
     </div>
      <Modal 
        displayModal={ModalState}
        closeModal={closeModal}
        setShowModal={setModalState}
      > <CreateJob closeModal={closeModal}/> </Modal>
    </react.Fragment>
  );
}

export default CreatePost;
