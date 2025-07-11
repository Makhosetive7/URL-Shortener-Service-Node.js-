import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createShortUrl } from "../controllers/url/shortUrl.js";
import {redirectToOriginal} from "../controllers/url/redirectToOriginalUrl.js"
import { getUserUrl } from "../controllers/url/userUrl.js"
import {getUrlStats} from "../controllers/url/urlStats.js"

const router = express.Router();

router.post("/shortUrl", authMiddleware, createShortUrl);
router.get("/:shortCode", redirectToOriginal)
router.get("/userUrl",authMiddleware, getUserUrl)
router.get("/:id/stats",authMiddleware, getUrlStats)

export default router;
