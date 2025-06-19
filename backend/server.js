import express from 'express';

const app = express();

const PORT = 5001; //maybe add env.

app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`);
});