import express from "express";
import {register , login, logout, isLoggedIn } from "../Controllers/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/logout", logout);

router.get('/is_logged_in', isLoggedIn);

export default router;