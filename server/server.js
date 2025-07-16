require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http'); // Core Node module
const { Server } = require('socket.io'); // ✅ Correct import

const roomRoutes = require('./src/routes/roomRoutes');

const app = express(); // Express app

// Middleware
app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
};
app.use(cors(corsOptions));

// DB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((error) => console.log('❌ MongoDB Connection Failed:', error));

// Create HTTP server
const server = http.createServer(app);

// Setup socket.io server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
  }
});

// Socket.io Events
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on('join-room', (roomCode) => {
    socket.join(roomCode);
    console.log(`🚪 User joined room: ${roomCode}`);
  });

  socket.on('disconnect', () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

app.set('io', io); // Make io accessible in other parts of the app

// Routes
app.use('/room', roomRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, (error) => {
  if (error) {
    console.log('❌ Server failed to start:', error);
  } else {
    console.log(`🚀 Server running on port ${PORT}`);
  }
});
