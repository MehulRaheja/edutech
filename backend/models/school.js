const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    school: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('School', schoolSchema);