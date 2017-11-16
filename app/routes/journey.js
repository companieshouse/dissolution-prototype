module.exports = function (router) {
  // Service Start Page
  router.get('/', function (req, res) {
    req.session.destroy()
    res.render('journey/start')
  })
  router.get('/start', function (req, res) {
    req.session.destroy()
    res.render('journey/start')
  })

  // Who you have to tell
  router.get('/who-you-have-to-tell', function (req, res) {
    res.render('journey/who-you-have-to-tell')
  })
  router.post('/who-you-have-to-tell', function (req, res) {
    var declarationErr = {}

    if (req.body.declaration !== '_unchecked') {
      req.session.declaration = req.body.declaration
      res.redirect('/sign-in')
    } else {
      declarationErr.msg = 'The director(s) must agree to tell all interested parties.'
      res.render('journey/who-you-have-to-tell', {
        declarationErr: declarationErr
      })
    }
  })

  // Which company to close
  router.get('/which-company-to-close', function (req, res) {
    res.render('journey/which-company-to-close')
  })
  router.post('/which-company-to-close', function (req, res) {
    var companyNumber = req.body.companyNumber
    var companyNumberErr = {}
    var errorFlag = false
    var scenario = {}

    if (companyNumber === '') {
      companyNumberErr.type = 'blank'
      companyNumberErr.msg = 'Enter a company number to continue'
      companyNumberErr.flag = true
      errorFlag = true
    } else if (companyNumber.length < 8) {
      companyNumberErr.type = 'invalid'
      companyNumberErr.msg = 'You must enter a full eight character company number'
      companyNumberErr.flag = true
      errorFlag = true
    } else if (companyNumber.length > 8) {
      companyNumberErr.type = 'invalid'
      companyNumberErr.msg = 'Enter a valid 8 character company number'
      companyNumberErr.flag = true
      errorFlag = true
    } else {
      if (companyNumber === '00035440') {
        scenario = require('../assets/data/scenario-1.json')
      } else if (companyNumber === '00078600') {
        scenario = require('../assets/data/scenario-2.json')
      } else {
        companyNumberErr.type = 'no data'
        companyNumberErr.msg = 'There\'s no company matching that company number'
        companyNumberErr.flag = true
        errorFlag = true
      }
    }

    if (errorFlag === true) {
      res.render('journey/which-company-to-close', {
        companyNumber: companyNumber,
        companyNumberErr: companyNumberErr
      })
    } else {
      req.session.scenario = scenario
      res.redirect('/confirm-the-company')
    }
  })

  // Confirm the company
  router.get('/confirm-the-company', function (req, res) {
    var scenario = req.session.scenario

    if (scenario != null) {
      res.render('journey/confirm-the-company', {
        scenario: scenario
      })
    } else {
      res.redirect('/start')
    }
  })

  // Review company directors
  router.get('/review-company-directors', function (req, res) {
    var scenario = req.session.scenario
    var directorMajority = 0
    var userEmail = req.session.userEmail
    var totalDirectors = 0

    if (scenario != null) {
      directorMajority = Math.ceil((scenario.company.directors.length / 2))
      totalDirectors = scenario.company.directors.length
      res.render('journey/review-company-directors', {
        scenario: scenario,
        directorMajority: directorMajority,
        userEmail: userEmail,
        totalDirectors: totalDirectors
      })
    } else {
      res.redirect('/start')
    }
  })

  router.post('/review-company-directors', function (req, res) {
    var scenario = req.session.scenario
    var userEmail = req.session.userEmail
    var authOnBehalf = req.body.authOnBehalf
    var presenter = {}
    var totalDirectors = 0
    var directorMajority = 0
    var authOnBehalfErr = {}
    var errorFlag = false

    if (authOnBehalf !== 'Yes' && authOnBehalf !== 'No') {
      authOnBehalfErr.type = 'blank'
      authOnBehalfErr.msg = 'You need to tell us if you\'re approving this application for a director'
      authOnBehalfErr.flag = true
      errorFlag = true
    }

    if (scenario != null) {
      totalDirectors = scenario.company.directors.length
      directorMajority = Math.ceil((totalDirectors / 2))
      if (errorFlag === true) {
        res.render('journey/review-company-directors', {
          scenario: scenario,
          directorMajority: directorMajority,
          userEmail: userEmail,
          authOnBehalfErr: authOnBehalfErr,
          totalDirectors: totalDirectors
        })
      } else {
        req.session.authOnBehalf = authOnBehalf
        presenter.name = req.body.presenterName
        presenter.number = req.body.presenterNumber
        req.session.presenter = presenter
        if (totalDirectors > 1) {
          if (authOnBehalf === 'No') {
            res.redirect('/which-directors-will-approve-application')
          } else {
            res.redirect('/which-director-are-you-approving-for')
          }
        } else {
          if (authOnBehalf === 'No') {
            res.redirect('/provide-director-contact-details')
          } else {
            res.redirect('/are-you-the-director')
          }
        }
      }
    } else {
      res.redirect('/start')
    }
  })

  // Which directors will approve this application
  router.get('/which-directors-will-approve-application', function (req, res) {
    var scenario = req.session.scenario
    var totalDirectors = 0
    var directorMajority = 0
    var approvingFor = {}

    if (scenario != null) {
      if (req.session.approvingFor) {
        approvingFor = req.session.approvingFor
        totalDirectors = scenario.company.directors.length
        directorMajority = Math.ceil((totalDirectors / 2)) - 1

        res.render('journey/which-directors-will-approve-application', {
          scenario: scenario,
          directorMajority: directorMajority,
          totalDirectors: totalDirectors,
          approvingFor: approvingFor
        })
      } else {
        totalDirectors = scenario.company.directors.length
        directorMajority = Math.ceil((totalDirectors / 2))

        res.render('journey/which-directors-will-approve-application', {
          scenario: scenario,
          directorMajority: directorMajority,
          totalDirectors: totalDirectors
        })
      }
    } else {
      res.redirect('/start')
    }
  })

  router.post('/which-directors-will-approve-application', function (req, res) {
    var scenario = req.session.scenario
    var totalDirectors = 0
    var directorMajority = 0
    var i = 0
    var directorApprove = req.body.directorApprove
    var directorApproveErr = {}
    var tempEmailErr = {}
    var directorEmails = {}
    var approvingFor = {}
    var errorFlag = false

    if (scenario != null) {
      if (req.session.approvingFor) {
        approvingFor = req.session.approvingFor
        totalDirectors = scenario.company.directors.length
        directorMajority = Math.ceil((totalDirectors / 2)) - 1
      } else {
        totalDirectors = scenario.company.directors.length
        directorMajority = Math.ceil((totalDirectors / 2))
      }

      if (directorApprove.length < directorMajority || directorApprove === '_unchecked') {
        directorApproveErr.type = 'invalid'
        directorApproveErr.msg = 'At least ' + directorMajority + ' directors must approve this application'
        directorApproveErr.flag = true
        errorFlag = true
      }

      if (directorApprove !== '_unchecked') {
        for (i = 0; i < directorApprove.length; i++) {
          if (req.body['director' + directorApprove[i] + 'Email'] === '') {
            tempEmailErr[directorApprove[i]] = {}
            tempEmailErr[directorApprove[i]].msg = 'You must enter an email address for ' + scenario.company.directors[directorApprove[i]].name
            tempEmailErr[directorApprove[i]].id = directorApprove[i]
            tempEmailErr[directorApprove[i]].flag = true
            errorFlag = true
          } else {
            directorEmails[directorApprove[i]] = {}
            directorEmails[directorApprove[i]].name = scenario.company.directors[directorApprove[i]].name
            directorEmails[directorApprove[i]].type = scenario.company.directors[directorApprove[i]].type
            directorEmails[directorApprove[i]].id = scenario.company.directors[directorApprove[i]].ID
            directorEmails[directorApprove[i]].email = req.body['director' + directorApprove[i] + 'Email']
          }
        }
      }

      if (errorFlag === true) {
        res.render('journey/which-directors-will-approve-application', {
          scenario: scenario,
          directorMajority: directorMajority,
          totalDirectors: totalDirectors,
          directorApproveErr: directorApproveErr,
          directorApprove: directorApprove,
          tempEmailErr: tempEmailErr,
          directorEmails: directorEmails,
          approvingFor: approvingFor
        })
      } else {
        req.session.approvingDirectors = directorEmails
        res.redirect('/review-application')
      }
    } else {
      res.redirect('/start')
    }
  })

  // Provide director contact details
  router.get('/provide-director-contact-details', function (req, res) {
    var scenario = req.session.scenario

    if (scenario != null) {
      res.render('journey/provide-director-contact-details', {
        scenario: scenario
      })
    } else {
      res.redirect('/start')
    }
  })

  router.post('/provide-director-contact-details', function (req, res) {
    var scenario = req.session.scenario
    var approverEmail = req.body.approverEmail
    var approvingErr = {}
    var errorFlag = false

    if (scenario != null) {
      if (approverEmail === '') {
        approvingErr.type = 'blank'
        approvingErr.msg = 'Tell us ' + scenario.company.directors[0].name + '\'s email address to continue'
        approvingErr.flag = true
        errorFlag = true
      }
      if (errorFlag === true) {
        res.render('journey/provide-director-contact-details', {
          scenario: scenario,
          approvingErr: approvingErr
        })
      } else {
        req.session.approverEmail = approverEmail
        res.redirect('/review-application')
      }
    } else {
      res.redirect('/start')
    }
  })

  // Which director are you approving for
  router.get('/which-director-are-you-approving-for', function (req, res) {
    var scenario = req.session.scenario

    if (scenario != null) {
      res.render('journey/which-director-are-you-approving-for', {
        scenario: scenario
      })
    } else {
      res.redirect('/start')
    }
  })

  router.post('/which-director-are-you-approving-for', function (req, res) {
    var scenario = req.session.scenario
    var directorApproveErr = {}
    var chosenDirector = req.body.directorApprove
    var approvingFor = {}
    var errorFlag = false
    var i = 0

    if (typeof chosenDirector === 'undefined') {
      directorApproveErr.type = 'blank'
      directorApproveErr.msg = 'Choose a director to approve for'
      directorApproveErr.flag = true
      errorFlag = true
    }

    if (scenario != null) {
      if (errorFlag === true) {
        res.render('journey/which-director-are-you-approving-for', {
          scenario: scenario,
          directorApproveErr: directorApproveErr
        })
      } else {
        for (i = 0; i < scenario.company.directors.length; i++) {
          if (chosenDirector === scenario.company.directors[i].ID) {
            approvingFor.name = scenario.company.directors[i].name
            approvingFor.id = chosenDirector
            approvingFor.type = scenario.company.directors[i].type
          }
        }
        req.session.approvingFor = approvingFor
        if (approvingFor.type === 'Person') {
          res.redirect('/why-are-you-approving-for-this-director')
        } else {
          res.redirect('/approving-for-a-corporate-director')
        }
      }
    } else {
      res.redirect('/start')
    }
  })

  // Approving for a corporate director
  router.get('/approving-for-a-corporate-director', function (req, res) {
    var scenario = req.session.scenario
    var approvingFor = req.session.approvingFor

    if (scenario != null) {
      res.render('journey/approving-for-a-corporate-director', {
        scenario: scenario,
        approvingFor: approvingFor
      })
    } else {
      res.redirect('/start')
    }
  })

  // Approving for a corporate director
  router.post('/approving-for-a-corporate-director', function (req, res) {
    var scenario = req.session.scenario
    var approvingFor = req.session.approvingFor
    var approverName = req.body.approverName
    var approvingErr = {}
    var errorFlag = false

    if (approverName === '') {
      approvingErr.type = 'blank'
      approvingErr.msg = 'Tell us your name to continue'
      approvingErr.flag = true
      errorFlag = true
    }

    if (scenario != null) {
      if (errorFlag === true) {
        res.render('journey/approving-for-a-corporate-director', {
          scenario: scenario,
          approvingFor: approvingFor,
          approvingErr: approvingErr
        })
      } else {
        req.session.approverName = approverName
        res.redirect('/provide-approval')
      }
    } else {
      res.redirect('/start')
    }
  })

  // Why are you approving for this director
  router.get('/why-are-you-approving-for-this-director', function (req, res) {
    var scenario = req.session.scenario
    var approvingFor = req.session.approvingFor

    if (scenario != null) {
      res.render('journey/why-are-you-approving-for-this-director', {
        scenario: scenario,
        approvingFor: approvingFor
      })
    } else {
      res.redirect('/start')
    }
  })

  router.post('/why-are-you-approving-for-this-director', function (req, res) {
    var scenario = req.session.scenario
    var approvingFor = req.session.approvingFor
    var approvingReason = req.body.approvingReason
    var approvingReasonErr = {}
    var errorFlag = false

    if (typeof approvingReason === 'undefined') {
      approvingReasonErr.type = 'blank'
      approvingReasonErr.msg = 'Tell us why you\'re approving for ' + approvingFor.name
      approvingReasonErr.flag = true
      errorFlag = true
    }

    if (scenario != null) {
      if (errorFlag === true) {
        res.render('journey/why-are-you-approving-for-this-director', {
          scenario: scenario,
          approvingFor: approvingFor,
          approvingReasonErr: approvingReasonErr
        })
      } else {
        req.session.approvingReason = approvingReason
        res.redirect('/provide-approval')
      }
    } else {
      res.redirect('/start')
    }
  })

  // Provide approval
  router.get('/provide-approval', function (req, res) {
    var scenario = req.session.scenario
    var d = new Date()
    var signatureDate = ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear()
    var signedLink = ''
    var backLink = req.get('Referrer')
    var totalDirectors = 0
    var approvingFor = ''
    var authOnBehalf = ''
    var approverName = ''
    var approvingReason = ''

    if (scenario != null) {
      totalDirectors = scenario.company.directors.length
      authOnBehalf = req.session.authOnBehalf

      if (totalDirectors > 1) {
        if (authOnBehalf === 'Yes') {
          approvingReason = req.session.approvingReason
          approverName = req.session.approverName
          approvingFor = req.session.approvingFor
          signedLink = '/which-directors-will-approve-application'
        }
      } else {
        if (authOnBehalf === 'Yes') {
          approvingFor = scenario.company.directors[0]
          signedLink = '/choose-payment-method'
        }
      }
      res.render('journey/provide-approval', {
        scenario: scenario,
        approvingFor: approvingFor,
        approverName: approverName,
        approvingReason: approvingReason,
        signatureDate: signatureDate,
        signedLink: signedLink,
        backLink: backLink
      })
    } else {
      res.redirect('/start')
    }
  })

  // Are you the director
  router.get('/are-you-the-director', function (req, res) {
    var scenario = req.session.scenario

    if (scenario != null) {
      res.render('journey/are-you-the-director', {
        scenario: scenario
      })
    } else {
      res.redirect('/start')
    }
  })

  router.post('/are-you-the-director', function (req, res) {
    var scenario = req.session.scenario
    var isDirector = req.body.isDirector
    var isDirectorErr = {}
    var errorFlag = false

    if (typeof isDirector === 'undefined') {
      isDirectorErr.type = 'blank'
      isDirectorErr.msg = 'You need to tell us if you\'re the director'
      isDirectorErr.flag = true
      errorFlag = true
    }

    if (scenario != null) {
      if (errorFlag === true) {
        res.render('journey/are-you-the-director', {
          scenario: scenario,
          isDirectorErr: isDirectorErr
        })
      } else {
        req.session.isDirector = isDirector
        if (isDirector === 'Yes') {
          res.redirect('/provide-approval')
        } else {
          res.redirect('/do-you-have-power-of-attorney')
        }
      }
    } else {
      res.redirect('/start')
    }
  })

  // Do you have power of attorney
  router.get('/do-you-have-power-of-attorney', function (req, res) {
    var scenario = req.session.scenario

    if (scenario != null) {
      res.render('journey/do-you-have-power-of-attorney', {
        scenario: scenario
      })
    } else {
      res.redirect('/start')
    }
  })

  router.post('/do-you-have-power-of-attorney', function (req, res) {
    var scenario = req.session.scenario
    var hasPOA = req.body.hasPOA
    var hasPOAErr = {}
    var errorFlag = false

    if (typeof hasPOA === 'undefined') {
      hasPOAErr.type = 'blank'
      hasPOAErr.msg = 'You need to tell us if you\'ve got power of attorney for the director'
      hasPOAErr.flag = true
      errorFlag = true
    }

    if (scenario != null) {
      if (errorFlag === true) {
        res.render('journey/do-you-have-power-of-attorney', {
          scenario: scenario,
          hasPOAErr: hasPOAErr
        })
      } else {
        req.session.hasPOA = hasPOA
        if (hasPOA === 'Yes') {
          res.redirect('/provide-approval')
        } else {
          res.redirect('/director-must-provide-approval')
        }
      }
    } else {
      res.redirect('/start')
    }
  })

  // Director must provide approval
  router.get('/director-must-provide-approval', function (req, res) {
    var scenario = req.session.scenario

    if (scenario != null) {
      res.render('journey/director-must-provide-approval', {
        scenario: scenario
      })
    } else {
      res.redirect('/start')
    }
  })

  // Choose payment method
  router.get('/choose-payment-method', function (req, res) {
    var scenario = req.session.scenario
    var backLink = req.get('Referrer')

    if (scenario != null) {
      res.render('journey/choose-payment-method', {
        scenario: scenario,
        backLink: backLink
      })
    } else {
      res.redirect('/start')
    }
  })

  router.post('/choose-payment-method', function (req, res) {
    var scenario = req.session.scenario
    var paymentMethod = req.body.paymentMethod
    var accountName = req.body.accountName
    var accountNumber = req.body.accountNumber
    var paymentErr = {}
    var accountNameErr = {}
    var accountNumberErr = {}
    var errorFlag = false

    if (typeof paymentMethod === 'undefined') {
      paymentErr.type = 'blank'
      paymentErr.msg = 'You need to tell us how you want to pay for this application'
      paymentErr.flag = true
      errorFlag = true
    }

    if (paymentMethod === 'account') {
      if (accountName === '') {
        accountNameErr.msg = 'Tell us your account name'
        accountNameErr.type = 'blank'
        accountNameErr.flag = true
        errorFlag = true
      }
      if (accountNumber === '') {
        accountNumberErr.msg = 'Tell us your account number'
        accountNumberErr.type = 'blank'
        accountNumberErr.flag = true
        errorFlag = true
      }
    }

    if (scenario != null) {
      if (errorFlag === true) {
        res.render('journey/choose-payment-method', {
          scenario: scenario,
          paymentErr: paymentErr,
          accountNameErr: accountNameErr,
          accountNumberErr: accountNumberErr,
          paymentMethod: paymentMethod,
          accountName: accountName,
          accountNumber: accountNumber
        })
      } else {
        req.session.paymentMethod = paymentMethod
        if (paymentMethod === 'account') {
          res.redirect('/provide-approval')
        } else {
          res.redirect('/payment-portal')
        }
      }
    } else {
      res.redirect('/start')
    }
  })

  // Payment portal
  router.get('/payment-portal', function (req, res) {
    var scenario = req.session.scenario

    if (scenario != null) {
      res.render('journey/payment-portal', {
        scenario: scenario
      })
    } else {
      res.redirect('/start')
    }
  })

  // Review application
  router.get('/review-application', function (req, res) {
    var scenario = req.session.scenario
    var approvingDirectors = {}
    var approvingFor = {}
    var authOnBehalf = ''
    var presenter = {}
    var userEmail = ''
    var approverEmail = ''

    if (scenario != null) {
      approvingDirectors = req.session.approvingDirectors
      authOnBehalf = req.session.authOnBehalf
      presenter = req.session.presenter
      userEmail = req.session.userEmail
      if (req.session.approverEmail) {
        approverEmail = req.session.approverEmail
      }
      if (req.session.approvingFor) {
        approvingFor = req.session.approvingFor
      }

      res.render('journey/review-application', {
        scenario: scenario,
        authOnBehalf: authOnBehalf,
        presenter: presenter,
        userEmail: userEmail,
        approvingFor: approvingFor,
        approverEmail: approverEmail,
        approvingDirectors: approvingDirectors
      })
    } else {
      res.redirect('/start')
    }
  })
}
