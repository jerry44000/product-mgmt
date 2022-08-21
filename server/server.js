require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const app = express();

// // Extended : https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "Product API",
//       description: "Product API Information",
//       contact: {
//         name: "Shai",
//       },
//       servers: ["http://localhost:4000"],
//     }
//   },
//   apis: ["./server/routes/*.js"]
// };

// const swaggerDocs = swaggerJsdoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to MongoDB Database
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // Start server
    app.listen(process.env.PORT, () =>
      console.log(
        `Listening on port : ${process.env.PORT} & connected to MongoDB`
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// Routes Products
app.use("/api/products", productRoutes);
// Routes Users
app.use("/api/users", userRoutes);
