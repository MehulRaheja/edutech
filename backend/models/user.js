const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        // required: true
    },
    result: {
        tests: [
            {
                testId: {
                    // type: Schema.Types.ObjectId,
                    type: String,
                    ref: 'Test',
                    required: true
                },
                subject: String,
                answers: [String],
                marks: Number,
                date: String
            }
        ]
    }
});

module.exports = mongoose.model('User', userSchema);