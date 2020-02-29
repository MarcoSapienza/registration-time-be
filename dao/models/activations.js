const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var activationSchema = new Schema({
    operator: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Operator'
    },
    token:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }

});


module.exports = activationSchema;