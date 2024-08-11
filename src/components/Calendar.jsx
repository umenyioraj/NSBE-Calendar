import React, { useState, useEffect } from "react";
import Event from "./Event";
import NSBE from "../assets/NSBE.png";
import '../App.css'
import { useNavigate } from "react-router-dom";


const Calendar = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: "", day_of_week: "", time_of_day: "" });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("https://nsbe-calendar.onrender.com/api/events");
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.log("Failed to fetch events", error);
            }
        };

        fetchEvents();
    }, []);

    const handleClick = (day, time) => {
        setNewEvent({ ...newEvent, day_of_week: day, time_of_day: time });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newEvent.title || !newEvent.day_of_week || !newEvent.time_of_day) {
            alert("All fields are required");
            return;
        }

        try {
            const response = await fetch("https://nsbe-calendar.onrender.com/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Event added:", data.event);
                setEvents([...events, data.event]);
                setShowModal(false);
            } else {
                const errorData = await response.json();
                console.error("Failed to add new event", errorData.message);
                alert("Failed to add new event. Please try again.");
            }
        } catch (error) {
            console.error("Error adding event", error);
            alert("Failed to add event. Please try again later.");
        }

    };

    const handleAboutUsClick = () => {
        navigate('/AboutUs');
    };

    const handleScholarshipsClick = () => {
        navigate('/Scholarships');
    }
        
    

    return (
        <div className="calendar-container">
            <div className="logo-container">
                <img src={NSBE} alt="NSBE Event" className="logo" />
            </div>
            <div className="nav-table">
                <a>
                    <button onClick={handleScholarshipsClick}>Scholarships</button>
                </a>
                <a href="https://convention.nsbe.org/" target="_blank">
                    <button>Conference</button>
                </a>
                <a href="mailto:novansbe@villanova.edu">
                    <button>Contact Us</button>
                </a>
                <a>
                    <button onClick={handleAboutUsClick}>About Us</button>
                </a>
            </div>
            <div className="calendar">
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
                        {["8am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"].map((time, i) => (
                            <tr key={i}>
                                <td className="time">{time}</td>
                                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, j) => (
                                    <td key={j}>
                                        <button className="my-button" onClick={() => handleClick(day, time)}>
                                            Add new event
                                        </button>
                                        {events.map((event, k) => {
                                            if (event.day_of_week === day && event.time_of_day === time) {
                                                return <Event key={k} date={event.day_of_week} time={event.time_of_day} title={event.title} />;
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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Event Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Day of Week:</label>
                                <input
                                    type="text"
                                    name="day_of_week"
                                    value={newEvent.day_of_week}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Time of Day:</label>
                                <input
                                    type="text"
                                    name="time_of_day"
                                    value={newEvent.time_of_day}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit">Add Event</button>
                            <button type="button" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
