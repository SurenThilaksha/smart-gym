const mongoose = require('mongoose');
const mempassport = require('passport');
const _ = require ('lodash');

const Mem = mongoose.model('Mem');

module.exports.mem_register = (req,res,next) =>{
    var mem = new Mem();
    mem.nic = req.body.nic;
    mem.fname = req.body.fname;
    mem.lname = req.body.lname;
    mem.oname = req.body.oname;
    mem.type = req.body.type;
    mem.address = req.body.address;
    mem.con_no = req.body.con_no;
    mem.email = req.body.email;
    mem.password = req.body.password;
    mem.save((err, doc) => {
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

module.exports.mem_authenticate = (req, res, next) => {
    // call for passport authentication
    mempassport.authenticate('mem', (err,mem,info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered member
        else if (mem) return res.status(200).json({ "token": mem.generateJwt() });
        // unknown member or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.memProfile = (req, res, next) =>{
    Mem.findOne({ _id: req._id },
        (err, mem) => {
            if (!mem)
                return res.status(404).json({ status: false, message: 'Member record not found.' });
            else
                return res.status(200).json({ status: true, mem : _.pick(mem,['reg_number','email']) });   
        }
    );
}