import React from 'react';
import '../styles/App.css';
import LeafletMap from './LeafletMap';
import RouterPanel from './RouterPanel';
import SimulationOptions from './SimulationOptions';
import {MDBIcon} from 'mdbreact';
import routers from "../routersList";

const App = () => {

  const patrolInitialPosition = {
  'lat': 43.5387, 
  'lng': -79.666,
  'direction' : 0, //   0->east, 1->north, 2->weast, 3->south
  'step' : 14,
  }

  const intruderInitialPosition = {
    'lat': 43.5392, 
    'lng': -79.6675,
    'direction' : 2, //   0->east, 1->north, 2->weast, 3->south
    'step' : 14,
    }


  const center = [43.53885796212106, -79.66675600122652];

  const stepCounter = (target) => {
    let stepCounter = target.step;
    let patrolDirection = target.direction;
    if(stepCounter > 0){
      stepCounter = stepCounter - 1;
      return {'step': stepCounter, 'direction': patrolDirection};
    }
    else{
      patrolDirection = patrolDirection + 1;
      if(patrolDirection%2===0){            // Mississauga is way too North, I had to adjust 
        stepCounter = 14;                   // the step because lat!=lgn near the polos
      }else{
        stepCounter = 5;                    // Just 5 steps when walking on vertical.
      }
      return {'step': stepCounter, 'direction': patrolDirection};
    }
  }

  const [showSimulationOptions, setShowSimulationOptions] = React.useState(true);
  const [patrol, setPatrol] = React.useState(patrolInitialPosition);
  const [intruder, setIntruder] = React.useState(intruderInitialPosition);


  const toogleSimulationOptions = () => {
    setShowSimulationOptions(!showSimulationOptions)
  }

  const buttonColor = () => {
    return showSimulationOptions ? 'amber-text' : 'grey-text';
  }

  const display = () => {
    return showSimulationOptions ? 'Show' : 'Hide';
}

  const updatePosition = (target) => {
    let newTarget = {};
    switch (target.direction%4) {
      case 0:
        newTarget.lat = target.lat;
        newTarget.lng = target.lng - 0.0001;
        break;
      case 1:
        newTarget.lat = target.lat + 0.0001;
        newTarget.lng = target.lng;
        break;
      case 2:
        newTarget.lat = target.lat;
        newTarget.lng = target.lng + 0.0001;
        break;
      case 3:
        newTarget.lat = target.lat - 0.0001;
        newTarget.lng = target.lng;
        break;
    }
    newTarget = {...newTarget, ...stepCounter(target)};
    return newTarget;
  }

  const updatePatrolPosition = () => {
    setPatrol(updatePosition(patrol));
  }

  const updateIntruderPosition = () => {
    setIntruder(updatePosition(intruder));
  }

  const update = () => {
    updatePatrolPosition();
  }

  const toRadians = (degrees) =>{
    var pi = Math.PI;
    return degrees * (pi/180);
  }

  const distance =(position1, position2) =>{
    var R = 6371e3; // metres
    var lat1 = toRadians(position1.lat);
    var lat2 = toRadians(position2.lat);
    var latDiff = toRadians(position2.lat-position1.lat);
    var lngDiff = toRadians(position2.lng-position1.lng);
    var a = Math.sin(latDiff/2) * Math.sin(latDiff/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(lngDiff/2) * Math.sin(lngDiff/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  setTimeout(update, 1000);

  return (
    <div className="App">
      <header className="App-header">
          <MDBIcon icon = 'wifi' size="4x" className='amber-text'/>
          <MDBIcon icon = 'bars' size="4x" className={buttonColor()} onClick={()=>toogleSimulationOptions()}  />
      </header>
      <div className="body">
        <RouterPanel className='RouterPanel' routers={routers}/>
        <LeafletMap center={center} routers={routers} patrol={patrol} intruder={intruder}/>
        <SimulationOptions className={display()}/>
      </div>
    </div>
  );
}

export default App;
