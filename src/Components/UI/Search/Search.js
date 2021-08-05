import react from "react"
import classes from "./Search.module.css"

function Search() {
  return (
    <react.Fragment>
     
  <input type="text" placeholder="Search.." name="search" className={classes}/>
  <button ><i className="fa fa-search"></i></button>

     
    </react.Fragment>
  );
}

export default Search;
