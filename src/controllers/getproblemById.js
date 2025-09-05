import problem from '../models/problem.js';
export default async function getproblemById(req, res) {
    const { id } = req.params;
    try {
        const result = await problem.findById(id);
        if (!result) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
