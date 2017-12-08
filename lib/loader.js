import React from 'react';
import { RingLoader, ClimbingBoxLoader } from 'react-spinners';

 const Ringloader = function(config){
    return (
      <div className='loading'>
        <div className='loading_image'>
          <RingLoader
            className='loading_image'
            color={config.color}
            loading={config.loading}
            size={config.size}
           />
         </div>
         <p className='loading_msg' >{config.msg}</p>
       </div>
    )
  }

const Boxloader = function(config){
  return (
    <div className='loading'>
      <div className='loading_image'>
        <ClimbingBoxLoader
          color={config.color}
          loading={config.loading}
          size={config.size}
        />
      </div>
      <p className='loading_msg' >{config.msg}</p>
    </div>
  )
}

export default Ringloader;
export { Boxloader};
