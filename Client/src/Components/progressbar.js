import React from 'react'

const Progressbar = ({percentage}) => {
    return (
        <div>
        <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated"
         role="progressbar" style={{width:`${percentage}%`}}></div>
        </div>
        {percentage}%
        </div>
    )    
}

export default Progressbar;
