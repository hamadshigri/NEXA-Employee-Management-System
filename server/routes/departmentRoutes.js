const express = require("express");

const {
  getDepartments,
  createDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(protect, getDepartments)
  .post(protect, createDepartment);

router.route("/:id")
  .delete(protect, deleteDepartment);

module.exports = router;