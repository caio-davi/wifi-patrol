import React from 'react';
import '../styles/App.css';
import LeafletMap from './LeafletMap';
import RouterPanel from './RouterPanel';
import SimulationOptions from './SimulationOptions';
import {MDBIcon} from 'mdbreact';
import routers from "../routersList";

const App = () => {

  const [showSimulationOptions, setShowSimulationOptions] = React.useState(false);
  const [simulationsButtonColor, setSimulationButtonColor] = React.useState('amber-text')
  
  const toogleSimulationOptions = () => {
    setShowSimulationOptions(!showSimulationOptions)
    if(showSimulationOptions){
      setSimulationButtonColor('grey-text');
    }
    else{
      setSimulationButtonColor('amber-text');
    }
  }

  const display = () => {
    return showSimulationOptions ? 'show' : 'hide';
}

  return (
    <div className="App">
      <header className="App-header">
          <MDBIcon icon = 'wifi' size="4x" className='amber-text'/>
          <MDBIcon icon = 'bars' size="4x" className={simulationsButtonColor} onClick={()=>toogleSimulationOptions()}  />
      </header>
      <div className="body">
        <RouterPanel className='RouterPanel' routers={routers}/>
       <LeafletMap/>
       <SimulationOptions className={display()} show={showSimulationOptions}/>
      </div>
    </div>
  );
}

export default App;
