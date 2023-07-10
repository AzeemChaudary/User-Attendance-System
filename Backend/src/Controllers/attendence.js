import Attendence from "../Models/Attendence.js";
import User from "../Models/User.js";
import moment from 'moment-timezone';
export const setAttendence = async (req, res, next) => {
  const currentDate = new Date();
  console.log("current date is  " + currentDate);

  const year = currentDate.getFullYear();
  console.log("current year is  " + year);
  const month = currentDate.getMonth() + 1;
  console.log("current month is  " + month); // Note: January is month 0
  const day = currentDate.getDate();
  console.log("current day is  " + day);
  

 
 
  let mycurrentDate = new Date().toISOString().slice(0, 10);
  console.log("mycurrentDate is " + mycurrentDate +" and its type is " + typeof(mycurrentDate));

//  mycurrentDate = moment.tz(mycurrentDate  , "Asia/Karachi").format()
  console.log("mycurrentDate is " + mycurrentDate +" and its type is " + typeof(mycurrentDate));

 


  let Leave = "";

  if (req.body.Leave) {
    Leave = "Leave pending";
  }
  let FormattedcurrentDate;
  if(req.body.currentDate){
    const localDate = new Date(req.body.currentDate);
    const utcDate = new Date(
      localDate.getUTCFullYear(),
      localDate.getUTCMonth(),
      localDate.getUTCDate(),
      localDate.getUTCHours(),
      localDate.getUTCMinutes(),
      localDate.getUTCSeconds()
    );
    FormattedcurrentDate = utcDate
    console.log( " formatted date is  " + FormattedcurrentDate)
  }
  const CurrentUserAttendence = await Attendence.find({
    user: req.user.id,
    currentDate: mycurrentDate, 
  });

  //console.log(CurrentUserAttendence);


  if (CurrentUserAttendence.toString()) {
    return res.status(401).send({
      message:
        "You are not Allowed to Mark your Attendence more than once a day",
    });
  } else {
    const newAttendence = new Attendence({
      user: req.user.id,
      // username : req.user.name ,
      myAttendence: req.body.myAttendence,  
      Leave: Leave,
    // currentDate: req.body.currentDate,
    currentDate: mycurrentDate
    });
    try {
      if (req.body.Leave) {
        const savedAttendence = await newAttendence.save();
        res
          .status(200)
          .json({ savedAttendence, message: "Leave Marked Successfully" });
      } else {
        const savedAttendence = await newAttendence.save();
        res
          .status(200)
          .json({ savedAttendence, message: "Attendence Marked Successfully" });
      }
    } catch (err) {
      res.send(err);
    }
  }
};

export const getCurrentUserAttendence = async (req, res, next) => {
  try {
    const CurrentUserAttendence = await Attendence.find({ user: req.user.id });
    console.log("getCurrentUserAttendence " + CurrentUserAttendence);
    res.status(200).json(CurrentUserAttendence);
  } catch (err) {
    res.send(err);
  }
};

export const getAllAttendence = async (req, res, next) => {
  try {
    //const [AllAttendence] = await Attendence.find({ });
    //const att = new Array(AllAttendence);
    // console.log(AllAttendence.createdAt);

    const AllAttendence = await Attendence.find({});
    console.log("All Attendence is " + AllAttendence);

    console.log(AllAttendence._id);
    res.status(200).json(AllAttendence);
  } catch (err) {
    res.send(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const AllUsers = await User.find({}).select(
      "firstname lastname email imageUrl _id"
    );
    console.log(AllUsers);
    //console.log(AllUsers._id)
    res.status(200).json(AllUsers);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
export const adminGetCurrentUserAttendence = async (req, res, next) => {
  try {
    const CurrentUserAttendence = await Attendence.find({
      user: req.params._id,
    }) .populate('user', 'firstname lastname email') // populate the user details
    .select('myAttendence Leave currentDate user');
    console.log("AdminCurrentUserAttendence API is calling ");

    console.log(CurrentUserAttendence);
    res.status(200).json(CurrentUserAttendence);
  } catch (err) {
    res.send(err);
  }
};

export const EditAttendence = async (req, res) => {
  const attendanceId = req.params._id;
  const { myAttendence, Leave } = req.body;
  console.log("myAttendence value is" + myAttendence);
  console.log("Leave value is" + Leave);

  try {
    const attendance = await Attendence.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }

    // Update the attendance fields
    attendance.myAttendence = myAttendence;
    attendance.Leave = Leave;

    // Save the updated attendance
    await attendance.save();

    return res.json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error("Error updating attendance:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating attendance" });
  }
};

export const DeleteAttendence = async (req, res) => {
  const attendanceId = req.params._id;

  try {
    let attendance = await Attendence.findById(attendanceId);
    if (!attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    } else {
      await Attendence.findByIdAndDelete(attendanceId);

      return res.json({ message: "Attendance Deleted successfully" });
    }
  } catch (err) {
    console.error("Error Deleting attendance:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while Deleting attendance" });
  }
};

