const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8000;


app.use(cors());
app.use(express.json());


const userRoutes = require("./routes/userRoutes");
const claimRoutes = require("./routes/claimRoutes");

app.use("/api/users", userRoutes); 
app.use("/api", claimRoutes); 


mongoose
  .connect("mongodb://127.0.0.1:27017/pointsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB error:", err.message));


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
