const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    name: String,
    url: String,
    uploadedDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
});

module.exports = DocumentSchema;
