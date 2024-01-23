const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./config')

export const authMiddleware = () => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startwith('Bearer ') ){
        return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        
        next();
    } catch(error) {
        return res.status(403).json({})
    }
}