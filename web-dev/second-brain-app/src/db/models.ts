import mongoose from "mongoose";

const contentTypes = ["image", "video", "article", "audio"];

const userSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const tagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const linkSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const contentSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: contentTypes,
    },
    title: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export const Tag = mongoose.model("Tag", tagSchema);
export const Link = mongoose.model("Link", linkSchema);
export const Content = mongoose.model("Content", contentSchema);
