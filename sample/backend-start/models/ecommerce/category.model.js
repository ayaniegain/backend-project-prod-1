import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdby:{
        type: mongoose.model.Schema.Types.ObjectId,
        ref: User
    }
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
