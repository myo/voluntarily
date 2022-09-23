
import jwt from "jsonwebtoken";

export const bakeJWT = (secret: Object) => {
    jwt.sign(secret, process.env.JWT_SECRET || "", {expiresIn: process.env.JWT_LIFE})
};