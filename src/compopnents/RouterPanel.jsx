import React from 'react';
import '../styles/RouterPanel.css'

const RouterPanel = (props) => {

  const RouterList = () => {
    let list = [];

    const label = (name) => {
      const color = name===props.cloned ? 'red' : 'Chartreuse';
      return {
        width: 15,
        height: 15,
        backgroundColor: color,
        marginLeft: 15,
        border:'1px solid black',
      };
    };

    for(let key in props.routers){
      const router = props.routers[key];
      list.push(
        <div className='Router'>
          <div>
            <canvas style={label(router.name)}/>
          </div>
          <div>
            {router.name}

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
