var express = require( 'express' )
var router = express.Router()

// Service Core
require( './routes/core.js' )( router )
// Main Journey
require( './routes/journey.js' )( router )
// DS01 - Core
// require('./routes/DS01/DS01.js')(router)
// DS01 - Sole Director
// require('./routes/DS01/sole-director.js')(router)
// DS01 - Multiple Director
// require('./routes/DS01/multiple-director.js')(router)


//   V2 Are you John SMITH?

router.get( '/forms/DS01/sole-director-v2/alternative-to-docusign', function ( req, res ) {
	var v2confirmDirector = req.query.v2confirmDirector
	if ( v2confirmDirector === 'no' ) {
		res.redirect( '/forms/DS01/sole-director-v2/someone-else-signing' )
	} else {
		res.render( 'forms/DS01/sole-director-v2/alternative-to-docusign' )
	}
} )

//   V2 Is someone else signing for John SMITH?

router.get( '/forms/DS01/sole-director-v2/director-needs-to-sign', function ( req, res ) {
	var v2someoneElseSigning = req.query.v2someoneElseSigning
	if ( v2someoneElseSigning === 'yes' ) {
		res.redirect( '/forms/DS01/sole-director-v2/who-is-signing' )
	} else {
		res.render( 'forms/DS01/sole-director-v2/director-needs-to-sign' )
	}
} )

//   V2  Which director are you? SINGLE


router.get( '/forms/DS01/sole-director-v2/select-the-directors-method-single', function ( req, res ) {
	var whichDirectorSingle = req.query.whichDirectorSingle
	if ( whichDirectorSingle === 'robinSmith' ) {
		res.redirect( '/forms/DS01/sole-director-v2/select-the-directors-check-before-you-submit-single' )
	} else {
		res.render( 'forms/DS01/sole-director-v2/select-the-directors-method-single' )
	}
} )


module.exports = router