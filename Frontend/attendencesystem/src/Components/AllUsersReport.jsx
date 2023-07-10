import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'

const AllUsersReport = (props) => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    .split('=')[1];

  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      return `${year}-${month}-${day}`;
    };

    const startingDate = formatDate(props.data[0]);
    const endingDate = formatDate(props.data[1]);

    const fetchReportData = async () => {
      console.log('API called with start date:', startingDate, 'and end date:', endingDate);
      const apiUrl = `http://localhost:8000/api/attendence/AdminAllReport?from=${startingDate}&to=${endingDate}`;

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `${token}`,
          },
        });

        console.log('response is', response);
        console.log('response.data is', response.data);

        const responseData = response.data.map(item => ({
          ...item,
          currentDate: new Date(item.currentDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).replace(/\//g, '-')
        }));
        setReportData(responseData);
        console.log("Report data is ", reportData);
      } catch (error) {
        console.error('Error Generating Report:', error);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div className='center-page'>
      <h2 className="text-center">All Users Attendances</h2>
      <div className="table-container">
        {reportData.length > 0 ? (
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
              {reportData.map(item => (
                <tr key={item._id}>
                  <td>{item.myAttendence}</td>
                  <td>{item.Leave}</td>
                  <td>{item.currentDate}</td>
                  <td>{item.user.firstname} {item.user.lastname}</td>
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

export default AllUsersReport;
