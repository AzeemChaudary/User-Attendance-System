import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UserReport = (props) => {
  const { _id } = useParams();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    .split("=")[1];
  const [data, setData] = useState([]);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  };

  const Report = async () => {
    const startingDate = formatDate(props.data[0]);
    const endingDate = formatDate(props.data[1]);
    console.log(
      "API called with start date:",
      startingDate,
      "and end date:",
      endingDate
    );
    const apiUrl = `http://localhost:8000/api/attendence/AttendenceReport/${_id}?from=${startingDate}&to=${endingDate}`;
    await axios
      .get(apiUrl, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        const responseData = response.data.map((item) => ({
          ...item,
          currentDate: new Date(item.currentDate).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          ).replace(/\//g, '-'),
        }));
        setData(responseData);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  useEffect(() => {
    Report();
  }, []);

  return (
    <div className="center-page">
      <h2 className="text-center">Users Attendances</h2>
      <div className="table-container">
        {data.length > 0 ? (
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
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.myAttendence}</td>
                  <td>{item.Leave}</td>
                  <td>{item.currentDate}</td>
                  <td>
                    {item.user.firstname} {item.user.lastname}
                  </td>
                  <td>{item.user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Attendances found</p>
        )}
      </div>
    </div>
  );
};

export default UserReport;
