import React from 'react';
import '../styles/RouterPanel.css'

const RouterPanel = (props) => {

  const RouterList = () => {
    let list = [];
    const label = {
      width: 15,
      height: 15,
      backgroundColor: 'Chartreuse',
      marginLeft: 15,
      border:'1px solid black',
    };

    for(let key in props.routers){
      list.push(
        <div className='Router'>
          <div>
            <canvas style={label}/>
          </div>
          <div>
            {props.routers[key].name}

          </div>
        </div>
      )
    }
    return list;
  };


  return  (
            <div className='List'>
              <RouterList />
            </div>
          );
};

export default RouterPanel;
