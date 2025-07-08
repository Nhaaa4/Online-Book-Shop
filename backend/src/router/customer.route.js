import { Router } from "express";
import { login } from "../controller/customer.controller.js";

const customerRoute = Router()

customerRoute.post('/', login)

export default customerRoute