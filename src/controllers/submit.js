import fetch from 'node-fetch';
import problem from '../models/problem.js';
export default async function submit(req, res) {
    try {
        const { id, source_code } = req.body;
        const userId = req.user._id;
        if (!id) {
            return res.status(400).json({ message: 'Problem ID is required' });
        }
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        if (!source_code) {
            return res.status(400).json({ message: 'Source code is required' });
        }
        const question = await problem.findById(id);
        if (!question) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        const testCases = [];
        for (let i = 0; i < question.visibleTestCases.length; i++) {
            let input = question.visibleTestCases[i].input;
            let output = question.visibleTestCases[i].output;
            testCases.push({ input, output });
        }
        for (let i = 0; i < question.hiddenTestCases.length; i++) {
            let input = question.hiddenTestCases[i].input;
            let output = question.hiddenTestCases[i].output;
            testCases.push({ input, output });
        }
        const language_id = 52;
        const submissions = [];
        for (let i = 0; i < testCases.length; i++) {
            const curr = {
                "language_id": language_id,
                "source_code": source_code,
                "stdin": testCases[i].input,
                "expected_output": testCases[i].output
            }
            submissions.push(curr);
        }
        const headers = {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'c616ef5a66msh4d390d4f6a82903p1f9ef3jsn1fd7d34bcb0c',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        };
        const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=false&wait=true', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ submissions })
        });
        const tokens = await response.json();
        const batch = {
            tokens: tokens
        };
        const existingSubmission = question.submissions.find(sub =>
            sub.userId.toString() === userId
        );

        if (existingSubmission) {
            existingSubmission.batches.push(batch);
        } else {
            question.submissions.push({
                userId,
                batches: [batch]
            });
        }
        await question.save();
        res.json({ question });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}
