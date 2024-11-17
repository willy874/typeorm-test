import mysql2 from 'mysql2/promise'

mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'cpy775tw',
  database: 'bam_cms',
})
.then((connection) => {
  console.log('Connected to MySQL!')
  connection.query('SHOW DATABASES;').then(([rows, fields]) => {
    console.log('Databases:', rows)
  })
})
.catch((error) => {
  console.error('Error connecting to MySQL:', error)
})

console.log('Hello World!');

