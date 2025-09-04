import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next){
    /**
     * 1. Check for token in headers
     *  As the request should contain the token in the headers, we check for it.
     *  with the setup of "Authorization: Bearer <token>""
     */
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    // Take out the token from the header
    const token = authHeader.split(" ")[1]
    if(!token) return res.statusCode(401).json({error: "Invalid token"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //the response will be something like { id: "123"} check payload on routes/auth.js
        req.user = decoded;
        next(); //next is only to indicate that the midware is finished.
    } catch(err) {
        res.status(401).json({ error: "Token invalid or expired" });
    }
};