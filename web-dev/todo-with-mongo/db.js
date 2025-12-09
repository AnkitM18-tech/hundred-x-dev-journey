const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { timestamps: true }
);

const TodoSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "Users",
    },
    title: String,
    done: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);
const Todo = mongoose.model("todos", TodoSchema);

module.exports = { User, Todo };
