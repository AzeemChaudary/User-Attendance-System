import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import UserReport from './UserReport.jsx'
import './Admin.css';
import Modal from 'react-modal';


const ViewAttendance = () => {
  const { _id } = useParams();
 
  const [attendanceData, setAttendanceData] = useState([]); //myAttendence, Leave, currentDate
  const [currentDate, setcurrentDate] = useState('');
  const [MyAttendence, setMyAttendence] = useState('');
  const [Leave, setLeave] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ViewReport, setViewReeport] = useState(false);
  const [dateArray, setDateArray] = useState([]);
  const [gradeData , setGradeData] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(null);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    .split("=")[1];
  const getCurrentUserAttendence = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/attendence/adminGetCurrentUserAttendence/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      console.log(response.data);
      const formattedData = response.data.map((item) => ({
        ...item,
        currentDate: new Date(item.currentDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
      }));
      console.log("get data function " + formattedData)
      setAttendanceData(formattedData);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleEditAttendance = async (id, myAttendence, leave , event) => {
    event.preventDefault()
    console.log('Edit attendance:', id);
    console.log('My Attendance:', myAttendence);
    console.log('Leave:', leave);
  await axios.put(`http://localhost:8000/api/attendence/EditAttendance/${id}`, {
    myAttendence : myAttendence ,
     Leave :leave
  } , {
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    
    toast.success(response.data.message);
    getCurrentUserAttendence();
  })
  .catch((error) => {
    console.log(error);
    toast.error(error);
  });
    // Perform the necessary logic with the received values
  };
  

  const handleAddAttendance = async (e) => {
    e.preventDefault();
    console.log('Add attendance');
    console.log("attendence is " + MyAttendence)
    try {
      const response = await axios.post(`http://localhost:8000/api/attendence/addAttendence/${_id}`, {
        myAttendence: MyAttendence,
        Leave: Leave,
        currentDate: currentDate,
      }, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      console.log(response.data);
      toast.success(response.data.message);
      setMyAttendence(''); // Clear the input field value
      setLeave(''); // Clear the input field value
      setcurrentDate(''); 
      getCurrentUserAttendence();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleDeleteAttendance = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/attendence/DeleteAttendence/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response);
      console.log(response.data);
      toast.success(response.data.message);
      getCurrentUserAttendence();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    console.log('Delete attendance:', id);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${year}-${month}-${day}`;
  };

  const Report = async () => {
    if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      console.log("formatDate " + formattedStartDate)
      const formattedEndDate = formatDate(endDate);
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
      const updatedDateArray = [startDate, endDate]; 
      setDateArray(updatedDateArray);
      setViewReeport(true);
    } else {
      console.log("Please select both start date and end date");
    }
  };

  const UserGrade = async ()=>{
    await axios.get(`http://localhost:8000/api/attendence/userGrades/${_id}` , {
        headers: {
          Authorization: `${token}`,
        },
      })  .then((response) => {
        console.log(response);
        console.log(response.data);
        setGradeData(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  }
  const openModal = (itemId) => {
    console.log("Item ID:", itemId);
    setIsModalOpen(itemId);
  };
  
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  useEffect(() => {
    getCurrentUserAttendence();
    UserGrade();
  }, []);

  if (ViewReport) {
    return <UserReport data={dateArray} />;
  } else {
  return (
    <>
     <div>
    <div className="center-page" >
        <div className="text-center">
      <h1 className="font-weight-bold" style={{ fontSize: '24px' }}>User's Attendance</h1>

      <table className="table table-bordered table-striped custom-table mx-auto table-styled">
        <thead>
          <tr>
            <th>Attendance</th>
            <th>Leave</th>
            <th>Date</th>
            <th>User</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item) => (
            <tr key={item._id}>
              <td> {item.myAttendence}
               
                </td>
              <td>{item.Leave}</td>
              <td>{item.currentDate}</td>
              <td>{item.user.firstname} {item.user.lastname}</td>
              <td>{item.user.email}</td>
              <td>
                <button className="btn btn-primary" onClick={() => openModal(item._id)} >Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteAttendance(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="grade-form-container">
      <div className="grade-data">
    <table className="grade-table ">
      <tbody>
        <tr>
          <th>No of Leaves this month:</th>
          <td>{gradeData.leaves}</td>
        </tr>
        <tr>
          <th>No of Presents this month: </th>
          <td>{gradeData.presents}</td>
        </tr>
        <tr>
          <th>No of Absents this month:</th>
          <td>{gradeData.absents}</td>
        </tr>
        <tr>
          <th>Attendence Grade:</th>
          <td>{gradeData.grade}</td>
        </tr>
      </tbody>
    </table>
  </div>
      <div  className="center-content mb-10 attendance-form" onSubmit={handleAddAttendance}>
        <form className="text-center">
          <div className="mb-3 ">
            <label className="form-label">Current Date:</label>
            <input
              type="date"
              className="form-control"
              value={currentDate}
              onChange={(e) =>{
                e.preventDefault();
                setcurrentDate(e.target.value);
              } }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">My Attendance:</label>
            <input
              type="text"
              className="form-control"
              value={MyAttendence}
              onChange={(e) =>{
e.preventDefault();
setMyAttendence(e.target.value);
              } }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Leave:</label>
            <input
              type="text"
              className="form-control"
              value={Leave}
              onChange={(e) =>{
                e.preventDefault();
                setLeave(e.target.value);
              }  }
            />
          </div>

          <button className="btn btn-success" type="submit">Add Attendance</button>
          <div style={{ marginBottom: '10px' }}></div>
        </form>
      </div>
      </div>
      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4" >
            <div>
              <label>Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div>
              <label>End Date:</label>
              <DatePicker selected={endDate} onChange={handleEndDateChange} />
            </div>
            <button
              type="submit"
              onClick={Report}
              className="btn btn-primary btn-lg"
            >
              View Users Report
            </button>
            
          </div>
          <div style={{ marginTop: '50px' }}>  ...</div>
    </div>
   </div>
   <Modal isOpen={!!isModalOpen} onRequestClose={() => setIsModalOpen(null)}>
  <h2>Edit Attendance</h2>
  <form>
    <div className="mb-3">
      <label htmlFor="attendanceInput">Attendance:</label>
      <input
        type="text"
        id="attendanceInput"
        className="form-control"
        value={MyAttendence}
        onChange={(e) => setMyAttendence(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="leaveInput">Leave:</label>
      <input
        type="text"
        id="leaveInput"
        className="form-control"
        value={Leave}
        onChange={(e) => setLeave(e.target.value)}
      />
    </div>
    <button
  className="btn btn-success"
  onClick={(event) => handleEditAttendance(isModalOpen, MyAttendence, Leave, event)}
>
  Save
</button>
    <button className="btn btn-secondary" onClick={() => setIsModalOpen(null)}>
      Cancel
    </button>
  </form>
</Modal>

  </>
  );
};
}
export default ViewAttendance;
