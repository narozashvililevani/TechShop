import jwt from 'jsonwebtoken';
import config from './config'


const getToken = (user) => {
    return jwt.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        
    }, config.JWT_SECRET, {
        expiresIn: '36h'
    })
};

const isAuth = (req, res, next) => {

    const getToken = req.headers.authorization;
    
    if(getToken) {
        const token = getToken.slice(6, getToken.length);

        jwt.verify(token, config.JWT_SECRET , (err, decode) => {
            if (err) res.status(401).send({msg: 'invalid token'});
            
            req.user = decode;

            next(); 
            return
        })

    }else {
        return res.status(401).send({msg: 'token isnt provided'});
    }

};

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({msg: 'not admin token'});
};


export {getToken, isAuth, isAdmin}  