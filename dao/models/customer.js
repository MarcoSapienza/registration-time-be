const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: String,
    fiscalCode: String,
    vatNumber: String,
    socialName: String,
    address: String,
    cap: String,
    city: String,
    email: String,
    phone: String,
    mobilePhone: String,
    note: String,
    active:{
        type: Boolean,
        default: true
    }
});

module.exports = CustomerSchema;
