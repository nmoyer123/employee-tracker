const { Client } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Configure the PostgreSQL client using environment variables
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Connect to the PostgreSQL database
client.connect().catch(err => console.error('Connection error', err.stack));

// Function to view all departments
async function viewAllDepartments() {
  try {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);
  } catch (err) {
    console.error('Error viewing departments', err);
  }
}

// Function to view all roles
async function viewAllRoles() {
  try {
    const res = await client.query(`
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      JOIN department ON role.department_id = department.id
    `);
    console.table(res.rows);
  } catch (err) {
    console.error('Error viewing roles', err);
  }
}

// Function to view all employees
async function viewAllEmployees() {
  try {
    const res = await client.query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
      manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    console.table(res.rows);
  } catch (err) {
    console.error('Error viewing employees', err);
  }
}

// Function to add a new department
async function addDepartment(name) {
  try {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added ${name} to the database`);
  } catch (err) {
    console.error('Error adding department', err);
  }
}

// Function to add a new role
async function addRole(title, salary, departmentId) {
  try {
    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    console.log(`Added ${title} to the database`);
  } catch (err) {
    console.error('Error adding role', err);
  }
}

// Function to add a new employee
async function addEmployee(firstName, lastName, roleId, managerId) {
  try {
    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
    console.log(`Added ${firstName} ${lastName} to the database`);
  } catch (err) {
    console.error('Error adding employee', err);
  }
}

// Function to update an employee's role
async function updateEmployeeRole(employeeId, roleId) {
  try {
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
    console.log(`Updated employee's role`);
  } catch (err) {
    console.error('Error updating employee role', err);
  }
}

// Export the functions for use in other files
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
