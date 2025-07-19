import { Router } from "express";
import { getOrderHistory, placeOrder, placeOrderStripe, verifyStripe } from "../controllers/order.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { validateStockQuantity } from "../middleware/vaildatorBook.js";

const orderRoute = Router();

orderRoute.post('/place-order', authUser, validateStockQuantity, placeOrder);
orderRoute.post('/place-order-stripe', authUser, validateStockQuantity, placeOrderStripe);
orderRoute.post('/verify-payment', authUser, verifyStripe);
orderRoute.get('/history', authUser, getOrderHistory);

export default orderRoute;