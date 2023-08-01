const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../package.json");
const log = require("./logger");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AJ API",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Global security definition for all endpoints
      },
    ],
    basePath: "/api", // Add the /api prefix to all endpoints
  },
  apis: [
    // Use path.resolve() to get the absolute path for API endpoints
    path.resolve(__dirname, "../controllers/**/*.js"),
    path.resolve(__dirname, "../routes/**/*.js"),
    path.resolve(__dirname, "../models/**/*.js"),
  ],
};


const swaggerSpec = swaggerJsdoc(options);

const serveSwaggerDocs = (app, port) => {
  // Serve the Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve the Swagger JSON in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Swagger documentation available at http://localhost:${port}/docs`);
};

module.exports = serveSwaggerDocs;
