const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,
    amountperhour: Number,
    completed:{
        type: Boolean,
        default: true
    },
    customer:{
        type: Schema.ObjectId,
        ref: 'Customer'
    },
});

module.exports = ProjectSchema;
