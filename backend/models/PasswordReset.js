import mongoose from 'mongoose';

const PasswordResetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    code: {
        type: String,
        required: true,
        length: 6
    },
    verified: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expireAfterSeconds: 0 } 
    }
}, {
    timestamps: true
});

PasswordResetSchema.index({ email: 1 }, { unique: true });

const PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema);

export default PasswordReset;