export const addAttendence = async (req, res) => {
  const userId = req.params._id;
  const { myAttendence, Leave, currentDate } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new attendance document
    const attendance = new Attendence({
      myAttendence,
      Leave,
      currentDate,
      user: userId,
    });

    // Save the new attendance
    await attendance.save();

    return res.json({ message: "Attendance created successfully" });
  } catch (error) {
    console.error("Error creating attendance:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating attendance" });
  }
};

// function parseDate(dateString) {
//   const [day, month, year] = dateString.split('-');

//   let date_ob = new Date(`${month}-${day}-${year}`);
//   let date = date_ob.getDate();
//   let monnth = date_ob.getMonth() + 1;
//   let yearr = date_ob.getFullYear();

//   // prints date & time in DD-MM-YYYY format
//   const newDate = date + "-" + monnth + "-" + yearr;
//   return newDate
// }

function parseDate(dateString) {
  const [year , month , day] = dateString.split("-");

  let date_ob = new Date(`${month}-${day}-${year}`);
  let date = date_ob.getDate().toString().padStart(2, "0");
  let monthFormatted = (date_ob.getMonth() + 1).toString().padStart(2, "0");
  let yearFormatted = date_ob.getFullYear();

  const newDate = `${yearFormatted}-${monthFormatted}-${date}`;
  return newDate;

  // return new Date(year, month - 1, day);
}

// Backend API route
export const AttendenceReport = async (req, res, next) => {
  const { from, to } = req.query;
  const _id = req.params._id;
  // const fromDate = parseDate(from);
  // const toDate = parseDate(to);

  let fromDate = new Date(from);
  let toDate = new Date(to);
  
  fromDate.setUTCHours(fromDate.getUTCHours() + fromDate.getTimezoneOffset() / 60);
 toDate.setUTCHours(toDate.getUTCHours() + toDate.getTimezoneOffset() / 60);
  
  const fromUtc = fromDate.toISOString();
  const toUtc = toDate.toISOString();
  console.log("fromDate is " + fromDate);
  console.log("toDate is " + toDate);
  try {
    const attendanceRecords = await Attendence.find({
      user: _id,
      currentDate: { $gte: fromUtc, $lte: toUtc },
    }).populate("user", "firstname lastname email");

    console.log("attendanceRecords is " + attendanceRecords);

    // Generate the report based on the attendance records
    const convertedRecords = attendanceRecords.map(record => {
      const utcDate = moment.utc(record.currentDate);
      const convertedDate = utcDate.tz('Asia/Karachi');
      record.currentDate = convertedDate.format('YYYY-MM-DD'); // Update the `currentDate` field with the converted value
      return record;
    });
    // console.log("Getting data from Report " + typeof report)
    return res.json(convertedRecords);
  } catch (error) {
    console.error("Error generating report:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while generating the report" });
  }
};




