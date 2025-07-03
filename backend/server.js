import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TierListRoute from './routes/TierListRoute.js'
import AuthorizationRoute from './routes/AuthorizationRoute.js';

dotenv.config();

//delete this later
console.log('--- Debugging Info ---');
console.log('PORT from .env:', process.env.PORT);
console.log('JWT from .env:', process.env.JWT);

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB)
    .then(()=>console.log('MongoDB Connected'))
    .catch(error => console.log('MongoDB Error', error));

//Routes
app.use('/api/tierlist', TierListRoute);
app.use('/api/auth', AuthorizationRoute);

app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`);
});

export default app;
