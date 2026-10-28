import jwt from "jsonwebtoken"




export function authUser(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required",
            success: false
        });
    }

    try {
        const validToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = validToken;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
}

