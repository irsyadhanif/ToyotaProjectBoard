//app.js

//const mysql = require('mysql');
//const con = mysql.createConnection({
//  host: 'localhost',
//  user: 'logan',
//  password: 'toyota',
//  database: 'toyota'
//});
//con.connect((err) => {
//  if (err) {
//	  console.log('Error connecting to DB');
//	  return;
//  }
//  console.log('Connected!');
//});
//
//con.query('SELECT * FROM card', (err,rows) => {
//  if(err) throw err;
//
//  console.log('Data received from Db:\n');
//
//  rows.forEach( (row) => { 
//  console.log(`${row.TITLE} is in \"${row.DESCRIPTION}\"`); 
//  });
//});
//
//con.end((err) => {
//
//});
