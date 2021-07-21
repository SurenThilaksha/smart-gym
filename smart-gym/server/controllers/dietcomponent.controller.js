const mongoose = require('mongoose');
const _ = require ('lodash');

const Dietcomponent = mongoose.model('Dietcomponent');

module.exports.dietcomponent_add = (req,res,next) =>{
    var dietcomponent = new Dietcomponent();
    dietcomponent.title = req.body.title;
    dietcomponent.content = req.body.content;
    dietcomponent.save((err, doc) => {
        if (!err)
            res.send(doc);
        else
            {

            }
    });

}

module.exports.dietcomponent_list = (req,res,next) =>{
    Dietcomponent.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Plan :' + JSON.stringify(err, undefined, 2)); }
    });
}