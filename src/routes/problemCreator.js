import express from 'express';
import problemCreator from '../controllers/problemCreator.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import getproblemById from '../controllers/getproblemById.js';
import getAllProblems from '../controllers/getAllProblems.js';
const problem = express.Router();
problem.post('/create', adminMiddleware, problemCreator);
problem.get('/:id', getproblemById);
problem.get('/', getAllProblems);
// problem.get('/user',)
export default problem;