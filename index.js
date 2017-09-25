const pg        = require('pg')
const settings  = require('./settings')
let input       = process.argv[2].split('').join('')

const client    = new pg.Client({
  user:         settings.user,
  password:     settings.password,
  database:     settings.database,
  host:         settings.hostname,
  port:         settings.port,
  ssl:          settings.ssl
})

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err)
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err)
    }
    console.log(`Found ${result.rows.length} person(s) by the name ${input}:`)
    for (let row in result.rows) {
      console.log(`- ${row*1 + 1}: ${result.rows[row].first_name} ${result.rows[row].first_name} born ${result.rows[row].birthdate}`)
    }
    client.end()
  })
})