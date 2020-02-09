import React from "react";
import {
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import "../styles/RouterPanel.css";

const SimulationOptions = props => {
 
  return (
    <div>
      <MDBBtn color="deep-purple" onClick={() => props.toogleShowRadius()}>
        Wifi Ranges
      </MDBBtn>
      <MDBBtn color="deep-purple" onClick={() => props.toogleIntruder()}>
        Intruder
      </MDBBtn>
    </div>
  );
};

export default SimulationOptions;
