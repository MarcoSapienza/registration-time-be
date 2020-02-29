const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var RoleSchema = new Schema ({
    id: {
        type: String,
        required: true
    },
    description: String,
    forum: String,
    judge: String,
    judicialAuthority: String
});

module.exports = RoleSchema;