const mongoose = require('mongoose');
const passport = require('passport');
const _ = require ('lodash');

const User = mongoose.model('User');

module.exports.register = (req,res,next) =>{
    var user = new User();
    user.nic = req.body.nic;
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.oname = req.body.oname;
    user.staff_type = req.body.staff_type;
    user.address = req.body.address;
    user.con_number = req.body.con_number;
    user.st_date_emp = req.body.st_date_emp;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else
        {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('user', (err,user,info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['nic','email']) });   
        }
    );
}
