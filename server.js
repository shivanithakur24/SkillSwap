const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files
app.use('/uploads', express.static('uploads')); // <-- ✅ Add this line here

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/upload', uploadRoutes);

// ✅ Socket Chat Events
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// ✅ MongoDB + Server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    server.listen(process.env.PORT || 5000, () => {
      console.log('Server is running');
    });
  })
  .catch((err) => console.error(err));
