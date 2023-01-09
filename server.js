// import and require inquirer
const inquirer = require('inquirer');

// TODO: NOT SURE IF THIS IS NEEDED
const express = require('express');

// import require console.table 
const cTable = require('console.table');

// import and require mysql2
const mysql = reqire('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connecting to DB
const db = mysql.createConnection(
    {
        host: 'localhost',
        // username
        user: 'root',
        // password
        password: 'Purplehaze98!',
        // TODO ADD DATABASE NAME 
        database: ''
    }
    console.log('Successfully connected to ***** database!')
);

