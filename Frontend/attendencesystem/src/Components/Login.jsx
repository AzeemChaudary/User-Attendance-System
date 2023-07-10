import React, { useState} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { serialize, parse } from 'cookie';
import { useParams } from "react-router-dom";


const Login = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const login= async(e)=>{
        e.preventDefault()
         await  axios.post("http://localhost:8000/api/auth/login", {
            email,
            password
          }).then((res)=>{
            console.log(res)
            console.log(res.data.token)
  let id =res.data.user._id;
  console.log("UserId in Login Page "  + res.data.user._id)
            const token = res.data.token;
  const options = {
    path: '/', // Set the cookie path
  expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) 
  };
  document.cookie = serialize('access_token',token, options);
            navigate(`/Home/${id}`);
          }).catch((err)=>{
            console.log("You are having an error " + err)
          })
         

    }        
  return (
    <>
    <div>
          <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                  <div
                    className="card text-black"
                    style={{ borderRadius: "25px" }}
                  >
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                            Login
                          </p>

                          <form className="mx-1 mx-md-4"  onSubmit={login}>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="email"
                                  id="form3Example1c"
                                  className="form-control"
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1c"
                                >
                                  Email
                                </label>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="form3Example1c"
                                  className="form-control"
                                  value={password
                                  }
                                  onChange={(e) => {
                                    setPassword(e.target.value);
                                  }}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1c"
                                >
                                  Password
                                </label>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="submit"  className="btn btn-primary btn-lg">
Login
                              </button>
                            </div> 
                          </form>
                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            className="img-fluid"
                            alt="Sample image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
    </>
  )
}

export default Login
