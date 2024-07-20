import React, {useState} from "react";
import Event from './Event'
import NSBE from '../assets/NSBE.png'

const Calendar = () => {
    const [events, setEvents] = useState([]);

    const handleClick = async (day,time) => {
       const eventTitle = prompt('Enter event title:');
       if(!eventTitle){
        alert('Event title is required');
        return;
       }
       const eventDate = prompt('Enter Date:');
        if (!eventDate) {
            alert('Event date is required');
            return;
        }
        const eventTime = prompt('Enter time:');
        if (!eventTime) {
            alert('Event time is required');
            return;
        }

        const payload = {
            title: eventTitle,
            date: eventDate,
            time: eventTime,
        };

       try {
        const response = await fetch('http://localhost:5000/api/events', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Event added:',data.event);
           // alert('New event added successfully!');
            setEvents([...events, data.event]); // Update state with new event
        } else {
            const errorData = await response.json();
            console.error('Failed to add new event', errorData.message);
            alert('Failed to add new event, Please try again.');    
        }

       } catch(error){
        console.error('Error adding event', error);
        alert('Failed to add event. Please Try again later');
       }
    };
    return (
        <div className='calendar-container'>
            <div className='logo-container'>
                <img src={NSBE} alt="NSBE Event" className='logo' />
            </div>
            <div className='calendar'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Sunday</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['8am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'].map((time, i) => (
                            <tr key={i}>
                                <td className='time'>{time}</td>
                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, j) => (
                                    <td key={j}>
                                        <button className='my-button' onClick={() => handleClick(day, time)}>Add new event</button>
                                        {events.map((event, k) => {
                                            if (event.date === day && event.time === time) {
                                                return (
                                                    <Event key={k} date={event.date} time={event.time} title={event.title}/>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;