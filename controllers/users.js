const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')


//This allows us to get a list of data from all of our tables
const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users JOIN usersAddress ON users.id = usersAddress.user_id JOIN usersContact ON users.id=usersContact.user_id", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

//This allows us to search for a particular user by id
const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = "SELECT ?? FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['*', 'users', 'id', req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}


//This allows us to create a new user in the users table
const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', 'last_name', req.body.first_name, req.body.last_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}



//This was my first attempt to complete the last question of the assignment ("including all fields in usersAddress and usersContact"), which still came up with errors. 
//I am uncertain what I am doing incorrectly.

// const createUser = (req, res) => {
//   // INSERT INTO USERS FIRST AND LAST NAME 
//   let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)"
//   // WHAT GOES IN THE BRACKETS
//   sql = mysql.format(sql, ['users', 'first_name', 'last_name', req.body.first_name, req.body.last_name])

//   pool.query(sql, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     return res.json({ newId: results.insertId });
//   })

//   let sql2 = "INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?)"
//   sql2 = mysql.format(sql2, ['usersAddress', 'user_id', 'address', 'city', 'county', 'state', 'zip', req.body.address, req.body.city, req.body.county, req.body.state, req.body.zip])

//   pool.query(sql2, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     return res.json({ newId: results.insertId });
//   })

//   let sql3 = "INSERT INTO ?? (??, ??, ??, ??) VALUES (LAST_INSERT_ID(), ?, ?, ?)"
//   sql3 = mysql.format(sql3, ['usersContact', 'user_id', 'phone1', 'phone2', 'email', req.body.phone1, req.body.phone2, req.body.email])

//   pool.query(sql3, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     return res.json({ newId: results.insertId });
//   })
// }


//This was my second attempt, which involved declaring the second two functions outside of the main createUser function. This also did not work.
// const createAddress = (req, res) => {
//   let sql2 = "INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?)"
//   sql2 = mysql.format(sql2, ['usersAddress', 'user_id', 'address', 'city', 'county', 'state', 'zip', req.body.address, req.body.city, req.body.county, req.body.state, req.body.zip])

//   // pool.query(sql2, (err, results) => {
//   //   if (err) return handleSQLError(res, err)
//   //   return res.json({ newId: results.insertId });
//   // });
// }

// const createContact = (req, res) => {
//   let sql3 = "INSERT INTO ?? (??, ??, ??, ??) VALUES (LAST_INSERT_ID(), ?, ?, ?)"
//   sql3 = mysql.format(sql3, ['usersContact', 'user_id', 'phone1', 'phone2', 'email', req.body.phone1, req.body.phone2, req.body.email])

//   // pool.query(sql3, (err, results) => {
//   //   if (err) return handleSQLError(res, err)
//   //   return res.json({ newId: results.insertId });
//   // })
// }

// const createUser = (req, res) => {
//   // INSERT INTO USERS FIRST AND LAST NAME 
//   let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)"
//   // WHAT GOES IN THE BRACKETS
//   sql = mysql.format(sql, ['users', 'first_name', 'last_name', req.body.first_name, req.body.last_name])

//   createAddress();
//   createContact();

//   pool.query(sql, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     return res.json({ newId: results.insertId });
//   })
// }


//This allows us to update user data via the id number
const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', req.body.first_name, 'last_name', req.body.last_name, 'id', req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}


//This allows us to delete users using their first name
const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', req.params.first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}