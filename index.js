const db = require("./server.js");

const inquirer = require('inquirer');
const { query } = require("express");
const cTable = require('console.table');

// View All Employees
function viewEmpl() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err
        console.table(res)
        startMenu()
    })
};

// 'View All Departments':
const viewAllDept = () => {
    db.query ('SELECT * FROM department', (err, res) => {
        if (err) throw err
        console.table(res)
        startMenu()
    })
};

// 'View All Roles':
const viewAllRole = () => {
    db.query ('SELECT * FROM role', (err, res) => {
        if (err) throw err
        console.table(res)
        startMenu()
    })
};

// 'Add Emplyee':
const newEmpl = () => {
    db.query ('SELECT * FROM role', (err, res) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?"
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: res.map(role => role.title)
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'What is the ID of the manager?',
                choices: [1, 2, 3, 4, 5, 7, 10, 12]
            },
        ]) .then (data => {
            let roleTitle = res.find(role => role.title === data.role)
            db.query ('INSERT INTO employee SET ?', {
                first_name: data.firstName,
                last_name: data.lastName,
                role_id: roleTitle.id,
                manager_id: data.managerId,
            })

            startMenu();
        })
    })
};

// 'Add Role':
const addRole = () => {
    db.query ('SELECT * FROM department', (err, res) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: res.map(department => department.name)
            },
        ]) .then (data => {
            let deptName = res.find(department => department.name === data.department)
            db.query ('INSERT INTO role SET ?', {
                title: data.title,
                salary: data.salary,
                department_id: deptName.id,
            })

            startMenu()
        })
    })
};

// 'Add Department':
const addDept = () => {
    db.query ('SELECT * FROM department', (err, res) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is this new Department called?'
            },
        ]) .then (data => {
            // let roleTitle = res.find(role => role.title === data.roletitle)
            db.query ('INSERT INTO department SET ?', {
                name: data.name,
            })

            startMenu()
        })
    })
};

//  'Update Employee Role':
const updateEmplRole = () => {
    db.query ('SELECT * FROM employee', (err, res) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: 'list',
                name: 'whichEmp',
                message: 'Which Employee would you like to Choose to Edit?',
                choices: res.map(employee => employee.first_name + " " + employee.last_name)
            }
        ]) .then(data => {
            const chosenEmp = res.find(employee => employee.first_name + " " + employee.last_name === data.whichEmp)
            db.query ('SELECT * FROM role', (err, res) => {
                if (err) throw err
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'newRole',
                        message: 'What new role would you like to Give the Chosen Employee?',
                        choices: res.map(role => role.title)
                    }
                ]) .then(data => {
                    let chosenRole = res.find(role => role.title === data.newRole)
                    db.query ('UPDATE employee SET role_id = ? WHERE id = ?', [chosenRole.id, chosenEmp.id], (err, res) => {
                        if (err) throw err
                        startMenu()
                    })
                })
            })
        })
    })
};

// 'Quit':
const endProg = () => {

};

const startMenu = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"
      ],
      loop: false,
    },
  ])
  .then((data) => {
    const {menu} = data;
    switch (menu) {
        case "View All Employees":
            viewEmpl();
            break;
        case 'Add Employee':
            newEmpl();
            break;
        case 'Update Employee Role':
            updateEmplRole();
            break;
        case 'View All Roles':
            viewAllRole();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View All Departments':
            viewAllDept();
            break;
        case 'Add Department':
            addDept();
            break;
        case 'Quit':
            process.exit(0);
    }
  })
};

startMenu();
