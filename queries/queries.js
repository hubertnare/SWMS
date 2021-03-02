var promise = require('bluebird');
var parserObj = require('parse-ini');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var params = parserObj.parse('./config/dbcon.ini');
var connectionString = 'postgres://' + params.user + ':' + params.password + '@' + params.host + ':' + params.port + '/' + params.database;
var db = pgp(connectionString);

//Login Function
function Login(req, res, next) {
    var username = req.params.username;
    var sql = 'SELECT employees.emp_id, employees.username, employees.password, roles.role FROM '+ 
              'employees INNER JOIN roles ON employees.role = roles.role_id WHERE employees.username = $1';

    db.any(sql, username)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

//Get Specific User
function getUsername(req, res, next) {
    var username = req.body || {};

    db.any('SELECT name, surname FROM employees WHERE emp_id = $1', [username.user_id])
        .then(function (user) {
            res.status(200)
                .json({
                    status: 'success',
                    user: user,
                    message: 'User Retrieved Successfully'
                });
        });
}

// Function To Retrieve User Roles
function getRole(req, res, next) {
    var sql = "SELECT * FROM roles";

    db.any(sql)
        .then(function (role) {
            res.status(200)
                .json({
                    roles: role
                });
        });
}

// Add Roles Function
function addRole(req, res, next) {
    var role = req.body || {};

    db.none("INSERT INTO roles(role) VALUES($1)", [role.role])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Role Successfully Added'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

// Edit Role Function
function updateRole(req, res, next) {
    var role = req.body || {};
    var sql = "UPDATE roles SET role=$1 WHERE role_id=$2";

    db.none(sql, [role.role, role.role_id])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Update Successful'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

// Add User Function
function addEmployee(req, res, next) {
    var user = req.body || {};
    var sql = "INSERT INTO employees(username, name, surname, role, password) VALUES($1, $2, $3, $4, $5)";

    db.none(sql, [user.username, user.firstname, user.surname, user.role_id, user.password])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Employee Successfully Added'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

//Function To Retrieve All employees
function getEmployees(req, res, next) {
    var sql = "SELECT employees.emp_id,employees.username,employees.name,employees.surname,employees.surname" +
              ", roles.role FROM employees INNER JOIN roles ON roles.role_id = employees.role";

    db.any(sql)
        .then(function (employees) {
            res.status(200)
                .json({
                    status: 'success',
                    employees: employees,
                    message: 'All employees Successfully Retrieved'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


//Function To Update Employee Data
function updateEmployee(req, res, next) {
    var user = req.body || {};
    var sql = "UPDATE employees SET username=$1, name=$2, surname=$3, role=$4, password=$5 WHERE emp_id=$6";

    db.none(sql, [user.username, user.fname, user.surname, user.role_id, user.password, user.user_id])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'User Data Updated Successfully'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

// Add Vehicle Function
function addVehicle(req, res, next) {
    var vehicle = req.body || {};
    var sql = "INSERT INTO vehicles(name,type,capacity,use) VALUES($1,$2,$3,$4)";

    db.none(sql, [vehicle.name,vehicle.type,vehicle.capacity,vehicle.use])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Vehicle Successfully Added'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

// Function To Retrieve Vehicles
function getVehicle(req, res, next) {
    var sql = "SELECT * FROM vehicles";

    db.any(sql)
        .then(function (vehicle) {
            res.status(200)
                .json({
                    vehicles: vehicle
                });
        });
}


//Function To Update Vehicle Data
function updateVehicle(req, res, next) {
    var vehicle = req.body || {};
    var sql = "UPDATE vehicles SET name=$1, type=$2, capacity=$3, use=$4 WHERE vehicle_id=$5";

    db.none(sql, [vehicle.name, vehicle.type, vehicle.capacity, vehicle.use, vehicle.vehicle_id])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Vehicle Data Updated Successfully'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

// Add Waste Category Function
function addWasteCategory(req, res, next) {
    var waste = req.body || {};
    var sql = "INSERT INTO waste(waste_type,waste_source) VALUES($1,$2)";

    db.none(sql, [waste.waste_type, waste.waste_source])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Waste Category Successfully Added'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

// Function To Retrieve Waste Categories
function getWasteCategories(req, res, next) {
    var sql = "SELECT * FROM waste";

    db.any(sql)
        .then(function (wastecategory) {
            res.status(200)
                .json({
                    wastecategory: wastecategory
                });
        });
}

//Function To Update Waste Category
function updateWasteCategory(req, res, next) {
    var wastecat = req.body || {};
    var sql = "UPDATE waste SET waste_type=$1, waste_source=$2 WHERE waste_id=$3";

    db.none(sql, [wastecat.waste_type, wastecat.waste_source, wastecat.waste_id])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Waste Category Updated Successfully'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

// Add Waste Bins Function
function addWasteBin(req, res, next) {
    var wastebin = req.body || {};
    var sql = "INSERT INTO wastebins(type,volume,wastetype,geom) VALUES('" + wastebin.type + "','" + wastebin.volume +"',"+
        "'" + wastebin.wastetype + "', ST_GeomFromText('POINT(" + wastebin.geom +")', 4326))";

    db.none(sql)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Waste Bin Successfully Added'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

// Function To Retrieve Waste Categories
function getWasteBins(req, res, next) {
    var sql = "SELECT 'Feature' As type ,ST_AsGeoJSON(geom):: json As geometry" +
        ",row_to_json((SELECT l FROM(SELECT DISTINCT(wastebins.bin_id), wastebins.type, wastebins.volume, waste.waste_type," +
        "waste.waste_source) As l)) As properties FROM wastebins INNER JOIN waste ON waste.waste_id = wastebins.wastetype"+
        " ORDER BY wastebins.bin_id DESC";

    db.any(sql)
        .then(function (wastebin) {
            res.status(200)
                .json({
                    type: "FeatureCollection",
                    features: wastebin,
                    message: 'Wastebins Retrieved Successfully'
                });
        });
}

//Retrieve Zones
function getZones(req, res, next) {
    var sql = "SELECT 'Feature' As type ,ST_AsGeoJSON(geom):: json As geometry" +
        ",row_to_json((SELECT l FROM(SELECT DISTINCT(zones.zone_id), zones.name, zones.area,"+
        " zones.percentage_waste_composition," +
        "zones.description) As l)) As properties FROM zones ORDER BY zones.zone_id DESC";

    db.any(sql)
        .then(function (zone) {
            res.status(200)
                .json({
                    type: "FeatureCollection",
                    features: zone,
                    message: 'Zones Retrieved Successfully'
                });
        });
}

// Add Employee Data to timecard
function allocateDuty(req, res, next) {
    var timecard = req.body || {};
    var sql = "INSERT INTO timecard(start_time,job_description,emp_id,zone,supervisor) VALUES($1,$2,$3,$4,$5)";

    db.none(sql, [timecard.time,timecard.job,timecard.emp_id,timecard.zone,timecard.supervisor])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Duty Allocated Successfully'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

//Retrieve Timecard data
function getDuties(req, res, next) {
    var duty = req.body || {};
    var sql = "SELECT timecard.timecard_id,timecard.date,timecard.start_time,timecard.end_time,"+
              "timecard.job_description,employees.name,employees.surname, zones.name AS zone"+
              " FROM timecard INNER JOIN employees ON timecard.emp_id = employees.emp_id INNER JOIN zones"+
              " ON zones.zone_id = timecard.zone WHERE timecard.supervisor = $1 ORDER BY timecard.timecard_id DESC";

    db.any(sql,[duty.user_id])
        .then(function (duty) {
            res.status(200)
                .json({
                    status: 'success',
                    duty: duty,
                    message: 'Duties Successfully Retrieved'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

//Retrieve Employee Timecard data
function getEmpDuties(req, res, next) {
    var duty = req.body || {};
    var sql = "SELECT timecard.timecard_id,timecard.date,timecard.start_time,timecard.end_time," +
        "timecard.job_description,employees.name,employees.surname, zones.name AS zone" +
        " FROM timecard INNER JOIN employees ON timecard.supervisor = employees.emp_id INNER JOIN zones" +
        " ON zones.zone_id = timecard.zone WHERE timecard.emp_id = $1 ORDER BY timecard.timecard_id DESC";

    db.any(sql, [duty.user_id])
        .then(function (duty) {
            res.status(200)
                .json({
                    status: 'success',
                    duty: duty,
                    message: 'Duties Successfully Retrieved'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

//Function To Update timecard
function updateTimecard(req, res, next) {
    var timecard = req.body || {};
    var sql = "UPDATE timecard SET end_time=$1 WHERE timecard_id=$2";

    db.none(sql, [timecard.end_time, timecard.timecard_id])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Timecard Updated Successfully'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
  Login: Login,
  getUsername: getUsername,
  getRole: getRole,
  addRole: addRole,
  updateRole: updateRole,
  addEmployee: addEmployee,
  getEmployees: getEmployees,
  updateEmployee: updateEmployee,
  addVehicle: addVehicle,
  getVehicle: getVehicle,
  updateVehicle: updateVehicle,
  addWasteCategory: addWasteCategory,
  getWasteCategories: getWasteCategories,
  updateWasteCategory: updateWasteCategory,
  addWasteBin: addWasteBin,
  getWasteBins: getWasteBins,
  getZones: getZones,
  allocateDuty: allocateDuty,
  getDuties: getDuties,
  getEmpDuties: getEmpDuties,
  updateTimecard: updateTimecard
};