import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import AllUsersReport from "./AllUsersReport";
const AdminHome = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    .split("=")[1];
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ViewReport, setViewReeport] = useState(false);
  const [dateArray, setDateArray] = useState([]);
  const getAllUsers = async () => {
    await axios
      .get("http://localhost:8000/api/users/getAllUsers", {
        headers: {
          Authorization: `${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setData(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
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

  const AllReport = async () => {
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

 
  const viewAttendance = (_id) => {
    navigate(`/AdminHome/ViewAttendance/${_id}`);
  };
  
  useEffect(() => {
    getAllUsers();
  }, []);

  if (ViewReport) {
    return <AllUsersReport data={dateArray} />;
  } else {
    return (
      <>
        <div>
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
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
              onClick={AllReport}
              className="btn btn-primary btn-lg"
            >
              View All Users Report
            </button>
          </div>
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Current Active Users
            </button>
          </div>
          <div className="table-container">
            <table className="responsive-table styled-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>profile Image</th>
                  <th>View Attendance</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>
                      <img
                        src={item.imageUrl}
                        alt={item.firstname}
                        className="rounded rounded-circle shadow-4-strong"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </td>
                    <td>
                    <button onClick={() => viewAttendance(item._id)}>View Attendance</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
};

export default AdminHome;
