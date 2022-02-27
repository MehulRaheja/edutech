const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stdSchema = new Schema({
    std: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Standard', stdSchema);