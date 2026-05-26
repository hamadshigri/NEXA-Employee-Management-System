const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
    },

    department: {
      type: String,
    },

    designation: {
      type: String,
    },

    status: {
      type: String,
      default: "Active",
    },

    joiningDate: {
      type: String,
    },

    profileImage: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);