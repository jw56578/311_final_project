const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')


const createCustomer = (req, res) => {
  let sql = "INSERT INTO customers (?? , ??, ??, ??) values(?, ?, ?, ?)"
  // console.log(req.body)
  sql = mysql.format(sql, ['first_name','last_name','email_address','phone',req.body.firstName, req.body.lastName, req.body.emailAddress, req.body.phone])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}
const getAllCustomers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM customers", (err, rows) => {
    if (err) return handleSQLError(res, err)
    
    return res.json(rows);
  })
}
module.exports = { getAllCustomers, createCustomer
}