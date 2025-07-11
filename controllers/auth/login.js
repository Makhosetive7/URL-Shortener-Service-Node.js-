import user from "../../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = "WebTokenSecret1234567"

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userAvailability = await user.findOne({ email });
    if (!userAvailability) {
      return res.status(404).json({ message: "User not found in the database" });
    }

    const isPasswordValid = await bcrypt.compare(password, userAvailability.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Sign JWT token
    const token = jwt.sign(
      { id: userAvailability._id, email: userAvailability.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. Return success response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: userAvailability._id,
        email: userAvailability.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
