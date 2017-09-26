const app       = require('./lib/apps')
const pg        = require('pg')
const settings  = require('./settings')
const DataHelpers = require('./lib/data-helpers')()

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const first = process.argv[2]
const last = process.argv[3]
const dob = process.argv[4]

knex('famous_people').insert({ first_name: first , last_name: last , birthdate: dob})
.asCallback(function(rows) {
  knex.select('').from('famous_people')
  .asCallback(function(rows){
    console.log(rows)
    DataHelpers.close()
  })
})
