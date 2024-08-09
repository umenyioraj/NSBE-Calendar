import React, { useState } from 'react';

const Modal = ({ show, handleClose, handleSave }) => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');

    const handleSubmit = () => {
        if (!eventTitle || !eventDate || !eventTime) {
            alert('All fields are required');
            return;
        }
        handleSave({ title: eventTitle, day_of_week: eventDate, time_of_day: eventTime });
        handleClose();
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Event</h2>
                <label>
                    Event Title:
                    <input
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                    />
                </label>
                <label>
                    Event Date:
                    <input
                        type="text"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </label>
                <label>
                    Event Time:
                    <input
                        type="text"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                    />
                </label>
                <div className="modal-actions">
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
