import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

const getUsername = (req, res, next) => {
    try{
        // get the authentication token
        const token = req.header('token');
        if(!token){
            return res.status(401).json({error: "Invalid Credentials!"});
        }
        const payload = jwt.verify(token, jwt_secret);
        req.username = payload.username;
        next();
    }   
    catch(error){
        console.error(error);
        return res.status(401).json({error: "Invalid Credentials!"});
    } 
}

export default getUsername;