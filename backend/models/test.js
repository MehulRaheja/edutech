const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const queSchema = new Schema({
  que: {
    type: String,
    required: true,
  },
  optA: {
    type: String,
    required: true,
  },
  optB: {
    type: String,
    required: true,
  },
  optC: {
    type: String,
    required: true,
  },
  optD: {
    type: String,
    required: true,
  },
  ans: {
    type: String,
    required: true,
  },
});

const questionsSchema = new Schema({
  que1: {
    type: queSchema,
    required: true,
  },
  que2: {
    type: queSchema,
    required: true,
  },
  que3: {
    type: queSchema,
    required: true,
  },
  que4: {
    type: queSchema,
    required: true,
  },
  que5: {
    type: queSchema,
    required: true,
  },
  que6: {
    type: queSchema,
    required: true,
  },
  que7: {
    type: queSchema,
    required: true,
  },
  que8: {
    type: queSchema,
    required: true,
  },
  que9: {
    type: queSchema,
    required: true,
  },
  que10: {
    type: queSchema,
    required: true,
  },
});

const testSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    topic: {
      type: String, //free or auth
      required: true,
    },
    authenticated: Boolean,
    difficulty: {
      type: String,
      required: true,
    },
    userId: {
      // type: Schema.Types.ObjectId,
      type: String,
      ref: 'User',
      required: true
    },
    questions: {
      type: questionsSchema,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
