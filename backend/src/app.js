import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import route from '../src/Routes/route.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration - supports multiple origins for development and production
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
    : [
        'https://think-board-lsdj.vercel.app',
        'http://localhost:5173',
        'http://localhost:3000',
    ];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use('/api/notes', route);

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {        
    res.send('This is a todo app using MERN stack');
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server Running on PORT : ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}).catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});

