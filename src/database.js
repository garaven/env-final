const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'app_env'
})

db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('Conexion exitosa a la base de datos')
})

module.exports = db;
