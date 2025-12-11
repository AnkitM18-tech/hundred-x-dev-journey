const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
  },
  { timestamps: true }
);

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
  },
  { timestamps: true }
);

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    adminId: {
      type: ObjectId,
      required: true,
      ref: "Admins",
    },
  },
  { timestamps: true }
);

const purchaseSchema = new Schema(
  {
    courseId: {
      type: ObjectId,
      required: true,
      ref: "Courses",
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = { User, Admin, Course, Purchase };
