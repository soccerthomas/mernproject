import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js'

const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});

        //delete this later
        console.log('Value of process.env.JWT inside /login route:', process.env.JWT);

        if(user){
            const validPwd = await bcrypt.compare(password, user.password);

            if(validPwd){

                const payload = {
                    id: user._id,
                    username: user.username
                };
                
                //users get a jwt upon login which will be used for protected routes
                jwt.sign(payload, process.env.JWT, {expiresIn: '1d'}, 
                    (error, token) => {
                        if(error) throw error;
                        res.json({
                            success: true,
                            token: token,
                            user:{
                                id: user._id,
                                username: user.username,
                                email: user.email
                            }
                        });
                    }
                );
            } else {
                return res.status(401).json({success: false, message: 'Invalid Email or Password'});
            }
        } else {
            return res.status(401).json({success: false, message: 'Invalid Email or Password'});
        }

    }catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

router.post('/register', async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const emailExists = await User.findOne({email});
        if(emailExists){
            return res.status(400).json({success: false, message: 'Account with this email already exists'});
        } 

        const usernameExists = await User.findOne({username});
        if(usernameExists){
            return res.status(400).json({success: false, message: 'Username already taken'});  
        }

        //password hashing with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, 
            email, 
            password: hashedPwd
        });

        await newUser.save();

        //user redirected to login
        res.status(201).json({
            success: true, 
            message: 'User registered successfully', 
            redirectTo: '/login'
        });

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
});

export default router;
