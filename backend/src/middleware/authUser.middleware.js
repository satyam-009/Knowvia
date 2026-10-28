import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../model/tokenBlacklist.model.js";

export async function authUser(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required",
            success: false
        });
    }

    try {
        const isBlacklisted = await tokenBlacklistModel.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({
                message: "Session expired. Please log in again.",
                success: false
            });
        }

        const validToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = validToken;

        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
}

