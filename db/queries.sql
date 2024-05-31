-- Query to view all departments
SELECT * FROM department;

-- Query to view all roles
SELECT role.id, role.title, role.salary, department.name AS department
FROM role
JOIN department ON role.department_id = department.id;

-- Query to view all employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

-- Query to add a department
INSERT INTO department (name) 
VALUES ('Accounting');

-- Query to add a role
INSERT INTO role (title, salary, department_id) 
VALUES ('janitor', 35000, 4);

-- Query to add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Mayer', 4, NULL);

-- Query to update an employee role
UPDATE employee SET role_id = New_Role_ID WHERE id = 4;


