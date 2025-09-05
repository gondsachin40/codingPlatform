import user from "../models/user.js"
export default async function profile(req, res) {
    const { firstName } = req.params;
    const User = await user.findOne({ firstName });
    if (!User) {
        return res.status(404).send('User not found');
    }
    return res.status(200).json(User);
}