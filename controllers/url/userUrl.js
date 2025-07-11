import Url from "../../models/urlSchema.js";

export const getUserUrl = async (req, res) => {
  try {
    const userId = req.user._id;

    const urls = await Url.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).jsom({
      message: "User URLs fetched successfully",
      total: urls.length,
      urls,
    });
  } catch (error) {
    console.error("Failed to get user url");
    res.status(500).json({ message: "server error" });
  }
};
