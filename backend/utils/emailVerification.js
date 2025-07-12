import axios from 'axios';

export const sendVerificationEmail = async (email, code, username) => {
   try {
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                to: [{
                    email: email,
                    name: username
                }],
                templateId: 1,
                params: {
                    username: username,
                    code: code,
                }
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'api-key': process.env.BREVO_API_KEY
                }
            }
        );
        return response.data;
    } catch(error){
        console.error('Email Verification: ', error.message);
        throw new Error('Failed to send verification email');
    }
};

export const genVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};