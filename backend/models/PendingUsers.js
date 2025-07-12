import mongoose from 'mongoose';

const pendingUserSchema = new mongoose.Schema({
    username:{
        type: String, 
        required: true,
        unique: true, 
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true
    },
    expiresAt: Date
});

const PendingUser = mongoose.model('PendingUser', pendingUserSchema);

export default PendingUser;