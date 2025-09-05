import express from 'express';
import admineMiddle from '../middlewares/adminMiddleware.js';
import register from '../controllers/adminregister.js';
const admin = express.Router();
admin.post('/register', admineMiddle, register);
export default admin;