import Url from "../../models/urlSchema.js";

export const redirectToOriginal = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ message: "short Url not found" });
    }

    urlDoc.clicks + 1;
    urlDoc.analytics.push({
        ip: req.ip,
        userAgent: req.header["user-agent"]
    })

    await urlDoc.save();

    return res.redirect(urlDoc.originalUrl);
  } catch (error) {
    console.log("Failed redirecting to original url");
    res.status(500).json({ message: "Server error" });
  }
};
