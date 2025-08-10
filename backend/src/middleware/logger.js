import fs from 'fs';
import path from 'path';
import * as winston from 'winston';

// Ensure logs directory exists
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Custom console format for better readability
const consoleFormat = winston.format.printf(({ timestamp, level, message }) => {
  if (typeof message === 'object') {
    const { method, url, status, duration, ip } = message;
    
    // Color codes for different HTTP methods
    const methodColors = {
      GET: '\x1b[32m',    // Green
      POST: '\x1b[33m',   // Yellow
      PUT: '\x1b[34m',    // Blue
      PATCH: '\x1b[35m',  // Magenta
      DELETE: '\x1b[31m', // Red
      OPTIONS: '\x1b[36m' // Cyan
    };
    
    // Color codes for different status codes
    const statusColors = {
      2: '\x1b[32m', // 2xx - Green
      3: '\x1b[36m', // 3xx - Cyan
      4: '\x1b[33m', // 4xx - Yellow
      5: '\x1b[31m'  // 5xx - Red
    };
    
    const reset = '\x1b[0m';
    const bold = '\x1b[1m';
    const dim = '\x1b[2m';
    
    const methodColor = methodColors[method] || '\x1b[37m'; // Default white
    const statusColor = statusColors[Math.floor(status / 100)] || '\x1b[37m';
    
    const time = new Date(timestamp).toLocaleTimeString();
    const clientIP = ip.includes('::1') ? 'localhost' : ip.split(',')[0];
    
    return `${dim}[${time}]${reset} ${methodColor}${bold}${method.padEnd(6)}${reset} ${statusColor}${status}${reset} ${bold}${url}${reset} ${dim}${duration}ms${reset} ${dim}(${clientIP})${reset}`;
  }
  
  return `${timestamp} ${level}: ${message}`;
});

const loggerInstance = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'server.log'), maxsize: 10485760, maxFiles: 5 }),
    new winston.transports.Console({ 
      format: winston.format.combine(
        winston.format.timestamp(),
        consoleFormat
      )
    })
  ]
});

export default function logger(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      timestamp: new Date(start).toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      duration,
      userAgent: req.headers['user-agent']
    };
    
    loggerInstance.info(logData);
  });
  
  next();
}

// Export additional logging functions for use in other parts of the application
export const log = {
  info: (message, meta = {}) => loggerInstance.info(message, meta),
  warn: (message, meta = {}) => loggerInstance.warn(message, meta),
  error: (message, meta = {}) => loggerInstance.error(message, meta),
  debug: (message, meta = {}) => loggerInstance.debug(message, meta),
  
  // Special function for server startup
  startup: (message) => {
    const border = '='.repeat(60);
    const reset = '\x1b[0m';
    const green = '\x1b[32m';
    const bold = '\x1b[1m';
    
    console.log(`\n${green}${bold}${border}${reset}`);
    console.log(`${green}${bold}🚀 ${message}${reset}`);
    console.log(`${green}${bold}${border}${reset}\n`);
  },
  
  // Special function for errors
  errorDetails: (error, context = '') => {
    const red = '\x1b[31m';
    const yellow = '\x1b[33m';
    const reset = '\x1b[0m';
    const bold = '\x1b[1m';
    
    console.log(`\n${red}${bold}❌ ERROR${context ? ` in ${context}` : ''}:${reset}`);
    console.log(`${red}${error.message}${reset}`);
    if (error.stack) {
      console.log(`${yellow}Stack trace:${reset}`);
      console.log(error.stack);
    }
    console.log('');
  }
};