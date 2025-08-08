import { Router } from "express";
import { getNumberOfOrders, getOrderHistory, placeOrder, placeOrderStripe, verifyStripe, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } from "../controllers/order.controller.js";
import { authUser, authorize } from "../middleware/auth.middleware.js";
import { validateStockQuantity } from "../middleware/vaildatorBook.js";

const orderRoute = Router();

orderRoute.post('/place-order', authUser, validateStockQuantity, placeOrder);
orderRoute.post('/place-order-stripe', authUser, validateStockQuantity, placeOrderStripe);
orderRoute.post('/verify-payment', authUser, verifyStripe);
orderRoute.get('/history', authUser, getOrderHistory);
orderRoute.get('/number', getNumberOfOrders)

// Admin routes
orderRoute.get('/', authUser, authorize('select.order'), getAllOrders);
orderRoute.get('/:id', authUser, authorize('select.order'), getOrderById);
orderRoute.patch('/:id', authUser, authorize('update.order'), updateOrderStatus);
orderRoute.delete('/:id', authUser, authorize('delete.order'), deleteOrder);

export default orderRoute;