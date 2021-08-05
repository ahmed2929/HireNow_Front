import react from "react"
import classes from "./ToolBar.module.css"
import NavItems from "../NavItems/Navitems"
function ToolBar() {
  return (
    <react.Fragment>
    <header className={classes.header}>
        <NavItems />
    </header>
    </react.Fragment>
  );
}

export default ToolBar;
