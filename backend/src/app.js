// 1. Import dependencies (always at the top)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import route from '../src/Routes/route.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173"
}))
app.use(rateLimiter)
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', route);

app.get('/', (req, res) => {        
    res.send('This is a todo app using MERN stack');
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The Server Running on PORT : ${PORT}`);
    });
});

