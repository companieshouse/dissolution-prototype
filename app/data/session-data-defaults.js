/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {
	"signin-email": "user@testcompany.co.uk",
	"janeevans-email": "jevans@testcompany.co.uk",
	"behalfname-drwilliams": "asolicitor@example.com",
	"behalfemail-drwilliams": "A Solicitor",
	"whichcompany-toclose": "01234567"
}