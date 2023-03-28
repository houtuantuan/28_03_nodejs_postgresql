const express = require("express");
const app = express();
const router = require("./router")
const routerOrders = require("./routerOrders")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.send("Hello World! This is a test.");
});

app.use("/users",router);
app.use("/orders",routerOrders);

module.exports=app;


