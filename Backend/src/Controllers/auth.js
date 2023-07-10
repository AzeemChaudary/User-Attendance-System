import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
const JWT_SECRET = "SECRET";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


export const register = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  User.findOne({ email: email }).then(async (user) => {
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    } else if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "Please submit all required fields!" });
    } else if (!validateEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid email" });
    } else {
      try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json("New User Created");
      } catch (err) {
        return res.send(err);
      }
    }
  });
};
export const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "firstname lastname email password role"
    );
    console.log(user);
    //console.log(user?.role);
    if (!user) {
      return res.status(404).send({ message: "User not found with the email" });
    } else {
      const isPasswordCorrect = await bcryptjs.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect){
        res.status(400).send({ message: "Password is incorrect" })}
        
const payload={
  id:user.id ,
  firstname :user.firstname ,
  lastname : user.lastname ,
  email : user.email , 
  role : user.role
}


      const token = jwt.sign(payload , JWT_SECRET, {
        expiresIn: "15d",
      });
      console.log("token is " + token);

      res.cookie("access_token", token, {
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      });

      return res.status(200).json({ token, user, message: "login success" });
    }
  } catch (err) {
    return err;
  }
};

export const logout = async (req, res) => {
  console.log("Logout API");
  res.clearCookie("access_token");
  res.status(200).json({ message: "logout success" });
};

export const isLoggedIn = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.json(false);
    }
    return res.json(true);
  });
};
