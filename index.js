const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const authroute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

const PORT = 5000 || process.env.PORT;

mongoose
  .connect(
    "mongodb+srv://abhishek:1511Neymar!@cluster0.jxvmi.mongodb.net/ecommerce?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => console.log(e));

app.use(cors());
app.use(express.json());
app.use("/auth", authroute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/checkout", stripeRoute);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}
app.listen(PORT, () => {
  console.log("server is up");
});
