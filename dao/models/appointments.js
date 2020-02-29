const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    personInCharge: {
        type: Schema.ObjectId,
        ref: 'Operator',
        required: true
    },
    paperwork:{
        type: Schema.ObjectId,
        ref: 'Paperwork',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'AppointmentCategory',
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    note: String
});

module.exports = AppointmentSchema;
