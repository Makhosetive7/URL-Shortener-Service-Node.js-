import express from "express";

import { register } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);

export default authRoute;
