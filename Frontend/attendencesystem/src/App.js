import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Toaster from 'react-hot-toast'
import Home from './Components/Home';
import Attendence from './Components/Attendence';
import AdminHome from './Components/AdminHome';
import AllUsersReport from './Components/AllUsersReport';
import ViewAttendance from './Components/ViewAttendance';
import UserReport from './Components/UserReport';
function App() {
  return (
    
    <BrowserRouter>
     <Toaster
  position="top-right"
  reverseOrder={false}
/>
     <Routes>
      <Route path="/" element={<Signup/>} /> 
      <Route path='/Login' element={<Login/>} />
      <Route path="/Home/:id" element={<Home/>} /> 
      <Route path="/Attendence" element={<Attendence/>} /> 
<Route path='/AdminHome' element={<AdminHome />} />
<Route path='/AdminHome/AllUsersReport' element={<AllUsersReport />} />
<Route path='/AdminHome/ViewAttendance/:_id' element={<ViewAttendance />}/>
<Route path='/AdminHome/ViewAttendance/:_id/Report' element={<UserReport/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
