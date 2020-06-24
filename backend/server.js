import express from "express";
import data from "./data";
import { MONGODB_URL } from "./config";
import userRoute from "./routes/userRoute";
import mongoose from "mongoose";
import bodyParser from "body-parser";
/*****************MONGODB**********************/
/**********************************************/
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected …");
  })
  .catch((error) => console.log(error));
/**********************************************/
/**********************************************/
const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/:id", (req, res) => {
  let id = req.params.id;
  const product = data.products.find((x) => x._id === id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});
app.listen(5000, () => {
  console.log("server start");
});
