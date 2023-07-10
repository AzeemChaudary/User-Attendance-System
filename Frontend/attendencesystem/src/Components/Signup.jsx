import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
const Signup = () => {
    const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    const register = (e) => {
        e.preventDefault();    
        if (!firstname ||!lastname ||!email ||!password ||!confirmPassword ) {
          return toast.error("Please fill all fields");
        }
        else if (!validateEmail(email)) {
            return toast.error("Please enter valid email");
          } else if (password !== confirmPassword) {
            return toast.error("Password should be same as confirm password");
          }
    
        console.log("Register in Second Page");
        axios
          .post("http://localhost:8000/api/auth/register", {
            firstname,
            lastname,
            email,
            password,
            
          })
          .then(function (response) {
            console.log(response);
            const data = response.data;
            if (data.status == 201) {
              toast.success(data.message);
              console.log("Registered successfully");
            } else {
              toast.error(data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
            toast.error(error);
          });
      };
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
                            Sign up
                          </p>

                          <form className="mx-1 mx-md-4"  onSubmit={register}>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example1c"
                                  className="form-control"
                                  value={firstname}
                                  onChange={(e) => {
                                    setFirstname(e.target.value);
                                  }}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1c"
                                >
                                  First Name
                                </label>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example1c"
                                  className="form-control"
                                  value={lastname
                                  }
                                  onChange={(e) => {
                                    setLastName(e.target.value);
                                  }}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1c"
                                >
                                  Last Name
                                </label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="email"
                                  id="form3Example3c"
                                  className="form-control"
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example3c"
                                >
                                  Your Email
                                </label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="form3Example4c"
                                  className="form-control"
                                  value={password}
                                  onChange={(e) => {
                                    setPassword(e.target.value);
                                  }}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example4c"
                                >
                                  Password
                                </label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="form3Example4cd"
                                  className="form-control"
                                  value={confirmPassword}
                                  onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                  }}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example4cd"
                                >
                                  Confirm your password
                                </label>
                              </div>
                            </div>

                            

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="submit"  className="btn btn-primary btn-lg">
Register
                              </button>
                            </div>
                            <Link to='/Login'>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
Already have an Account ? Click Here to Login
                            </div>
                            </Link>
                            
                              
                            
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

export default Signup
