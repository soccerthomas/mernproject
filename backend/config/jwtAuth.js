import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({message: 'No token, access denied'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded;
        next();
    } catch(error){
        res.status(401).json({message: 'Invalid Token'});
    }
}

export default auth;