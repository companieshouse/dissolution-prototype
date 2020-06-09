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

	"signin-email": "rsmith@testcompany.co.uk",
	"jane-evans-email": "jevans@testcompany.co.uk",
	"behalf-name-drwilliams": "asolicitor@example.com",
	"behalf-email-drwilliams": "A Solicitor",
	"which-company-to-close": "01234567"

}