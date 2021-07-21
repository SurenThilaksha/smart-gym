const jwt = require('jsonwebtoken');
const gymjwt = require('jsonwebtoken');
const memjwt = require('jsonwebtoken');

//gym admin web token
module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication faild.' });
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}

//gym webtoken
module.exports.gymverifyJwtToken = (req, res, next) => {
    var gymtoken;
    if ('authorization' in req.headers)
        gymtoken = req.headers['authorization'].split(' ')[1];

    if (!gymtoken)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        gymjwt.verify(gymtoken, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication faild.' });
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}

//mem webtoken
module.exports.memverifyJwtToken = (req, res, next) => {
    var memtoken;
    if ('authorization' in req.headers)
        memtoken = req.headers['authorization'].split(' ')[1];

    if (!memtoken)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        memjwt.verify(memtoken, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication faild.' });
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}