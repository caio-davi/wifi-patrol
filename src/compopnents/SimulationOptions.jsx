import React from "react";
import { MDBBtn } from "mdbreact";
import "../styles/RouterPanel.css";

const SimulationOptions = props => {
  
  return (
    <div className='btnList'>
      <MDBBtn color="deep-purple" onClick={() => props.toogleShowRadius()}>
        Wifi Ranges
      </MDBBtn>
      <MDBBtn color="deep-purple" onClick={() => props.toogleIntruder()}>
        Intruder
      </MDBBtn>
      <MDBBtn color="deep-purple" onClick={() => props.resetWifi()}>
        Reset Wifis
      </MDBBtn>
    </div>
  );
};

export default SimulationOptions;
