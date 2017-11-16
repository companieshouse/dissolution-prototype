var express = require('express')
var router = express.Router()

// Service Core
require('./routes/core.js')(router)
// Main Journey
require('./routes/journey.js')(router)
// DS01 - Core
// require('./routes/DS01/DS01.js')(router)
// DS01 - Sole Director
// require('./routes/DS01/sole-director.js')(router)
// DS01 - Multiple Director
// require('./routes/DS01/multiple-director.js')(router)

module.exports = router
