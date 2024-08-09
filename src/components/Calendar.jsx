import React, {useState, useEffect} from "react";
import Event from './Event'
import NSBE from '../assets/NSBE.png'

const Calendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async() => {
            try {
                const response = await fetch('http://localhost:5000/api/events');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.log('Failed to fetch events',error);
            }
        };

        fetchEvents();
    }, []);


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
            day_of_week: eventDate,
            time_of_day: eventTime,
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
            <div class='nav-table'>
                <a>
                <button>Scholarships</button>
                </a>
                <a href="https://convention.nsbe.org/" target="_blank">
                <button>Conference</button>
                </a>
                <a>
                <button>Contact Us</button>
                </a>
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
                                            if (event.day_of_week === day && event.time_of_day === time) {
                                                return (
                                                    <Event key={k} date={event.day_of_week} time={event.time_of_day} title={event.title}/>
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