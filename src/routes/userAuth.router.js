import express from 'express';
import register from '../controllers/register.js';
import login from '../controllers/login.js';
import profile from '../controllers/profile.js';
import middle from '../middlewares/middleware.js';
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.get('/hello', (req, res) => {
    res.send('Hello World');
});
authRouter.post('/login', login);
authRouter.get('/profile/:firstName', middle, profile);
export default authRouter;