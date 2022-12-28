import react,{useState} from "react"
import classes from "./HomePage.module.css"
import continer from "../../asset/sharedcss.module.css"
import NavBar from "../../Components/Navigation/ToolBar/ToolBar"
import ProfileCard from "../../Components/Person/PersonSamaryCard/PersonSamaryCard"
import CreatePost from "../../Components/Posts/CreatePost/CreatePost"
import Jobs from "../../Components/jobs/jobs"
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Search from "../../Components/UI/Search/Search"
import Modal from "../../Components/Modal/Modal"
import axios from "axios"
import BaseUrl from "../../StaticData"
import SingleMedication from "../../Components/Proposals/SingleProposal/SingleProposal"
const HomePage=(props)=>{
  try {
    
  } catch (error) {
    
  }
 const [medRecommenation,updateMedRecommendation]=useState({})
 const [ModalState, setModalState] = useState(false);
 const [ErrorMassage,UpdateErrorMassge]=useState("")
 const [disableSubmit,updateDisableSumpmit]=useState(false)
 const [SuccessMedCreationModalDisplay,UpdatesuccessMedCreationModalDisplay]=useState(false)
 const [ResposeDataOfMedCreation,setResponseDataOfMedCreation]=useState({
   
    "Schduler": {
        "StartDate": "2022-12-27T00:00:00.000Z",
        "EndDate": "2023-01-27T00:00:00.000Z",
        "AsNeeded": false,
        "ScheduleType": 0,
        "DaysInterval": null,
        "SpacifcDays": [],
        "dosage": [
            {
                "dose": 22,
                "DateTime": "2022-12-27T15:14:00.000Z",
                "_id": "63aaf0f65958fb7010575433"
            }
        ],
       
    }



 })
 const [formData, setFormData] = useState({
  img: '',
  name: '',
  description: '',
  strength: '',
  unit: '',
  quantity: '',
  instructions: '',
  condition: '',
  type: '',
  startDate: '',
  endDate: '',
  asNeeded: false,
  scheduleType: '',
  daysInterval: '',
  specificDays: [],
  dosage: []
});

// supmit med creation
const handleSubmit = async (event) => {
  try {
    
    updateDisableSumpmit(true)

    event.preventDefault();
    console.log(formData);
  
    // prepare data to be sent
    const data = new FormData();
    data.append('img', formData.img);
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('strenth', formData.strength);
    data.append('unit', formData.unit);
    data.append('quantity', formData.quantity);
    data.append('instructions', formData.instructions);
    data.append('condition', formData.condition);
    data.append('type', formData.type);
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    const dosesToMs=formData.dosage.map(dose=>{
      return {
        ...dose,
        DateTime:new Date(dose.DateTime).getTime()
      }
    })
    const SchdulerJsonData={
      StartDate:new Date(formData.startDate).getTime(),
      EndDate:new Date(formData.endDate).getTime(),
      ScheduleType:formData.scheduleType,
      DaysInterval:formData.daysInterval?formData.daysInterval:null,
      SpecificDays:formData.specificDays?formData.specificDays:null,
      dosage:dosesToMs
  
    }
    data.append('Schduler', JSON.stringify(SchdulerJsonData));
    data.append('externalInfo',JSON.stringify(medRecommenation));
  
    // send the data to the server
    const result=await axios.post(`${BaseUrl}general/create/new/med`, data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${props.user.token}` 
  
      }
    }
    )
    console.log("result is ",result)
    setModalState(false)
    setResponseDataOfMedCreation(result.data.data.data)
    UpdatesuccessMedCreationModalDisplay(true)
    //alert(result.data.data.message)
  
   
  


  } catch (error) {
    updateDisableSumpmit(false)
    UpdateErrorMassge(`${error}`)
    console.log("error is ",error)
  }
 





  // submit the form data to the server or do whatever you need to do with it
}

const handleChange = event => {
  if (event.target.name === 'img') {
    
    // the value of the img field will be the file object
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
  } else if (event.target.name === 'asNeeded') {
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  } else if (event.target.name === 'specificDays') {
    setFormData({
      ...formData,
      [event.target.name]: Array.from(event.target.selectedOptions).map(option => option.value)
    });
  } else if (event.target.name.startsWith('dosage-')) {
    // extract the index of the dosage from the name attribute
    const index = event.target.name.match(/\d+/)[0];
    // update the relevant dosage in the dosage array
    console.log(index);
    console.log("event",event.target.name);
    console.log("event",event.target.value);
    setFormData({
      ...formData,
      dosage: formData.dosage.map((d, i) => i === parseInt(index, 10) ? { ...d, [event.target.name.includes('DateTime') ? 'DateTime' : 'dose']: event.target.value } : d)
    });
  } else {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
}

const closeSuccessMedCreationModal=()=>{
  UpdatesuccessMedCreationModalDisplay(false)
 
}

 const closeModal=()=>{
   setModalState(!ModalState)
 }
 const openModal=()=>{
   setModalState(true)
 }
const handleMedCreation=(item)=>{
console.log("handleMedCreation ",item)
updateMedRecommendation(item)
setModalState(true)

}


const addDosage = () => {
  setFormData({
    ...formData,
    dosage: [...formData.dosage, { DateTime: '', dose: '' }]
  });
}

const removeDosage = index => {
  setFormData({
    ...formData,
    dosage: formData.dosage.filter((_, i) => i !== index)
  });
}





  
    return (
        <react.Fragment>
            <NavBar />
            
            <div className={continer.continer+' '+classes.body}>
                <div >
                <ProfileCard />
                </div>
                <div style={{margin:"auto"}}>

                <div style={{margin:"50px"}}>create med</div>
                <div className={classes.Jobs}>
                    <div >
                        <Search handleMedCreation={handleMedCreation}/>
                    </div>
                
                </div>

                </div>
            </div>
       {  
          SuccessMedCreationModalDisplay&& ResposeDataOfMedCreation ?
       
       <Modal 
            displayModal={SuccessMedCreationModalDisplay}
            closeModal={closeSuccessMedCreationModal}
            setShowModal={UpdatesuccessMedCreationModalDisplay}
            >
              <SingleMedication proposalData={ResposeDataOfMedCreation} fromHomeScree={true}/>

            </Modal>:null
          }
            <Modal 
        displayModal={ModalState}
        closeModal={closeModal}
        setShowModal={setModalState}
      > 
      
      <form onSubmit={handleSubmit} >
      <label>
        Image:
        <input type="file" name="img" onChange={handleChange} />
      </label>
      <br />
      <label>
        Name:
        </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      
      <br />
      <br/> 
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        Strength:
        <input type="number" name="strength"  min="0"  onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"  value={formData.strength} onChange={handleChange} />
      </label>
      <br />
      <label>
        Unit:
        <select name="unit" default="g" onChange={handleChange}>
        <option>choose unit</option>
          <option value="g">g</option>
          <option value="mg">mg</option>
          <option value="ml">ml</option>
        </select>
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" name="quantity"  min="0"  value={formData.quantity} onChange={handleChange} />
      </label>
      <br />
      <label>
        Instructions:
        <textarea name="instructions" value={formData.instructions} onChange={handleChange} />
      </label>
      <br />
      <label>
        Condition:
        </label>
        <input type="text" name="condition" value={formData.condition} onChange={handleChange} />
     
      <br />
      <br/>
      <label>
        Type:
        <select name="type"  default="pill" onChange={handleChange}>
          <option>choose type</option>
          <option value="pill">Pill</option>
          <option value="liquid">Liquid</option>
          <option value="injection">Injection</option>
          <option value="inhaler">Inhaler</option>
          <option value="patch">Patch</option>
          <option value="implant">Implant</option>
          <option value="intrauterine device">Intrauterine device</option>
          <option value="suppository">Suppository</option>
          <option value="topical">Topical</option>
          <option value="other">other</option>
        </select>
      </label>
      <br />
      <label>
  Start Date:
  <input type="date" name="startDate" value={formData.startDate} minDate="0" onChange={handleChange} />
</label>
<br />
<label>
  End Date:
  <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
</label>
<br />
<br />
<label>
  Schedule Type:
  <select name="scheduleType" value={formData.scheduleType} onChange={handleChange}>
  <option value="5">choose scheduleType</option>
    <option value="0">Days of week schedule</option>
    <option value="1">As needed</option>
    <option value="2">Every day</option>
    <option value="3">Days interval</option>
  </select>
</label>
<br />


{
  formData.scheduleType==='3' ? 

  <label>
  Days Interval:
  <input type="number" name="daysInterval" min="0" value={formData.daysInterval} onChange={handleChange} />
</label>
  
  :null
}


<br />
{
  formData.scheduleType==='0' ?
  <label>
  Specific Days:
  <select name="specificDays" multiple value={formData.specificDays} onChange={handleChange}>
    <option value="Sunday">Sunday</option>
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
  </select>
</label>
  
  :null
}

<br />
{
  formData.scheduleType==='1' ?null
  :
  <label>
  Dosage:
  {formData.dosage.map((d, index) => (
    <div key={index}>
      <input type="datetime-local" name={`dosage-${index}-DateTime`} onChange={handleChange} placeholder="dose time" min={new Date().toISOString().slice(0, 16)}/>
      <input type="number" name={`dosage-${index}`} value={d.dose} onChange={handleChange} min="0" placeholder="enter dose"/>
      <button type="button" style={{margin:"15px",width:"auto"}}   onClick={() => removeDosage(index)}>Remove</button>
    </div>
  ))}
  <button type="button" style={{margin:"15px",width:"auto"}} onClick={addDosage}>Add Dosage</button>
</label>

}
    <p>{ErrorMassage}</p>
    {
      disableSubmit?null:<input type="submit" value="Submit" disabled={disableSubmit} />
    }
      
    </form>
      
       </Modal>

        </react.Fragment>
        
    )
}

const mapStateToProps = state => {
    return {
       user:state.Auth
    };
  };
  
 
  
  
export default withRouter(connect( mapStateToProps )( HomePage ));

