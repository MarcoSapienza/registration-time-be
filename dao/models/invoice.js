const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    project:[{
        type: Schema.ObjectId,
        ref: 'Project'
    }],
    registrationtime: [{
        type: Schema.ObjectId,
        ref: 'Registrationtime'
    }],
    value: Number,
    tax: Number,
    Description: String,
    date: {
        type: Date,
        required: true
    },
});

module.exports = InvoiceSchema;
