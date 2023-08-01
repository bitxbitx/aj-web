// Import dependencies
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/error.middleware");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const serveSwaggerDocs = require("./utils/swagger");
const responseTime = require("response-time");
const { startMetricsServer,restResponseTimeHistogram } = require("./utils/metrics");
const logger = require("./utils/logger");

// Set up the port
const port = process.env.PORT || 8000;

// Initialize Express app
const app = express();

// Middleware for capturing response time metrics
app.use(
  responseTime((req, res, time) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

// Logging middleware
app.use(morgan("dev"));

// Cookie Parser middleware
app.use(cookieParser());

// CORS middleware to handle Cross-Origin Resource Sharing
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  "https://saf-web-client.vercel.app",
  "https://safwebserver.online",
]; // add any other origins that you want to allow

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true, // enable passing cookies from the client to the server
  })
);

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error Handler middleware
app.use(errorHandler);

// Swagger setup
serveSwaggerDocs(app, port);

// API routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/notes", require("./routes/note.routes"));
app.use("/api/accounts", require("./routes/account.routes"));
app.use("/api/transactions", require("./routes/transaction.routes"));

// Serve static assets if in production
// TODO: think if I can make this better
app.get("/file/assets/:fileName", function (req, res) {
  const filePath = path.join(__dirname, "uploads/assets", req.params.fileName);
  res.sendFile(filePath);
});

app.get("/file/notes/:fileName", function (req, res) {
  const filePath = path.join(__dirname, "uploads/notes", req.params.fileName);
  res.sendFile(filePath);
});

// Error Handler middleware (again, in case of unhandled errors during routing)
app.use(errorHandler);

// Start the server
const server = app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  // Connect to the database
  await connectDB();

  // Start metrics server
  startMetricsServer();
});

module.exports = app;
