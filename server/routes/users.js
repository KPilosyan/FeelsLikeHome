import express from "express";
import {
    getUser,
    getUserPartners,
    addRemovePartner
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/partners", verifyToken, getUserPartners);
router.patch("/:id/:partnerId", verifyToken, addRemovePartner);

export default router;