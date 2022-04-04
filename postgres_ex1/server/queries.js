const { response } = require('express');
const express = require('express');
const app = express();

const Pool = require('pg').Pool;
const dotenv = require("dotenv").config();


const pool = new Pool({
    user: process.env.USER,
    host: 'localhost',
    database: 'api',
    password: process.env.PASSWORD,
    port: 5432,
});

const displayHome = () => {

}

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
        "SELECT * FROM users "+
        `WHERE id= ${id}`, (error, results)=> {
            if(error) throw error;
            res.status(200).json(results.rows);
    });
}

const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json(`User added with ID: ${results}`)
    })
  }

const updateUser = (req, res) => {
    const {name, email, idP} = req.body;
    const id = parseInt(req.params.id);

    pool.query(
        `UPDATE users SET name=$1, email=$2, id=$4`+
        `WHERE  id=$3`,
        [name,email,id, idP],
        (error, results) => {
            if (error) throw error;
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(
        `DELETE FROM users `+
        `WHERE id=$1`,
        [id],
        (error, results) => {
            if(error) throw error;
            res.status(200).send(`User deleted with ID: ${id}`)
        }
    )
}

module.exports  = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}

