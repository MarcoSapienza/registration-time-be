const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const OperatorSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    title:{
        type: String
    },
    address: String,
    cap: String,
    city: String,
    role: {
        type: String,
        required: true,
        default: 'personInCharge'
    },
    phone: String,
    mobilePhone: String,
    fax: String,
    notified: {
        type: Boolean,
        default: true
    },
    active:{
        type: Boolean,
        default: false
    }

});

// hash user password before saving into database
OperatorSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

OperatorSchema.methods.comparePassword = (password, userPassword, cb) => {

    if(typeof password == 'string' || password instanceof String){
        bcrypt.compare(password, userPassword, (err, isMatch) => {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }else
        cb("Invalid Password")

};



module.exports = OperatorSchema;
