import React from "react";

const Event = (props) => {
    return (
        <td className={'Event ' + props.color}> 
        <div className="event-container">
            <p className="event-title">{props.title}</p>
            <h5 className="event-details">Time:{props.time}</h5>

        </div>  
    </td>
    );
}

export default Event;