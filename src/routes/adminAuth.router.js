import express from 'express';
import adminMiddle from '../middlewares/adminMiddleware.js';
import register from '../controllers/adminregister.js';
const admin = express.Router();
admin.post('/register', adminMiddle, register);
export default admin;