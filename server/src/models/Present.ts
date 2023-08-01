import mongoose from "mongoose";

const presentSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
    unique: true
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("present", presentSchema);
