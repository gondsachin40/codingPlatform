import user from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export default async function login(req, res) {
    console.log('hello')
    try {
        const { email, password } = req.body;
        console.log(email, password)
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const User = await user.findOne({ email });
        console.log(User)
        if (!User) {
            return res.status(401).send('Invalid credentials');
        }
        const match = await bcrypt.compare(password, User.password);
        if (!match) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ _id: User._id, email: email, role: user.role }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
        res.status(200).send('login successfully');
    } catch (err) {
        res.status(500).send('Error' + err.message);
    }
}