export const AdminAllReport = async (req, res, next) => {
  const { from, to } = req.query;

  // const fromDate = parseDate(from);
  // const toDate = parseDate(to);

 // const fromDate = new Date("2020-03-01");
 let fromDate = new Date(from);
 let toDate = new Date(to);
 
 fromDate.setUTCHours(fromDate.getUTCHours() + fromDate.getTimezoneOffset() / 60);
toDate.setUTCHours(toDate.getUTCHours() + toDate.getTimezoneOffset() / 60);
 
 const fromUtc = fromDate.toISOString();
 const toUtc = toDate.toISOString();
 

  console.log("fromDate is " + fromUtc);
  console.log("toDate is " + toUtc);
  try {
  
    const attendanceRecords = await Attendence.find({
      currentDate: { $gte: fromUtc, $lte: toUtc },
    //  currentDate: { $gte: fromDateTime, $lte: toDateTime },
    })
    .populate('user', 'firstname lastname email').exec();

    console.log("attendanceRecords is " + attendanceRecords +"its type is " +typeof(attendanceRecords));


    const convertedRecords = attendanceRecords.map(record => {
      const utcDate = moment.utc(record.currentDate);
      const convertedDate = utcDate.tz('Asia/Karachi');
      record.currentDate = convertedDate.format('YYYY-MM-DD'); // Update the `currentDate` field with the converted value
      return record;
    });
   
    console.log("attendanceRecords is " + convertedRecords )
    return res.json(convertedRecords);
  } catch (error) {
    console.error("Error generating report:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while generating the report" });
  }
};
//    /api/reports?from=2023-01-01&to=2023-12-31
export const approveLeaves = async (req, res, next) => {
  const _id = req.params._id;

  try {
    // Find the user's leave record
    const leaveRecord = await Attendence.findOne({ _id: _id });

    if (!leaveRecord) {
      return res.status(404).json({ error: "Leave record not found" });
    }

    // Update the leave record to mark it as approved
    leaveRecord.Leave = "Leave Approved";

    // Save the updated record
    await leaveRecord.save();

    return res.status(200).json({ message: "Leave approved successfully" });
  } catch (error) {
    console.error("Error approving leave:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while approving leave" });
  }
};

//app.get('/api/userGrades/:userId', async (req, res) => {
  const convertToTimeZone =(date, timeZone)=> {
    return moment(date).tz(timeZone).format('YYYY-MM-DD');
  }
export const userGrades = async (req, res, next) => {
  const userId = req.params._id;
 
  // const currentDate = new Date().toISOString().slice(0, 10);
  // const month = new Date(currentDate).getMonth() + 1; // Month is zero-based, so we add 1
  // const year = new Date(currentDate).getFullYear();

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const firstDayOfMonth = new Date(year, month - 1, 1).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
const lastDayOfMonth = new Date(year, month, 0).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });



console.log("first day is "+ firstDayOfMonth + "and last day is " + lastDayOfMonth)


  

console.log("month is " + month + "year is " + year )
  try {
    
    const data = await Attendence.find({
      user : userId ,
      currentDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

console.log("data is " + data)



const filteredRecords=[]
    if (data.length === 0) {
      return res.status(200).json({
        leaves: 0,
        presents: 0,
        absents: 0,
        grade: 'F',
        message: "No attendance records found for the user for this month"
      });
    }

    // Calculate the count of leaves, presents, and absents
    let leaves = 0;
    let presents = 0;
    let absents = 0;

    data.forEach((attendance) => {
      if (attendance.myAttendence ) {
        presents++;
      } else if (attendance.myAttendence) {
        absents++;
      }
      if ( attendance.Leave ) {
        leaves++;
      }
    });

    // Determine the grade based on the number of attendance days
    let grade = "F";

    if (presents >= 26) {
      grade = "A";
    } else if (presents >= 21) {
      grade = "B";
    } else if (presents >= 16) {
      grade = "C";
    } else if (presents >= 11) {
      grade = "D";
    }

    return res.status(200).json({
      leaves,
      presents,
      absents,
      grade,
    });
  } catch (error) {
    console.error("Error calculating user grades:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while calculating user grades" });
  }
};
