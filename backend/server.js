import express from "express"
import cors from "cors"
import 'dotenv/config'
import bookRoute from "./src/routes/book.route.js"
import userRoute from "./src/routes/user.route.js"
import orderRoute from "./src/routes/order.route.js"
import roleRoute from "./src/routes/role.route.js"
import logger, { log } from "./src/middleware/logger.js"
import reviewRouter from "./src/routes/review.route.js"
import addressRoute from "./src/routes/address.route.js"
import { errorHandler, notFound } from "./src/middleware/errorHandler.js"

const app = express()
const port = process.env.PORT

// Enable CORS for all routes and origins
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://192.168.0.126:5173'],
}));

// Enable json serialization
app.use(express.json());

app.use(logger)

app.use('/api/users', userRoute)
app.use('/api/books', bookRoute)
app.use('/api/orders', orderRoute)
app.use('/api/roles', roleRoute)
app.use('/api/reviews', reviewRouter)
app.use('/api/address', addressRoute)

// 404 handler for undefined routes
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  log.startup(`Server is running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
  log.info(`📱 Frontend URL: http://localhost:5173`);
  log.info(`🌐 Backend URL: http://localhost:${port}`);
  log.info(`📁 API Base: http://localhost:${port}/api`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  log.errorDetails(error, 'Uncaught Exception');
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  log.errorDetails(new Error(reason), 'Unhandled Promise Rejection');
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  log.info('🛑 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  log.info('🛑 SIGINT received. Shutting down gracefully...');
  process.exit(0);
});