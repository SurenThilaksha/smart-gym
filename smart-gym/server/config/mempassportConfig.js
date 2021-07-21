const mempassport = require('passport');
const memlocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Mem = mongoose.model('Mem');

mempassport.use('mem' ,
    new memlocalStrategy({ usernameField: 'email' },
        (username, password, done) => {
            Mem.findOne({ email: username },
                (err, mem) => {
                    if (err)
                        return done(err);
                    //unknown member
                    else if (!mem)
                        return done(null, false, { message: 'Email is not registered' });
                    //wrong password
                    else if (!mem.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    //authentication succeeded
                    else
                        return done(null, mem);
                });
        })
);