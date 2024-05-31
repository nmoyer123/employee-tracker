# Employee Tracker
Description
The Employee Tracker is a command-line application built to manage a company's employee database. It allows users to view and manage departments, roles, and employees within the company. This application is built using Node.js, Inquirer, and PostgreSQL.

Table of Contents
Installation
Usage
Database Schema
Features
Video Walkthrough
Contributing
License
Installation
Clone the repository:


Copy code
git clone https://github.com/your-username/employee-tracker.git
cd employee-tracker
Install the necessary packages:


Copy code
npm install
Set up your PostgreSQL database:

Create a database and user in PostgreSQL.
Load the schema and seed data:

Copy code
psql -U your_username -d your_database_name -f db/schema.sql
psql -U your_username -d your_database_name -f db/seeds.sql
Configure your environment variables:

Create a .env file in the root of your project and add your database credentials:
plaintext
Copy code
DB_USER=your_username
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_password
DB_PORT=5432
Usage
To start the application, run the following command:

sh
Copy code
node index.js
You will be presented with a list of options to view and manage departments, roles, and employees.

Database Schema
The database schema consists of three tables: department, role, and employee.

department:

id: SERIAL PRIMARY KEY
name: VARCHAR(30) UNIQUE NOT NULL
role:

id: SERIAL PRIMARY KEY
title: VARCHAR(30) UNIQUE NOT NULL
salary: DECIMAL NOT NULL
department_id: INTEGER REFERENCES department(id)
employee:

id: SERIAL PRIMARY KEY
first_name: VARCHAR(30) NOT NULL
last_name: VARCHAR(30) NOT NULL
role_id: INTEGER REFERENCES role(id)
manager_id: INTEGER REFERENCES employee(id)
Features
View all departments: Displays a formatted table showing department names and department ids.
View all roles: Displays the job title, role id, the department that role belongs to, and the salary for that role.
View all employees: Displays a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
Add a department: Prompts to enter the name of the department and adds it to the database.
Add a role: Prompts to enter the name, salary, and department for the role and adds it to the database.
Add an employee: Prompts to enter the employee’s first name, last name, role, and manager, and adds the employee to the database.
Update an employee role: Prompts to select an employee to update and their new role and updates this information in the database.
Video Walkthrough
A walkthrough video demonstrating the functionality of the application can be found here.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create your feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
