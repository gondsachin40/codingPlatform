import user from "../models/user.js";
import bcrypt from "bcrypt";

export default async function register(req, res) {
    try {
        console.log(req.body);
        const { firstName, email, password } = req.body;
        console.log(req.body);
        console.log(
            "Registering admin with details:",
        )

        if (!firstName || typeof firstName !== "string" || firstName.trim().length < 2) {
            return res.status(400).send("First name is required and must be at least 2 characters.");
        }

        if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
            return res.status(400).send("Valid email is required.");
        }

        if (!password || typeof password !== "string" || password.length <= 4) {
            return res.status(400).send("Password must be more than 4 characters.");
        }

        const existingUser = await user.findOne({ email });
        console.log(email)
        if (existingUser) {
            return res.status(400).send("Email already registered.");
        }
        req.body.role = "admin";
        req.body.password = await bcrypt.hash(password, 10);

        const newUser = new user(req.body);
        await newUser.save();

        res.status(201).send("admin Registered successfully");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}
