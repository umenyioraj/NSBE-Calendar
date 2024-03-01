import React from "react";
import Event from './Event'

const Calendar = () => {
    return (
        
        <div className='Calendar'>
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
            <tr>
                        <td className='time'></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">8am</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">10am</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">11am</td>
                        <td></td>
                        <td><Event event=' Signals' color='blue' location='Tolentine 417' /></td>
                        <td></td>
                        <td><Event event='Signals' color='blue' location='Tolentine 417' /></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">12pm</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">1pm</td>
                        <td></td>
                        <td><Event event='Fnd of Math' color='green' location='Bartley' /></td>
                        <td><Event event='Design Sem' color='red' location='Tolentine 215' /></td>
                        <td></td>
                        <td><Event event='Design Sem' color='red' location='Tolentine 215' /></td>
                        <td><Event event='Fnd of Math' color='green' location='Tolentine 417' /></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">2pm</td>
                        <td></td>
                        <td><Event event='Networks' color='pink' location='Tolentine 417' /></td>
                        <td></td>
                        <td><Event event='Networks' color='pink' location='Tolentine 417' /></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">3pm</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">4pm</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">5pm</td>
                        <td></td>
                        <td></td>
                        <td><Event event=' Networks Lab' color='pink' location='Vasey' /></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
            
            </tbody>
        </table>
    </div>

    )
}

export default Calendar;