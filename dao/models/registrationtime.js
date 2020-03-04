const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegistrationTimeSchema = new Schema({
    project:[{
        type: Schema.ObjectId,
        ref: 'Project'
    }],
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: false
    },
    description: String,
    invoiced: {
        type: Boolean,
        default: false
    }
});

module.exports = RegistrationTimeSchema;
