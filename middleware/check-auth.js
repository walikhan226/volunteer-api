const jwt = require('jsonwebtoken');
const config=require('config')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const decoded = jwt.verify(token,config.get('jwtSecret'), null) 
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'auth faild'
        });
    }
};