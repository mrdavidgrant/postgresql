const app = require('./apps')


module.exports = function makeDataHelpers(db){
  return {
    query: function(db, input) {
      db.query("SELECT * FROM famous_people WHERE first_name = $1", [input], (err, result) => {
        if (err) {
          return console.error("error running query", err)
        } else {
          db.end()
          app.logResults(result.rows, input)

        }
        
      })

    }
    

  }

}

