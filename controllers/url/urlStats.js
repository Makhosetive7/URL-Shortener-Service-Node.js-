import Url from "../../models/urlSchema.js";

export const getUrlStats = async (req, res) => {
  try {
    const urlId = req.params.id;
    const userId = req.params._id;

    const url = await Url.findById(urlId);

    if (!url) {
      return res.status(404).json({ message: "Url not found" });
    }

    //ensure user own this url
    if (url.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200)({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      totalClicks: url.clicks,
      analytics: url.analytics,
    });
  } catch (error) {
    console.log("Failed fetching URL statistics");
  }
};
