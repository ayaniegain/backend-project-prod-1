import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    bloodGroup:{
      type: String,
      required: true,
    },
   
    gender: {
      type:String,
      enum: ["M","F","O"],
      required: true,
    },
    diagnosedWith: {
      type: String,
      required: true,
    },
    admittedIn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
