const mongoose = require('mongoose');
const gympassport = require('passport');
const _ = require ('lodash');

const Gym = mongoose.model('Gym');

module.exports.gym_register = (req,res,next) =>{
    var gym = new Gym();
    gym.name = req.body.name;
    gym.reg_number = req.body.reg_number;
    gym.address = req.body.address;
    gym.longitude = req.body.longitude;
    gym.latitude = req.body.latitude;
    gym.bank_acc_no = req.body.bank_acc_no;
    gym.con_per_name = req.body.con_per_name;
    gym.con_per_no = req.body.con_per_no;
    gym.reg_date = req.body.reg_date;
    gym.description = req.body.description;
    gym.st_capacity = req.body.st_capacity;
    gym.cardio_capacity = req.body.cardio_capacity;
    gym.email = req.body.email;
    gym.password = req.body.password;
    gym.save((err, doc) => {
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

module.exports.gym_authenticate = (req, res, next) => {
    // call for passport authentication
    gympassport.authenticate('gym', (err,gym,info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered gym
        else if (gym) return res.status(200).json({ "token": gym.generateJwt() });
        // unknown gym or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.gymProfile = (req, res, next) =>{
    Gym.findOne({ _id: req._id },
        (err, gym) => {
            if (!gym)
                return res.status(404).json({ status: false, message: 'Gym record not found.' });
            else
                return res.status(200).json({ status: true, gym : _.pick(gym,['reg_number','email']) });   
        }
    );
}