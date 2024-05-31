const inquirer = require('inquirer');
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require('./lib/queries');

const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit',
    ],
  });

  switch (action) {
    case 'View all departments':
      await viewAllDepartments();
      break;
    case 'View all roles':
      await viewAllRoles();
      break;
    case 'View all employees':
      await viewAllEmployees();
      break;
    case 'Add a department':
      const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      });
      await addDepartment(name);
      break;
    case 'Add a role':
      const roleAnswers = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the title of the role:' },
        { type: 'input', name: 'salary', message: 'Enter the salary of the role:' },
        { type: 'input', name: 'departmentId', message: 'Enter the department ID for the role:' },
      ]);
      await addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.departmentId);
      break;
    case 'Add an employee':
      const employeeAnswers = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter the first name of the employee:' },
        { type: 'input', name: 'lastName', message: 'Enter the last name of the employee:' },
        { type: 'input', name: 'roleId', message: 'Enter the role ID for the employee:' },
        { type: 'input', name: 'managerId', message: 'Enter the manager ID for the employee (null if no manager):' },
      ]);
      await addEmployee(employeeAnswers.firstName, employeeAnswers.lastName, employeeAnswers.roleId, employeeAnswers.managerId || null);
      break;
    case 'Update an employee role':
      const updateAnswers = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter the ID of the employee to update:' },
        { type: 'input', name: 'roleId', message: 'Enter the new role ID for the employee:' },
      ]);
      await updateEmployeeRole(updateAnswers.employeeId, updateAnswers.roleId);
      break;
    case 'Exit':
      process.exit();
      break;
  }

  mainMenu();
};

mainMenu();
