import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;
import connectDB from './config/db';

// ... rest of your code

// Connect DB before starting server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running → http://localhost:${PORT}`);
    // ...
  });
});


app.use(cors());                // Allow frontend (React Native) to connect
app.use(express.json());        // Parse JSON bodies

// Simple health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'FarmDirect Backend is alive and ready for farmers & customers! 🌽🛒',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root route for quick test
app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to FarmDirect Backend</h1><p>API is running. Try /health</p>');
});

app.listen(PORT, () => {
  console.log(`🚀 FarmDirect Backend server running on http://localhost:${PORT}`);
  console.log(`Test it: http://localhost:${PORT}/health`);
});