import express from 'express';
import connectDB from './src/config/database.js';
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/userAuth.router.js';
import admin from './src/routes/adminAuth.router.js';
import profile from './src/controllers/profile.js';
import problem from './src/routes/problemCreator.js';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/profile', profile);
app.use('/admin', admin);
app.use('/problem', problem);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
connectDB().then(async () => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
});
