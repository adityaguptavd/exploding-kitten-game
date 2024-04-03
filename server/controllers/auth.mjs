import User from "../db/models/User.mjs"
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { body, validationResult } from 'express-validator';

dotenv.config();
 const saltOrRounds = +process.env.SALT_OR_ROUNDS;
 const jwt_secret = process.env.JWT_SECRET;

// controller for registering user
export const register = [
    // validation rules
    body('firstname').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    async (req, res, next) => {
        try{
            // handle validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const user = await User.findOne({username: req.body.username});
            if(user){
                return res.status(409).json({error: "Username already exists"});
            }
            // hash and secure the user password
            const hashedPassword = bcrypt.hashSync(req.body.password, saltOrRounds);
            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedPassword,
            });
            // save user to database
            await newUser.save();
            // sign the user token
            const payload = {
                username: newUser.username,
            }
            const token = jwt.sign(payload, jwt_secret);
            return res.status(201).json({token});
        }
        catch(error){
            console.error(error);
            return res.status(500).json({error: "Internal Server Error"});
        }
    }
]

// controller for login user
export const login = [
    // validation rules
    body('username').exists().withMessage('Username must be provided'),
    body('password').exists().withMessage('Password must be provided'),
    async (req, res, next) => {
        try{
            // handle validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const user = await User.findOne({username: req.body.username});
            // check if username exists
            if(!user){
                return res.status(404).json({error: "User not found!"});
            }
            // match the user's password
            const match = bcrypt.compareSync(req.body.password, user.password);
            if(!match){
                return res.status(401).json({error: "Invalid Credentials!"});
            }
            // prepare the payload for token
            const payload = {
                username: user.username,
            }
            const token = jwt.sign(payload, jwt_secret);
            return res.status(200).json({token});
        }
        catch(error){
            console.error(error);
            return res.status(500).json({error: "Internal Server Error"});
        }
    }
]