module.exports = function(router) {


  router.post('/forms/DS01/multiple-director/confirm-company', function (req, res) {
    res.render('forms/DS01/multiple-director/confirm-company');
  });

  // List of company directors,are you one of these
  router.post('/forms/DS01/multiple-director/directors-list', function (req, res) {
    var information = req.body.information;
    if (information == null) {
      res.render('forms/DS01/multiple-director/directors-list');
    } else {
      if (information == "No") {
        res.redirect('/forms/DS01/multiple-director/change-directors');
      } else {
        res.redirect("/forms/DS01/multiple-director/are-you-a-direc");
      }
    }
  });

  // Are you one of the directors?
  router.post('/forms/DS01/multiple-director/are-you-a-direc', function (req, res) {
    var presenter = req.body.presenter;
    if (presenter == null) {
      res.render('forms/DS01/multiple-director/are-you-a-direc');
    } else {
      if (presenter == "No") {
        var sess = req.session;
        sess.presenterOnly = "yes";
        res.redirect("/forms/DS01/multiple-director/other-directors");
      } else {
        res.redirect("/forms/DS01/multiple-director/other-directors");
      }
    }
  });

  // Yes I'm a director, which one are you
  router.post('/forms/DS01/multiple-director/which-direc-are-you', function (req, res) {
    res.render('forms/DS01/multiple-director/which-direc-are-you');
  });

  // Docusign
  router.post('/forms/DS01/multiple-director/docusign', function (req, res) {
    res.render('forms/DS01/multiple-director/docusign');
  });

  // Signature
  router.post('/forms/DS01/multiple-director/docusign-signature', function (req, res) {
    res.render('forms/DS01/multiple-director/docusign-signature');
  });

  // What are the other directors email addresses
  router.get('/forms/DS01/multiple-director/other-directors', function (req, res) {
    var sess = req.session;
    sess.director = req.body.whichDir;

    directorArray = ["David Arthur Templeton","Cathy Nicholas","UK Metal Work Limited","Steve Jones"];


    console.log(directorArray);

    //console.log(sess.director);
    var directorCount = "";

    if (sess.director) {
      var position = directorArray.indexOf(sess.director);
      directorArray.splice(position, 1);
      directorCount = 2;
    } else {
      directorCount = 3;
    }

    res.render('forms/DS01/multiple-director/other-directors', {'directorCount': directorCount, 'directorArray': directorArray});
  });

  // What are the other directors email addresses
  router.post('/forms/DS01/multiple-director/other-directors', function (req, res) {

    var sess = req.session;

    var routeCheck = req.body.routeCheck;
    if (routeCheck == null) {

      sess.director = req.body.whichDir;
      directorArray = ["David Arthur Templeton","Cathy Nicholas","UK Metal Work Limited","Steve Jones"];
      var directorCount = "";
      if (sess.director) {
        var position = directorArray.indexOf(sess.director);
        directorArray.splice(position, 1);
        directorCount = 2;
      } else {
        directorCount = 3;
      }
      res.render('forms/DS01/multiple-director/other-directors', {'directorCount': directorCount, 'directorArray': directorArray});

    } else {
      if (sess.director) {
        res.redirect("/forms/DS01/multiple-director/directors-emails");
      } else {
        res.redirect("/forms/DS01/multiple-director/sign-on-behalf");
      }
    }

    /*
    var sess = req.session;
    sess.director = req.body.whichDir;

    directorArray = ["David Arthur Templeton","Cathy Nicholas","UK Metal Work Limited","Steve Jones"];


    console.log(directorArray);

    //console.log(sess.director);
    var directorCount = "";

    if (sess.director) {
    var position = directorArray.indexOf(sess.director);
    directorArray.splice(position, 1);
    directorCount = 2;
  } else {
  directorCount = 3;
}

res.render('forms/DS01/multiple-director/other-directors', {'directorCount': directorCount, 'directorArray': directorArray});
*/
});

// Review your application
router.post('/forms/DS01/multiple-director/review', function (req, res) {
  res.render('forms/DS01/multiple-director/review');
});

//email sent
router.post('/forms/DS01/multiple-director/email-sent.html', function (req, res) {
  res.render('/forms/DS01/multiple-director/email-sent.html');
});

// No I'm, not a director, prersenter details
router.post('/forms/DS01/multiple-director/presenter-details', function (req, res) {
  res.render('forms/DS01/multiple-director/presenter-details');
});

router.post('/forms/DS01/multiple-director/directors-emails', function (req, res) {
  res.render('forms/DS01/multiple-director/directors-emails');
});

router.post('/forms/DS01/multiple-director/sign-on-behalf', function (req, res) {
    var information = req.body.signOnBehalf;
    if (information == null) {
      res.render('forms/DS01/multiple-director/sign-on-behalf');
    } else {
      if (information == "No") {
        res.redirect('/forms/DS01/multiple-director/docusign');
      } else {
        res.redirect("/forms/DS01/multiple-director/direc-details-sign-on-behalf");
      }
    }
  });

  router.post('/forms/DS01/multiple-director/direc-details-sign-on-behalf', function (req, res) {
    res.render('forms/DS01/multiple-director/direc-details-sign-on-behalf');
  });

  router.post('/forms/DS01/multiple-director/poa-deceased-corp', function (req, res) {
    res.render('forms/DS01/multiple-director/poa-deceased-corp');
  });

  router.post('/forms/DS01/multiple-director/approve-application', function (req, res) {
    res.render('forms/DS01/multiple-director/approve-application');
  });


};
