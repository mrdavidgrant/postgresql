
const app         = require('./lib/apps')

const input       = process.argv.slice(2)
const DataHelpers = require("./lib/data-helpers")()

console.log(`Searching database ....`)

let results = DataHelpers.query(input)
