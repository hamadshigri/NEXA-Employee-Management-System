const Department = require("../models/Department");


const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);

    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(
      req.params.id
    );

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    await department.deleteOne();

    res.status(200).json({
      message: "Department deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDepartments,
  createDepartment,
  deleteDepartment,
};