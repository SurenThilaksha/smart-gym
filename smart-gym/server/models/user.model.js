const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
    nic: {
        type: String,
        required: 'NIC is required'
    },
    fname: {
        type: String,
        required: 'First name is required'
    },
    lname: {
        type: String
    },
    oname: {
        type: String
    },
    staff_type: {
        type: String,
        required: 'Staff type is required'
    },
    address: {
        type: String,
        required: 'Address is required'
    },
    con_number: {
        type: String
    },
    st_date_emp: {
        type: String
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true
    },
    password: {
        type: String,
        required: 'Password is required',
        minlength : [4,'Password must be atleast 4 character long']
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Event
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//Methods

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('User' ,  userSchema);