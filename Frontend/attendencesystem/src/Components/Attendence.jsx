import React from 'react'
import './Attendence.css'
const Attendence = (props) => {
  const {myAttendence}=props.value
  console.log("{props.myAttendence} " + props.value);
  let data=props.value;
  console.log(data.length)
  console.log(data[0])
  return (
    <div className="table-container">
    <table className="styled-table">
      <thead>
        <tr>
          <th>Leave</th>
          <th>My Attendance</th>
          <th>Current Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.Leave}</td>
            <td>{item.Leave !== "" ? "" : item.myAttendence}</td>
            <td>{item.currentDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
      );
      
    };
   

export default Attendence
