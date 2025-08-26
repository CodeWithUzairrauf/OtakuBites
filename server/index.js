const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS Options
const corsOptions = {
    origin: 'http://localhost:5173',
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
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ✅ Start Server
const PORT = process.env.PORT || 8576;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));