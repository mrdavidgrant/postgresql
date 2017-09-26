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

client.connect((err, db) => {
  if (err) {
    return console.error("Connection Error", err)
  }

  const DataHelpers = require("./lib/data-helpers.js")(db)
    console.log(`Searching database ....`)
    DataHelpers.query(db, input)
})


function logResults (result) {
  console.log(`Found ${result.length} users with first name ${input}`)
  for (let row in result) {
    console.log(`- ${row * 0 + 1}: ${result[row].first_name} ${result[row].last_name} born ${result[row].birthdate.toLocaleDateString()}`)
  }
}