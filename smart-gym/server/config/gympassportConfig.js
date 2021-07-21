const gympassport = require('passport');
const gymlocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Gym = mongoose.model('Gym');

gympassport.use('gym' ,
    new gymlocalStrategy({ usernameField: 'email' },
        (username, password, done) => {
            Gym.findOne({ email: username },
                (err, gym) => {
                    if (err)
                        return done(err);
                    //unknown gym
                    else if (!gym)
                        return done(null, false, { message: 'Email is not registered' });
                    //wrong password
                    else if (!gym.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    //authentication succeeded
                    else
                        return done(null, gym);
                });
        })
);