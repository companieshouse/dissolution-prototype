/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if ( window.console && window.console.info ) {
	window.console.info( 'GOV.UK Prototype Kit - do not use for production' )
}

$( document )
	.ready( function () {
		window.GOVUKFrontend.initAll()

		// Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
		// with role="button" when the space key is pressed.
		GOVUK.shimLinksWithButtonRole.init()

		// Show and hide toggled content
		// Where .multiple-choice uses the data-target attribute
		// to toggle hidden content
		var showHideContent = new GOVUK.ShowHideContent()
		showHideContent.init()

		// Sign document button
		$( '.add-sig-box' )
			.click( function () {
				$( '.adopt' )
					.fadeIn( 200, function () {
						$( '.adopt-window' )
							.fadeIn( 200 )
					} )
				return false
			} )

		// Adopt signature button
		$( '.adopt-button' )
			.click( function () {
				$( '.add-sig-box' )
					.hide()
				$( '.adopt' )
					.hide()
				$( '.sign-tag' )
					.hide()
				$( '.signature' )
					.show()
				$( '.confirm-bar' )
					.animate( {
						bottom: '0px'
					} )
				return false
			} )

		// Cancel adopt signature
		$( '.cancel-button' )
			.click( function () {
				$( '.adopt' )
					.hide()
				$( '.adopt-window' )
					.hide()
				return false
			} )

		// Close adopt signature
		$( '.close-button' )
			.click( function () {
				$( '.adopt' )
					.hide()
				$( '.adopt-window' )
					.hide()
				return false
			} )

		// FAKE DOCUSIGN JS
		$( '#tab-form-element-473279d7-8970-4b24-90e2-bfe79a6ccbc1' )
			.click( function () {
				$( '#adopt-dialog' )
					.show()
				return false
			} )

		$( '#adopt-my-sig' )
			.click( function () {
				$( '#adopt-dialog' )
					.hide()
				$( '#olive-dialog-wrapper' )
					.show()
				return false
			} )
	} )