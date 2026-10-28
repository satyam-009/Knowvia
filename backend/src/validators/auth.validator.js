import { body, validationResult } from "express-validator";


export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};


export const registerValidator = [
    body('username')
        .trim()
        .notEmpty().withMessage("username is required")
        .isLength({ min: 5, max: 30 }).withMessage("username must be between 5 to 30")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("provide valid email"),

    body("password")
        .notEmpty().withMessage("password is required")
        .isLength({ min: 6, max: 128 }).withMessage("password must be atleast 6 charechter"),

    validateRequest


];


export const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("provide valid email"),

    body("password")
        .notEmpty().withMessage("password is required")
        .isLength({ min: 6, max: 128 }).withMessage("password must be atleast 6 charechter"),

    validateRequest
]