const express = require("express");
const connectDatabase = require("./config");
const workOutRoute = require("./routes/workOutRoute");
const userRoute =require("./routes/userRoute")
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
connectDatabase();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to Mern Stack");
});

app.use("/workouts", workOutRoute);
app.use("/user", userRoute);
app.listen(5555, () => {
  console.log(`App is listening to port 5555`);
});
