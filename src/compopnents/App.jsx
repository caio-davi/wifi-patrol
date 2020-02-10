import React from "react";
import "../styles/App.css";
import LeafletMap from "./LeafletMap";
import RouterPanel from "./RouterPanel";
import SimulationOptions from "./SimulationOptions";
import { MDBIcon } from "mdbreact";
import routers from "../routersList";
import { clone } from "../utils";

const App = () => {
  const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const patrolInitialPosition = {
    status: true,
    lat: 43.5387,
    lng: -79.666,
    direction: 0, //   0->east, 1->north, 2->weast, 3->south
    step: 14
  };

  const intruderPosition = () => {
    const target = routers[Math.floor(getRandom(0, 10))];
    return {
      name: target.name,
      color: target.color,
      status: false,
      lat: getRandom(43.5389, 43.53923),
      lng: getRandom(-79.667872, -79.6658873),
      direction: 2, //   0->east, 1->north, 2->weast, 3->south
      step: 14
    };
  };

  const center = [43.53885796212106, -79.66675600122652];

  const stepCounter = target => {
    let stepCounter = target.step;
    let patrolDirection = target.direction;
    if (stepCounter > 0) {
      stepCounter = stepCounter - 1;
      return { step: stepCounter, direction: patrolDirection };
    } else {
      patrolDirection = patrolDirection + 1;
      if (patrolDirection % 2 === 0) {
        // Mississauga is way too North, I had to adjust
        stepCounter = 14; // the step because lat!=lgn near the polos
      } else {
        stepCounter = 5; // Just 5 steps when walking on vertical.
      }
      return { step: stepCounter, direction: patrolDirection };
    }
  };

  const [showSimulationOptions, setShowSimulationOptions] = React.useState(
    true
  );
  const [patrol, setPatrol] = React.useState(patrolInitialPosition);
  const [intruder, setIntruder] = React.useState(intruderPosition());
  const [showRadius, setShowRadius] = React.useState(false);
  const [cloned, setCloned] = React.useState("");

  const toogleShowRadius = () => {
    setShowRadius(!showRadius);
  };

  const toogleIntruder = () => {
    let newIntruder = intruderPosition();
    newIntruder.status = !intruder.status;
    setIntruder(newIntruder);
  };

  const toogleSimulationOptions = () => {
    setShowSimulationOptions(!showSimulationOptions);
  };

  const buttonColor = () => {
    return showSimulationOptions ? "amber-text" : "grey-text";
  };

  const updatePosition = target => {
    let newTarget = {};
    switch (target.direction % 4) {
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
      default:
        break;
    }
    newTarget = { ...newTarget, ...stepCounter(target) };
    return newTarget;
  };

  const updatePatrolPosition = () => {
    setPatrol(updatePosition(patrol));
  };

  // eslint-disable-next-line
  const updateIntruderPosition = () => {
    setIntruder(updatePosition(intruder));
  };

  const update = () => {
    updatePatrolPosition();
  };

  const toRadians = degrees => {
    var pi = Math.PI;
    return degrees * (pi / 180);
  };

  const distance = (position1, position2) => {
    var R = 6371e3; // metres
    var lat1 = toRadians(position1.lat);
    var lat2 = toRadians(position2.lat);
    var latDiff = toRadians(position2.lat - position1.lat);
    var lngDiff = toRadians(position2.lng - position1.lng);
    var a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(lngDiff / 2) *
        Math.sin(lngDiff / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  setTimeout(update, 1000);

  const allSignals = () => {
    let allSignals = clone(routers);
    intruder.status && allSignals.push(intruder);
    return allSignals;
  };

  const getRouterPosition = name => {
    for (let key in routers) {
      const router = routers[key];
      if (router.name === name) {
        return {
          lat: router.lat,
          lng: router.lng
        };
      }
    }
  };

  const checkWifi = () => {
    const signals = allSignals();
    for (let key in signals) {
      const listenNow = signals[key];
      const signalPosition = { lat: listenNow.lat, lng: listenNow.lng };
      const routerPosition = getRouterPosition(listenNow.name);
      let measuredDistance = distance(patrol, signalPosition);
      let routerDistance = distance(patrol, routerPosition);
      if (
        cloned === "" &&
        measuredDistance < 30 &&
        measuredDistance !== routerDistance
      ) {
        setCloned(listenNow.name);
      }
    }
  };

  const display = () => {
    return showSimulationOptions ? "Show" : "Hide";
  };

  const resetWifi = () => {
    setCloned("");
  };

  const alarm = () => {
    return cloned !== '' ? 'alarm-on' : 'alarm-off';
  }

  checkWifi();

  return (
    <div className="App">
      <header className="App-header">
        <MDBIcon icon="wifi" size="4x" className="amber-text" />
        <MDBIcon
          icon="bars"
          size="4x"
          className={buttonColor()}
          onClick={() => toogleSimulationOptions()}
        />
      </header>
      <div className={alarm()}>
        {`Man in the middle attack detected in router ${cloned}`}
        </div>
      <div className="Body">
        <RouterPanel
          className="RouterPanel"
          routers={routers}
          cloned={cloned}
        />
          <LeafletMap
            center={center}
            routers={routers}
            patrol={patrol}
            intruder={intruder}
            showRadius={showRadius}
          />
        <SimulationOptions
          className={display()}
          display={display}
          toogleShowRadius={toogleShowRadius}
          toogleIntruder={toogleIntruder}
          resetWifi={resetWifi}
        />
      </div>
    </div>
  );
};

export default App;
