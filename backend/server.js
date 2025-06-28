import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TierListRoute from './routes/TierListRoute.js'
import AuthorizationRoute from './routesAuthorizationRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

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
