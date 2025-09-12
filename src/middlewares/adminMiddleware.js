import jwt from "jsonwebtoken";
import user from "../models/user.js";
async function adminMiddle(req, res, next) {
    try {
        console.log('Middleware executed');
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = payload;
        if (!_id) {
            return res.status(401).send('Invalid token.');
        }
        const result = await user.findById(_id);
        if (!result) {
            return res.status(401).send('admin not found.');
        }
        if (result.role !== 'admin') {
            return res.status(403).send('Access denied. Admins only.');
        }
        req.user = result;
        next();
    } catch (err) {
        res.status(500).send('Error in middleware: ' + err.message);
    }
}
export default adminMiddle;