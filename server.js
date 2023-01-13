// import and require inquirer
const inquirer = require('inquirer');

// TODO: NOT SURE IF THIS IS NEEDED
const express = require('express');

// import require console.table 
// const cTable = require('console.table');node
const { table } = require('table');
// import and require mysql2
const mysql = require('mysql2');

require('dotenv').config();

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
        user: process.env.DB_USER,
        // password
        password: process.env.DB_PASSWORD,
        // name
        database: process.env.DB_NAME,
    },
    console.log('Successfully connected to database!')
);

