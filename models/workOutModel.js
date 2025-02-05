const mongoose = require("mongoose");

const workOutSchema = mongoose.Schema(
  {
    exercise_title: {
      type: String,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Corrected this line
  }
);

const Work_Out = mongoose.model("workout", workOutSchema);
module.exports = Work_Out;
