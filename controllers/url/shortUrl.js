import Url from "../../models/urlSchema.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customCode } = req.body;
    const userId = req.user._id;

    if (!originalUrl) {
      return res.status(400).json({ message: "originalUrl is required" });
    }

    let shortCode = customCode || nanoid(7);

  
    const existingUrl = await Url.findOne({ shortCode });
    if (existingUrl) {
      return res.status(409).json({ message: "Short code already exists" });
    }

   const newUrl = new Url({
  originalUrl,
  shortCode,
  user: userId,
});


    await newUrl.save();

    const fullShortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

    res.status(201).json({
      message: "Short URL created successfully",
      shortCode,
      shortUrl: fullShortUrl,
      originalUrl,
    });
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ message: "Server error" });
  }
};
