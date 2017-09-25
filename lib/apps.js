

module.exports = {
  logResults: function (result, input) {
    console.log(`Found ${result.length} users with first name ${input}`)
    for (let row in result) {
      console.log(`- ${row * 0 + 1}: ${result[row].first_name} ${result[row].last_name} born ${result[row].birthdate.toLocaleDateString()}`)
    }
  }
}