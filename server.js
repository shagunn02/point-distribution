const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080; // Use dynamic port for Render

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const claimRoutes = require("./routes/claimRoutes");

app.use("/api/users", userRoutes);
app.use("/api", claimRoutes);

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
