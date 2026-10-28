
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import tokenBlacklistModel from "../model/tokenBlacklist.model.js";
import { sendEmail } from "../services/mail.service.js";

/*
 *@ Purpose: Register user and send verification email
 *@ Returns: User details + registration status
 */
export async function registerController(req, res) {
    const { username, email, password } = req.body;

    const isUserAlredyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAlredyExist) {
        return res.status(409).json({
            message: "User with this email or username already exists",
            success: false,
            err: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    const verificationToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "5m" }
    );

    const verificationLink =
        `http://localhost:3000/api/auth/verify-email?token=${verificationToken}`;

    await sendEmail(
        email,
        "Verify your Knowvia account",
        `Thank you for registering. Verify your email here: ${verificationLink}`,
        `
            <h1>Welcome to Knowvia!</h1>
            <p>Thank you for registering.</p>
            <p>Please verify your email by clicking below:</p>
            <a href="${verificationLink}">Verify Email</a>
        `
    );

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

/*
 *@ Purpose: Verify user's email using JWT
 *@ Returns: Verification success message
 */
export async function verifyEmail(req, res) {
    const { token } = req.query;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
        email: decoded.email
    });

    if (!user) {
        return res.status(400).json({
            message: "Invalid token",
            success: false,
            err: "User not found"
        });
    }

    user.verified = true;

    await user.save();

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px;">
            <h1>Welcome to Knowvia!</h1>
            <p>Your email has been successfully verified.</p>
            <p>Your account is now ready to use.</p>
            <p>Thank you for joining Knowvia.</p>
        </div>
    `;

    return res.send(html);
}

/*
 *@ Purpose: Authenticate user and set JWT cookie
 *@ Returns: User details + login status
 */
export async function loginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel
        .findOne({ email })
        .select("+password");

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials",
            success: false,
            err: "User does not exist"
        });
    }

    const isPasswordMatches = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatches) {
        return res.status(401).json({
            message: "Invalid credentials",
            success: false,
            err: "Password or email is incorrect"
        });
    }

    const verifiedEmail = user.verified;

    if (!verifiedEmail) {
        return res.status(403).json({
            message: "Please verify your email before logging in",
            success: false
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        message: "Logged in successfully",
        success: true,
        user: {
            username: user.username,
            email: user.email
        }
    });
}

/*
 *@ Purpose: Clear the authentication cookie
 *@ Returns: Logout status
 */
export async function logoutController(req, res) {
    const token = req.cookies.token


    await tokenBlacklistModel.create({ token })
    res.clearCookie("token")

    res.status(200).json({
        message: "logged-out succesfully "
    })
}
/*
 *@ Purpose: Fetch authenticated user's profile
 *@ Returns: User details + verification status
 */
export async function getMe(req, res) {
    const user = await userModel.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }

    return res.status(200).json({
        message: "User fetched successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    });
}
