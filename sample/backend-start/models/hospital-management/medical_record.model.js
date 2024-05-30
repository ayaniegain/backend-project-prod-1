import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patientDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    
   
  },
  { timestamps: true }
);

export const Record = mongoose.model("Record", medicalRecordSchema);
