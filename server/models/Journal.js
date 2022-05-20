const mongoose = require("mongoose");

const journalSchema = mongoose.Schema(
  {
    entry: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const journal = mongoose.model("Journal", journalSchema);
module.exports = journal;
