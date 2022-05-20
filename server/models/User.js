const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      dropDupps: true,
    },
    password: {
      type: String,
      required: true,
    },
    words: [
      {
        entity: {
          type: String,
          required: true,
        },
        lable: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
      { timestamps: true },
    ],
    // data: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Data",
    //     default: null,
    //   },
    // ],
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
