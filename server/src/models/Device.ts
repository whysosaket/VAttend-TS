import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  device: {
    type: String,
    required: true,
    unique: true
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("device", deviceSchema);

