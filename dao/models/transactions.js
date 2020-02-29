const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    type: {
        type: String, // Spesa o Incasso
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    paperwork: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Paperwork'
    },
    description: String,
    personInCharge: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Operator'
    },
    amount: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    active:{
        type: Boolean,
        default: true
    },
    note: String
});

module.exports = TransactionSchema;
