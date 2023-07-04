// app.js

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create express app
const app = express();

// Use JSON parser middleware
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/empdb', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Define employee schema and model
const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  phone: String,
  department: String
});

const Employee = mongoose.model('Employee', employeeSchema);

// Define REST API endpoints
app.post('/emp/saveForm', async (req, res) => {
  // Create a new employee from request body
  const emp = new Employee(req.body);
  // Save employee to database
  await emp.save();
  // Send response with saved employee
  res.json(emp);
});

app.get('/emp/getAll', async (req, res) => {
  // Find all employees from database
  const employees = await Employee.find();
  // Send response with employees array
  res.json(employees);
});

app.put('/emp/updateEmployee', async (req, res) => {
  // Find employee by id and update from request body
  const emp = await Employee.findByIdAndUpdate(req.body.id, req.body, {new: true});
  // Send response with updated employee
  res.json(emp);
});

app.delete('/emp/deleteEmployeeById/:id', async (req, res) => {
  // Find employee by id and delete from database
  const emp = await Employee.findByIdAndDelete(req.params.id);
  // Send response with deleted employee
  res.json(emp);
});

// Start server on port 9091
app.listen(9091, () => console.log('Server listening on port 9091'));
