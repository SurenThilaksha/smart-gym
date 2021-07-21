const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

var gymSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Gym Name is required'
    },
    reg_number: {
        type: String,
        required: 'Register number is required'
    },
    address: {
        type: String
    },
    longitude: {
        type: String
    },
    latitude: {
        type: String,
    },
    bank_acc_no: {
        type: String,
    },
    con_per_name: {
        type: String
    },
    con_per_no: {
        type: String
    },
    reg_date: {
        type: String
    },
    description: {
        type: String
    },
    st_capacity: {
        type: String
    },
    cardio_capacity: {
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
gymSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Event
gymSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//Methods

gymSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

gymSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('Gym',  gymSchema);