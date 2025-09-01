const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.disable('etag');

// ✅ CORS Options
const corsOptions = {
    origin: ['https://otaku-bites.vercel.app', 'http://localhost:5173', 'https://otaku-bites-sandy.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ Recipe Routes
const recipeRoutes = require("./routes/recipeRoutes");
app.use("/api/recipes", recipeRoutes);

// ✅ Community Routes
const communityRoutes = require("./routes/communityRoutes");
app.use("/api/communities", communityRoutes);

// ✅ Post Routes
const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);

// ✅ Comment Routes

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/posts", commentRoutes);
// ✅ Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// ✅ MongoDB Connection
console.log("Attempting to connect to MongoDB...");
console.log("MONGO_URI is set: ", !!process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Make sure MONGO_URI is correctly set in Vercel environment variables and MongoDB Atlas allows connections from all IPs (0.0.0.0/0).');
  });

// ✅ Start Server
const PORT = process.env.PORT || 8576;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));