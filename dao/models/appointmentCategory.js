const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentCategorySchema = new Schema({
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        require: true
    }
});

module.exports = AppointmentCategorySchema;