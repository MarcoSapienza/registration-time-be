const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name: String,
    lastname: String,
    type: {
        type: String,
        required: true
    },
    socialName: String,
    role: {
        type: String,
        require: true
    },
    address: String,
    cap: String,
    city: String,
    email: String,
    pec: String,
    phone: String,
    mobilePhone: String,
    fax: String,
    fiscalCode: String,
    vatNumber: String,
    note: String,
    active:{
        type: Boolean,
        default: true
    }
});

module.exports = SubjectSchema;
