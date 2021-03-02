var express = require('express');
var path = require('path');
var router = express.Router();

var db = require('../queries/queries');

router.post('/api/users/:username', db.Login);
router.post('/api/getusername', db.getUsername);
router.get('/api/roles', db.getRole);
router.post('/api/addrole', db.addRole);
router.post('/api/updaterole', db.updateRole);
router.post('/api/addemployee', db.addEmployee);
router.get('/api/employees', db.getEmployees);
router.post('/api/updateemployee', db.updateEmployee);
router.post('/api/addvehicle', db.addVehicle);
router.get('/api/vehicles', db.getVehicle);
router.post('/api/updatevehicle', db.updateVehicle);
router.post('/api/addwastecategory', db.addWasteCategory);
router.get('/api/wastecategory', db.getWasteCategories);
router.post('/api/updatewastecategory', db.updateWasteCategory);
router.post('/api/addwastebin', db.addWasteBin);
router.get('/api/wastebins', db.getWasteBins);
router.get('/api/zones', db.getZones);
router.post('/api/allocateduty', db.allocateDuty);
router.post('/api/duties', db.getDuties);
router.post('/api/empduties', db.getEmpDuties);
router.post('/api/updatetimecard', db.updateTimecard);



module.exports = router;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

/* GET Super Admin page. */
router.get('/superadmin', function (req, res, next) {
  res.render('superadmin');
});

/* GET Supervisor page. */
router.get('/supervisor', function (req, res, next) {
  res.render('supervisor');
});

/* GET Cleaner page. */
router.get('/cleaner', function (req, res, next) {
  res.render('cleaner');
});

/* GET Driver page. */
router.get('/driver', function (req, res, next) {
  res.render('driver');
});

/* GET Error page. */
router.get('/error404', function (req, res, next) {
  res.render('error404');
});


module.exports = router;
