import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js'
import PendingUser from '../models/PendingUsers.js';
import {sendVerificationEmail, genVerificationCode} from '../utils/emailVerification.js'

const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});

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

        //for email verification
        const code = genVerificationCode();

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        await PendingUser.deleteOne({email});

        const pendingUser = new PendingUser({
            username,
            email,
            password: hashedPwd,
            code,
            expiresAt
        });

        await pendingUser.save();
        await sendVerificationEmail(email, code, username);

        res.status(201).json({
            success: true,
            message: 'Registration Successful! Please check your email for the verification code.',
            email: email,
            requiresVerification: true
        });

        /*
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
        */

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
});

router.post('/sendCode', async (req, res) => {
    try{
        const {email} = req.body;

        const pendingUser = await PendingUser.findOne({email});
        if(!pendingUser){
            return res.status(400).json({success: false, message: `No pending registration found for ${email}`});
        }

        if(new Date() > pendingUser.expiresAt){
            await PendingUser.deleteOne({email});
            return res.status(400).json({success: false, message: 'Verification code has expired! Please register again.'});
        }

        await sendVerificationEmail(email, pendingUser.code, pendingUser.username);
        res.status(200).json({success: true, message: `New verification code has been sent to ${email}`});

    } catch(error){
        console.error('Email Code Error: ', error.message);
        return res.status(500).json({success: false, message: 'Failed to send verification code! Please try again'});
    }
});

router.post('/verifyCode', async (req, res) => {
    try{
        const {email, code} = req.body;

        if (!email || !code) {
            return res.status(400).json({
                success: false,
                message: 'Email and verification code are required'
            });
        }

        if (code.length !== 6) {
            return res.status(400).json({
                success: false,
                message: 'Verification code must be 6 digits'
            });
        }

        const pendingUser = await PendingUser.findOne({email});
        if(!pendingUser){
            return res.status(400).json({success: false, message: `No pending registration found for ${email}`});
        }

        if(new Date() > pendingUser.expiresAt){
            await PendingUser.deleteOne({email});
            return res.status(400).json({success: false, message: 'Verification code has expired! Please register again.'});
        }

        if(pendingUser.code !== code){
            return res.status(400).json({success: false, message: 'Invalid verification code. Please try again'});
        }

        const newUser = new User({
            username: pendingUser.username, 
            email: pendingUser.email, 
            password: pendingUser.password,
            emailVerified: true
        });

        await newUser.save();
        await PendingUser.deleteOne({ email });

        res.status(201).json({
            success: true, 
            message: 'Email verifed successfully! Account Created.',
             user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                emailVerified: newUser.emailVerified
            }
        });

    } catch (error) {
        console.error('Verify code error:', error);
        res.status(500).json({success: false, message: 'Failed to verify code. Please try again.'});
    }
});

router.post('/tokenVerify', async (req, res) => {
    try{
        const {token} = req.body;

        if(!token){
            return res.status(400).json({isValid: false, message: 'No token provided'})
        }

        jwt.verify(token, process.env.JWT, (error, decoded) => {
            if(error){
                return res.status(200).json({isValid: false, message: error.message});
            }
            
            res.status(200).json({isValid: true, message: 'Valid Token', decodedPayload: decoded});
        });

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
});

export default router;

