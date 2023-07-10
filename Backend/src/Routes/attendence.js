import express from "express";
import {
  setAttendence,
  getCurrentUserAttendence,
  getAllAttendence,
  getAllUsers,
  //Below are all for admin 
  adminGetCurrentUserAttendence,
  EditAttendence,
  addAttendence,
  DeleteAttendence,
  AttendenceReport,
  AdminAllReport ,
  approveLeaves ,
  userGrades
} from "../Controllers/attendence.js";

const router = express.Router();

router.get("/all", getAllAttendence);

router.post("/", setAttendence);
router.get("/myAttendence", getCurrentUserAttendence);

//router.put("/:taskId", updateTask);

//For Admin
router.get("/getAllUsers", getAllUsers);
router.get('/adminGetCurrentUserAttendence/:_id',adminGetCurrentUserAttendence);
router.put("/EditAttendance/:_id", EditAttendence);
router.post("/addAttendence/:_id", addAttendence);
router.delete("/DeleteAttendence/:_id", DeleteAttendence);
router.get("/AttendenceReport/:_id", AttendenceReport);
router.get('/AdminAllReport' , AdminAllReport);
router.put('/approveLeaves/:_id' , approveLeaves);
router.get('/userGrades/:_id' , userGrades);
//router.delete('/deleteAll', deleteAllTasks);

//router.delete('/:taskId', deleteTask);

export default router;
