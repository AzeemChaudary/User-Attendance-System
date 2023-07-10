import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import profilePic from './profileImage.png';
import Attendence from "./Attendence.jsx" ;
import AdminHome from './AdminHome.jsx'
const Home = () => {
  const [firstname , setFirstName] =useState('');
  const [lastname , setLastName] =useState('');
  const [email , setEmail] =useState('');
  const [AttendencePage, setAttendencePage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
const [myAttendence , setMyAttendence]= useState([])
const [userRole , setUserRole] = useState('')
  const navigate = useNavigate();
  let {id} = useParams();
  console.log("userId in HomePage " + id)
  const token = document.cookie.split("; ").find((row) => row.startsWith("access_token="))
  .split("=")[1];

  const getUserInfo = async ()=>{
    await axios.get('http://localhost:8000/api/users/me/info/' , {
      headers: {
        Authorization: `${token}`, // Include the token in the Authorization header
      } }).then((response) => {
        console.log("userinfo " + response)
        let responsedata= JSON.stringify(response)
        console.log("userinfo " + responsedata);
        let parsedata=JSON.parse(responsedata);
        console.log("firstname is", parsedata.data.data.firstname);

        setFirstName(parsedata.data.data.firstname)
        setLastName(parsedata.data.data.lastname)
        setEmail(parsedata.data.data.email)
        setImageUrl(parsedata.data.data.imageUrl)
        setUserRole(parsedata.data.data.role)
        console.log("Imageurl iss " + imageUrl)
       
     
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      })
      
  }
  const MarkAttendence = async (e) => {
    e.preventDefault();
    console.log("MarkAttendence");
    // const cookies = parse(document.cookie);

    
    //const token = cookies.access_token;
    console.log("mytoken is " + token);
 await axios.post("http://localhost:8000/api/attendence/",
        {
          myAttendence: "present",
        },
        {
          // req.cookies.access_token
          headers: {
            Authorization: `${token}`, // Include the token in the Authorization header
          },
        }
      ).then((response) => {
        console.log(response);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      })
      
  };
  const Logout = async (e) => {
    e.preventDefault();
    let res = await axios.get("http://localhost:8000/api/auth/logout");
    console.log(res);
    console.log("MarkLeave");
    navigate("/Login");
  };

  const ViewAttendence = async(e) => {
    e.preventDefault(); 
// 
await axios.get(
  "http://localhost:8000/api/attendence//myAttendence",
  {
    // req.cookies.access_token
    headers: {
      Authorization: `${token}`, // Include the token in the Authorization header
    },
  }
)
.then((response) => {
  console.log(response.data);
  setMyAttendence(response.data)
  setAttendencePage(true)
  toast.success(response.data.message);
})
.catch((error) => {
  console.log(error);
  toast.error(error);
});
    console.log("ViewAttendence");
    
  };
  const MarkLeave = async(e) => {
    e.preventDefault();
    console.log("MarkLeave");
    await axios
    .post(
      "http://localhost:8000/api/attendence/",
      {
        Leave: "Leave",
      },
      {
        // req.cookies.access_token
        headers: {
          Authorization: `${token}`, // Include the token in the Authorization header
        },
      }
    )
    .then(function (response) {
      console.log(response);
      toast.success(response.data.message);
    })
    .catch(function (error) {
      console.log(error);
      toast.error(error);
    });
  };
  const handleUploadImage = async(e)=>{
    e.preventDefault()
    if(imageFile){
      console.log("uploadpic API CALLING")
   
    console.log("imageFile is " + imageFile)

      await axios.post(`http://localhost:8000/api/users/uploadPic`,
      {
        userImage  : imageFile
      },
      {
        // req.cookies.access_token
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data' // Include the token in the Authorization header
        },
      }).then(response => {
        // Handle the response from the API
        // For example, check if the upload was successful or handle any errors
        console.log('Image uploaded successfully');
      })
      .catch(error => {
        // Handle any errors that occurred during the API call
        console.error('Error uploading image:', error);
      });

    }
  }
  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
  

      setImageFile(file);
  
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDeleteImage = async (e)=>{
    e.preventDefault();
    console.log("handleDeleteImage")
    await axios.delete('http://localhost:8000/api/users/deletePic' , {
      // req.cookies.access_token
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'multipart/form-data' // Include the token in the Authorization header
      },
    }).then(response => {
     
      console.log('Image Deleted successfully');
    })
    .catch(error => {
      // Handle any errors that occurred during the API call
      console.error('Error Deleting image:', error);
    });
  }
  
  useEffect (()=>{ 
    getUserInfo()

  } , [])
 if(AttendencePage) return (
      <>
    <Attendence value={myAttendence}/>
    </> )
    else if(userRole =='admin') 
    return(<>
    <AdminHome />
    </>)
    else{
  return (
    <>
    <div>
      <div>
      <div>
      {firstname }
      </div>
      <div>
      {lastname }
      </div>
      <div>
      {email }
      </div>
      </div>
      <form encType="multipart/form-data">
      <div className="text-center">
    <div className="image-container">
      <label htmlFor="fileInput">
        <img src={imageUrl || profilePic} className="rounded rounded-circle shadow-4-strong" alt={profilePic} />
      </label>
    </div>
    <input type="file" id="fileInput" name="userImage" style={{ display: 'none' }} onChange={handleFileInputChange} />
    
    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" onClick={handleUploadImage} className="btn btn-primary btn-lg">
            Save Image
            </button>
          </div>
 
  </div>
  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" onClick={handleDeleteImage} className="btn btn-primary btn-lg">
            Delete Image
            </button>
          </div>
  </form>
    </div>
      <div>
        <form className="mx-1 mx-md-4" onSubmit={MarkAttendence}>
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Mark Attendence
            </button>
          </div>
        </form>
      </div>
      <div>
        <form className="mx-1 mx-md-4" onSubmit={MarkLeave}>
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Mark Leave
            </button>
          </div>
        </form>
      </div>
      <div>
        <form className="mx-1 mx-md-4" onSubmit={ViewAttendence}>
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn btn-primary btn-lg">
              View Attendence
            </button>
          </div>
        </form>
      </div>
      <div>
        <form className="mx-1 mx-md-4" onSubmit={Logout}>
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Logout
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
}
export default Home;
