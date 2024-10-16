import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// IMAGE SCHEMA
const imageSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      trim: true,
    },
    interrogation: {
      type: String,
    },
  }
);

// add plugin that converts mongoose to json
imageSchema.plugin(toJSON);

export default mongoose.models.Image || mongoose.model("Image", imageSchema);
