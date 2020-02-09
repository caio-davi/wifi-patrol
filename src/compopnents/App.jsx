import React from 'react';
import '../styles/App.css';
import LeafletMap from './LeafletMap';
import RouterList from './RouterList';

const App = () => {


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="body">
        <RouterList style={{width:'400px'}}/>
       <LeafletMap/>
      </div>
    </div>
  );
}

export default App;
