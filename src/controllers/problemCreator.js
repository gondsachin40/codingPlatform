// Import the Problem model
import problem from "../models/problem.js";

export default async function problemCreator(req, res) {
    try {
        const data = req.body;
        const newProblem = new problem(data);
        const savedProblem = await newProblem.save();
        res.status(201).json({
            message: "Problem created successfully",
            problem: savedProblem,
        });
    } catch (err) {
        res.status(500).json({ error: "Error: " + err.message });
    }
}
