import { Router } from "express";
import { getShippingMethods } from "../controllers/order.controller.js";

const orderRoute = Router();

orderRoute.get('/shipping-methods', getShippingMethods);

export default orderRoute;