const Employee = require("../models/Employee");


const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await employee.deleteOne();

    res.status(200).json({
      message: "Employee deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};