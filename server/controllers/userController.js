import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(420).json({ error: "Please provide email and password" });
    }
    try {
        const userValid = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (!userValid) {
            return res.status(421).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, userValid.password);
        if (!isMatch) {
            return res.status(422).json({ error: "Password is incorrect" });
        }
        const { active } = userValid;
        if (!active) {
            return res.status(423).json({ success: false, message: "This account has been suspended! Try to contact the admin" });
        }
        // Token generation
        const token = await userValid.generateAuthToken();
        // Cookie generation
        res.cookie("usercookie", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiry
            httpOnly: true
        });
        const result = {
            user: userValid,
            token
        };
        res.status(200).json({ status: 200, result });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export {
    login
}