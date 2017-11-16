module.exports = function(router) {


  // Director Email Addresses
  router.post('/forms/DS01/sole-director/directors', function (req, res) {
    var presenter = req.body.presenter;
    if (presenter == null) {
      res.render('forms/DS01/sole-director/directors');
    } else {
      if (presenter == "No") {
        res.redirect('/forms/DS01/sole-director/presenter-details');
      } else {
        res.redirect("/forms/DS01/sole-director/how-are-you-signing");
      }
    }
  });

  //Presenter info
  router.post('/forms/DS01/sole-director/presenter-details', function (req, res) {
    res.render('forms/DS01/sole-director/presenter-details');
  });

  //Presenter info review page
  router.post('/forms/DS01/sole-director/presenter-review', function (req, res) {
    res.render('forms/DS01/sole-director/presenter-review');
  });

  //How are you signing for this director
  router.post('/forms/DS01/sole-director/how-are-you-signing', function (req, res) {
    res.render('forms/DS01/sole-director/how-are-you-signing');
  });

  // Docusign
  router.post('/forms/DS01/sole-director/docusign', function (req, res) {
    res.render('forms/DS01/sole-director/docusign');
  });

  // Docusign - Add Sig
  router.post('/forms/DS01/sole-director/add-sig', function (req, res) {
    res.render('forms/DS01/sole-director/add-sig');
  });

  // Docusign - Sig Tool
  router.post('/forms/DS01/sole-director/signature-tool', function (req, res) {
    res.render('forms/DS01/sole-director/signature-tool');
  });

  // Docusign - Sig Confirmation
  router.post('/forms/DS01/sole-director/signature-confirmation', function (req, res) {
    res.render('forms/DS01/sole-director/signature-confirmation');
  });

  // Signature Request Review
  router.post('/forms/DS01/sole-director/review', function (req, res) {
    res.render('forms/DS01/sole-director/review');
  });

  // Docusign - Payment
  router.post('/forms/DS01/sole-director/payment', function (req, res) {
    res.render('forms/DS01/sole-director/payment');
  });

  // email-sent
  router.post('/forms/DS01/sole-director/email-sent', function (req, res) {
    res.render('forms/DS01/sole-director/email-sent');
  });

  // Docusign - Confirmation
  router.post('/forms/DS01/sole-director/confirmation', function (req, res) {
    res.render('forms/DS01/sole-director/confirmation');
  });

  // checkbox page
  router.post('/forms/DS01/sole-director/approve-application', function (req, res) {
    res.render('forms/DS01/sole-director/approve-application');
  });



};
