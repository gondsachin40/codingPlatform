import problem from '../models/problem.js';
export default async function getAllProblems(req, res) {
    try {
        const result = await problem.find();
        if (!result) {
            return res.status(404).json({ message: 'Problems not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
