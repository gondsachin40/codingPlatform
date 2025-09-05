import jwt from "jsonwebtoken";
import user from "../models/user.js";
async function middle(req, res, next) {
    try {
        console.log('Middleware executed');
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload)
        const { _id } = payload;
        console.log(_id);
        if (!_id) {
            return res.status(401).send('Invalid token.');
        }
        const result = await user.findById(_id);
        if (!result) {
            return res.status(401).send('User not found.');
        }
        next();
    } catch (err) {
        res.status(500).send('Error in middleware: ' + err.message);
    }
}
export default middle;