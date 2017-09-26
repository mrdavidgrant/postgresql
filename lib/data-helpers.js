const app       = require('./apps')
const pg        = require('pg')
const settings  = require('../settings')

const client    = new pg.Client({
  user:         settings.user,
  password:     settings.password,
  database:     settings.database,
  host:         settings.hostname,
  port:         settings.port,
  ssl:          settings.ssl
})


module.exports = function (){

  client.connect((err, db) => {
    if (err) {
      return console.error("Connection Error", err)
    }
  })

  function queryDB (input) {
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text", input, (err, result) => {
      if (err) {
        return console.error("error running query", err)
      } else {
        app.logResults(result.rows, input)
      }
    })
  }

  function closeEverything() {
    client.end()
  }

  return {
    query: queryDB,
    close: closeEverything
  }

}

