import User from "../../models/userSchema.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists in the database" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password should be the same" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    console.log("Register error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
