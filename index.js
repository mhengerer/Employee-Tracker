const db = require("./server.js");

const inquirer = require("inquirer");

// View All Employees
const viewEmpl = () => {
    db.query ('SELECT * FROM employee', (err, res) => {
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
        ]) .then (data => {
            let roleTitle = res.find(role => role.title === data.roletitle)
            db.query ('INSERT INTO employee SET ?', {
                first_name: data.first_name,
                last_name: data.last_name,
                role_id: roleTitle.id
            })

            startMenu()
        })
    })
};

// 'Add Role':
const addRole = () => {
    db.query ('SELECT * FROM role', (err, res) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
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
                choices: res.map(role => role.title)
            },
        ]) .then (data => {
            let roleTitle = res.find(role => role.title === data.roletitle)
            db.query ('INSERT INTO employee SET ?', {
                first_name: data.first_name,
                last_name: data.last_name,
                role_id: roleTitle.id
            })

            startMenu()
        })
    })
};

// 'Add Department':
const addDept = () => {
    db.query ('SELECT * FROM role', (err, res) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: 'input',
                name: '',
                message: ''
            },
            {
                type: 'input',
                name: '',
                message: ''
            },
            {
                type: 'list',
                name: '',
                message: '',
                choices: res.map(role => role.title)
            },
        ]) .then (data => {
            let roleTitle = res.find(role => role.title === data.roletitle)
            db.query ('INSERT INTO employee SET ?', {
                first_name: data.first_name,
                last_name: data.last_name,
                role_id: roleTitle.id
            })

            startMenu()
        })
    })
};

//  'Update Employee Role':
const updateEmplRole = () => {

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
    },
  ])
  .then((data) => {
    const {request} = data;
    console.log(request);
    switch (request) {
        case 'View All Employees':
            viewEmpl();
            break;
        case 'Add Emplyee':
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
            endProg();
            break;
    }
  })
};

startMenu();
