module.exports = function(router) {

  // Forms Service Start Page
  router.get('/forms/DS01/collection', function (req, res) {
    res.render('forms/DS01/collection');
  });

  // Forms Service Start Page
  router.get('/forms/DS01/start', function (req, res) {
    res.render('forms/DS01/start');
  });

  // Checklist
  router.get('/forms/DS01/before-you-start', function (req, res) {
    res.render('forms/DS01/before-you-start');
  });

  // Company Information
  router.post('/forms/DS01/company-details', function (req, res) {
    res.render('forms/DS01/company-details');
  });

  // Authentication code
  router.post('/forms/DS01/auth-code', function (req, res) {
    res.render('forms/DS01/auth-code');
  });
  
  // Company Confirmation
  router.post('/forms/DS01/confirm-company', function (req, res) {
    res.render('forms/DS01/confirm-company');
  });



};
