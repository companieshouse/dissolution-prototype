module.exports = function (router) {
  // Forms Service Home
  router.get('/forms/home', function (req, res) {
    res.render('forms/home')
  })

  // Sign In
  router.get('/sign-in', function (req, res) {
    res.render('core/sign-in')
  })

  router.post('/sign-in', function (req, res) {
    var email = req.body.email
    var password = req.body.password
    var errorFlag = false
    var errorEmail = {}
    var errorPassword = {}

    if (email === '') {
      errorEmail.type = 'blank'
      errorEmail.msg = 'Enter an email address'
      errorEmail.flag = true
      errorFlag = true
    }

    if (password === '') {
      errorPassword.type = 'blank'
      errorPassword.msg = 'Enter a password'
      errorPassword.flag = true
      errorFlag = true
    }

    if (errorFlag) {
      res.render('core/sign-in', {
        email: email,
        password: password,
        errorEmail: errorEmail,
        errorPassword: errorPassword
      })
    } else {
      req.session.userEmail = email
      res.redirect('/which-company-to-close')
    }
  })

  // Company authentication
  router.get('/company-authentication', function (req, res) {
    var scenario = req.session.scenario

    if (scenario != null) {
      res.render('core/company-authentication', {
        scenario: req.session.scenario
      })
    } else {
      res.redirect('/start')
    }
  })

  router.post('/company-authentication', function (req, res) {
    var authCode = req.body.authCode
    var authCodeErr = {}
    var errorFlag = false
    var scenario = req.session.scenario
    // var totalDirectors = 0

    if (scenario != null) {
      if (authCode === '') {
        authCodeErr.type = 'blank'
        authCodeErr.msg = 'Enter an authentication code to continue'
        authCodeErr.flag = true
        errorFlag = true
      } else if (authCode.length < 6) {
        authCodeErr.type = 'invalid'
        authCodeErr.msg = 'You must enter a complete authentication code'
        authCodeErr.flag = true
        errorFlag = true
      } else if (authCode.length > 6) {
        authCodeErr.type = 'invalid'
        authCodeErr.msg = 'Enter a valid 6 character authentication code'
        authCodeErr.flag = true
        errorFlag = true
      } else {
        if (authCode === scenario.company.authcode) {
          // Success Case
          // scenario = require('../assets/data/scenario-1.json')
        } else {
          authCodeErr.type = 'failed'
          authCodeErr.msg = 'The authentication code is not correct'
          authCodeErr.flag = true
          errorFlag = true
        }
      }

      if (errorFlag === true) {
        res.render('core/company-authentication', {
          authCode: authCode,
          authCodeErr: authCodeErr,
          scenario: scenario
        })
      } else {
        /* totalDirectors = scenario.company.directors.length
        if (totalDirectors > 1) {
          res.redirect('/review-company-directors')
        } else {
          res.redirect('/are-you-the-director')
        } */
        res.redirect('/review-company-directors')
      }
    } else {
      res.redirect('/start')
    }
  })

  // Create Account
  router.get('/forms/create-an-account', function (req, res) {
    res.render('forms/create-an-account')
  })

  // Password Reminder
  router.get('/forms/password-reminder', function (req, res) {
    res.render('forms/password-reminder')
  })

  // Password Reset Sent
  router.post('/forms/reset-email-sent', function (req, res) {
    res.render('forms/reset-email-sent')
  })

  // My Forms View
  router.post('/forms/my-forms', function (req, res) {
    res.render('forms/my-forms')
  })

  // Feedback
  router.get('/forms/feedback', function (req, res) {
    res.render('forms/feedback')
  })

  // Signout
  router.get('/forms/signout', function (req, res) {
    res.render('forms/signout')
  })
}
