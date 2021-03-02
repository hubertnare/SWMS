swms = {
    initLogin: function () {
        $('#login').click(function () {

            var username = $('#username').val();
            var password = $('#password').val();

            var userData = {
                "username": username,
                "password": password
            };

            if (username != "" || password != "") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/users/" + userData.username.toString(),
                    data: userData,
                    success: function (res) {
                        user = res.data[0]; //Declare user globally

                        function WriteCookie() {
                            var now = new Date();
                            now.setMonth(now.getMonth() + 1);
                            cookievalue = escape(user.emp_id);
                            document.cookie = "name=" + cookievalue;
                            document.cookie = "expires=" + now.toUTCString();
                        }


                        if (user.password != userData.password) {
                            $.notify('Invalid User Password');
                        } else if (user.password == userData.password && user.role == "superadmin") {
                            WriteCookie();
                            window.location.href = "http://localhost:3000/superadmin";
                        } else if (user.password == userData.password && user.role == "supervisor") {
                            WriteCookie();
                            window.location.href = "http://localhost:3000/supervisor";
                        } else if (user.password == userData.password && user.role == "driver") {
                            WriteCookie();
                            window.location.href = "http://localhost:3000/driver";
                        } else if (user.password == userData.password && user.role == "cleaner") {
                            WriteCookie();
                            window.location.href = "http://localhost:3000/cleaner";
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('error happened' + errorThrown + textStatus);
                    }
                });
            }
            else {
                $.notify('Please Input Both Username and Password', 'info');
            }

        });
    },

    initCheckIfMobile: function () {
        var is_mobile = true;

        if ($('#checkMobile').css('display') == 'none') {
            is_mobile = false;
        }

        // now i can use is_mobile to run javascript conditionally
        if (is_mobile == true) {
            $('#pageLoad').html('Page Can Only Be Accessed in Desktop View...<button type="button" id="return" class="btn btn-danger">Previous Page</button>');
            $('#return').click(function () {
                window.location.href = 'http://localhost:3000';
            });
        }
    },

    initLogout: function () {
        //Signing Out
        $('#btnSignOut').click(function () {
            var allcookies = document.cookie;
            var cookiearray = allcookies.split(';');
            cookiearray.pop();
            var zitaromunhu = cookiearray.toString();

            function deleteCookie() {
                var now = new Date();
                now.setMonth(now.getMonth() - 1);
                cookievalue = escape(zitaromunhu);
                document.cookie = "name=" + cookievalue;
                document.cookie = "expires=" + now.toUTCString();
            }

            deleteCookie();
            window.location.href = 'http://localhost:3000';
        });
    },

    initUserDetails: function () {
        var allcookies = document.cookie;
        var cookiearray = allcookies.split(';');
        cookiearray.pop();
        var zitaromunhu = cookiearray.toString();
        var user_id = { 'user_id': zitaromunhu.slice(5) };

        // Get user Name
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/getusername',
            data: user_id,
            success: function (res) {
                var munhu = res.user[0];
                var username = munhu.name + '\t' + munhu.surname;
                $('#zita').html(username);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify('error happened' + errorThrown + textStatus);
            }
        });
    },

    initSlidebars: function () {

        // Create a new instance of Slidebars
        var controller = new slidebars();

        // Initialize Slidebars
        controller.init();

        $('.js-toggle-bottom-slidebar').on('click', function (event) {
            event.stopPropagation();
            controller.toggle('map-options-slider');
        });

        // Close any
        $(controller.events).on('opened', function () {
            $('[canvas="container"]').addClass('js-close-any-slidebar');
            var layerIcon = document.getElementById('layerIcon');
            layerIcon.style.color = 'red';
        });

        $(controller.events).on('closed', function () {
            $('[canvas="container"]').removeClass('js-close-any-slidebar');
            var layerIcon = document.getElementById('layerIcon');
            layerIcon.style.color = 'white';
        });

        $('body').on('click', '.js-close-any-slidebar', function (event) {
            controller.close();
        });

        $('#v-pills-lodged-wastebin-tab').on('click', function () {
            controller.close();
        });

        $('#v-pills-allocated-tasks-tab').on('click', function () {
            controller.close();
        });

        $('#v-pills-inbox-tab').on('click', function () {
            controller.close();
        });
    },

    initPopup: function () {
        $("#dialogAttributes").dialog({
            autoOpen: false,
            width: 250,
            buttons: [{
                text: "Close",
                click: function () {
                    $(this).dialog("close");
                },
                width: 90
            }]
        });

        $('[data-toggle="tooltip"]').tooltip();
    },

    initSuperAdmin: function () {

        //Get Roles List
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/roles",
            success: function (res) {
                var Roles = res.roles; 
                $.each(Roles, function (i, role) {
                    var option = "<option id='" + role.role_id + "'>" + role.role + "</option>";
                    $('#rolelist').append(option);
                    $('#editrolelist').append(option);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('error happened' + errorThrown + textStatus);
            }
        });

        //Add New Role
        $('#btnAddRole').click(function () {
            var role = $('#role').val();

            var data = { "role": role };

            if (role != "") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/addrole",
                    data: data,
                    success: function (res) {
                        $.notify(res.message, 'success');
                        location.reload(true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('error happened' + errorThrown + textStatus);
                    }
                });
            }
            else {
                $.notify('Please Fill in the New Role', 'info');
            }
        });

        //Edit Occupations
        $.ajax({
            cache: false,
            type: "GET",
            url: "http://localhost:3000/api/roles",
            success: function (res) {
                var data = res.roles;
                $.each(data, function (i, role) {
                    var occuList = '<li id="occup' + role.role_id + '" class="list-group-item d-flex justify-content-between align-items-center">' +
                        role.role +
                        '<span class="badge badge-pill">' +
                        '<div class="btn-group" role="group" aria-label="">' +
                        '<button id="btnEditRole' + i + '" type="button" class="btn btn-sm btn-outline-warning" data-toggle="modal" data-target="#modalEditOccupation">Edit</button>' +
                        '</div>' +
                        '</span>' +
                        '</li>';

                    $('#OccupationList').append(occuList);

                    $('#btnEditRole' + i).click(function () {
                        $('#occupationID').val(role.role_id);
                        $('#occupation').val(role.role);
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('error happened' + errorThrown + textStatus);
            }
        });

        $('#btnSaveRole').click(function () {
            var role = $('#occupation').val(),
                role_id = $('#occupationID').val();

            var occupation = {
                "role_id": role_id,
                "role": role
            };

            if (occupation != "") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/updaterole",
                    data: occupation,
                    success: function (res) {
                        $.notify(res.message, 'success');
                        location.reload(true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('error happened' + errorThrown + textStatus);
                    }
                });
            }
            else {
                $.notify('Please Fill in the New Role', 'info');
            }
        });

        //List Users
        var edit = $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/employees",
            success: function (res) {
                var Users = res.employees;

                $.each(Users, function (i, user) {

                    var tblBody = '<tr>' +
                        '<td class="text-capitalize">' + user.emp_id + '</td>' +
                        '<td>' + user.username + '</td>' +
                        '<td class="text-capitalize">' + user.name + '</td>' +
                        '<td class="text-capitalize">' + user.surname + '</td>' +
                        '<td class="text-capitalize">' + user.role + '</td>' +
                        '<td><div class="btn-group" role="group" aria-label="">' +
                        '<button id="btnUser' + i + '" type="button" class="btn btn-sm btn-outline-warning" data-toggle="modal" data-target="#modalEditEmployee">Edit</button>' +
                        '</div></td>' +
                        '</tr>';
                    $('#tblEmployees').append(tblBody);

                    $('#btnUser' + i).click(function () {
                        $('#userID').val(user.emp_id);
                        $('#editusername').val(user.username);
                        $('#editfname').val(user.name);
                        $('#editsurname').val(user.surname);
                        $('#editpassword').val(user.password);
                        $('#confirmPass').val(user.password);
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify('error happened' + errorThrown + textStatus, 'danger');
            }
        });

        //Adding New Employee 
        $('#btnAddEmployee').click(function () {

            var username = $('#username').val();
            var firstname = $('#fname').val();
            var surname = $('#surname').val();
            var occupation = $('#rolelist option:selected').attr('id');
            var password = $('#password').val();

            if (username != "" && firstname != "" && surname != "" && occupation != "" && password != "") {

                if ($('#password').val() == $('#confirmpassword').val()) {
                    var userDetails = {
                        "username": username,
                        "firstname": firstname,
                        "surname": surname,
                        "role_id": occupation,
                        "password": password
                    };

                    $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/api/addemployee",
                        data: userDetails,
                        success: function (res) {
                            $.notify(res.message, 'success');
                            location.reload(true);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('error happened' + errorThrown + textStatus);
                            $.notify('Failed To Add User', 'danger');
                        }
                    });

                }
                else {
                    $.notify('Passwords Do not match', 'info');
                }
            }
            else {
                $.notify('Please Fill in all the information', 'info');
            }
        });

        //Update Employee
        $('#btnSaveUser').click(function () {

            var userID = $('#userID').val(),
                username = $('#editusername').val(),
                fname = $('#editfname').val(),
                surname = $('#editsurname').val(),
                role_id = $('#editrolelist option:selected').attr('id'),
                password = $('#editpassword').val(),
                confirmpassword = $('#confirmPass').val();

            if (userID != "" && username != "" && fname != "" && surname != "" && role != "" && password != "") {

                if (password == confirmpassword) {

                    var userInfo = {
                        'user_id': userID,
                        'username': username,
                        'fname': fname,
                        'surname': surname,
                        'role_id': role_id,
                        'password': password
                    };

                    $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/api/updateemployee",
                        data: userInfo,
                        success: function (res) {
                            $.notify(res.message, 'success');
                            location.reload(true);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $.notify('Error Happened: ' + errorThrown + textStatus);
                        }
                    });
                }
                else {
                    $.notify('Passwords Do Not Match');
                }
            }
            else {
                $.notify('Please Fill In All The Information', 'info');
            }
        });

        //Add New Vehicle
        $('#btnAddVehicle').click(function () {

            var name = $('#vehiclename').val();
            var type = $('#vehicletype').val();
            var capacity = $('#vehiclecapacity').val();
            var use = $('#vehicleuse').val();

            var vehicleData = { 
                "name": name,
                "type": type,
                "capacity": capacity,
                "use": use
            };

            if (name != "" && type != "" && capacity != "" && use != "") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/addvehicle",
                    data: vehicleData,
                    success: function (res) {
                        $.notify(res.message, 'success');
                        location.reload(true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('error happened' + errorThrown + textStatus);
                    }
                });
            }
            else {
                $.notify('Please Fill In All The Information Required', 'info');
            }
        });

        //List Vehicles
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/vehicles",
            success: function (res) {
                var Vehicles = res.vehicles;

                $.each(Vehicles, function (i, vehicles) {

                    var tblBody = '<tr>' +
                        '<td class="text-capitalize">' + vehicles.vehicle_id + '</td>' +
                        '<td class="text-capitalize">' + vehicles.name + '</td>' +
                        '<td class="text-capitalize">' + vehicles.type + '</td>' +
                        '<td class="text-capitalize">' + vehicles.capacity + '</td>' +
                        '<td class="text-capitalize">' + vehicles.use + '</td>' +
                        '<td><div class="btn-group" role="group" aria-label="">' +
                        '<button id="btnVehicle' + i + '" type="button" class="btn btn-sm btn-outline-warning" data-toggle="modal" data-target="#modalEditVehicle">Edit</button>' +
                        '</div></td>' +
                        '</tr>';
                    $('#tblVehicles').append(tblBody);

                    $('#btnVehicle' + i).click(function () {
                        $('#vehicleID').val(vehicles.vehicle_id);
                        $('#editvehiclename').val(vehicles.name);
                        $('#editvehicletype').val(vehicles.type);
                        $('#editvehiclecapacity').val(vehicles.capacity);
                        $('#editvehicleuse').val(vehicles.use);
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify('error happened' + errorThrown + textStatus, 'danger');
            }
        });

        //Update Vehicle Details
        $('#btnEditVehicle').click(function () {
            var vehicle_id = $('#vehicleID').val(),
                name = $('#editvehiclename').val(),
                type = $('#editvehicletype').val(),
                capacity = $('#editvehiclecapacity').val(),
                use = $('#editvehicleuse').val();

            var vehicleUpdates = {
                "vehicle_id": vehicle_id,
                "name": name,
                "type": type,
                "capacity": capacity,
                "use": use
            };

            if (name != "" && type != "" && capacity != "" && use != "") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/updatevehicle",
                    data: vehicleUpdates,
                    success: function (res) {
                        $.notify(res.message, 'success');
                        location.reload(true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.notify('error happened' + errorThrown + textStatus, 'danger');
                    }
                });
            }
            else {
                $.notify('Please Fill In All The Information Required', 'info');
            }
        });

        //Add New Waste Category
        $('#btnAddWasteType').click(function () {

            var waste_type = $('#wastetype').val();
            var waste_source = $('#wastesource').val();

            var wasteCategory = {
                "waste_type": waste_type,
                "waste_source": waste_source,
            };

            if (waste_type != "" && waste_source != "") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/addwastecategory",
                    data: wasteCategory,
                    success: function (res) {
                        $.notify(res.message, 'success');
                        location.reload(true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('error happened' + errorThrown + textStatus);
                    }
                });
            }
            else {
                $.notify('Please Fill In All The Information Required', 'info');
            }
        });

        //List Waste Categories
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/wastecategory",
            success: function (res) {
                var Waste = res.wastecategory;

                $.each(Waste, function (i, waste) {

                    var tblBody = '<tr>' +
                        '<td class="text-capitalize">' + waste.waste_id + '</td>' +
                        '<td class="text-capitalize">' + waste.waste_type + '</td>' +
                        '<td class="text-capitalize">' + waste.waste_source + '</td>' +
                        '<td><div class="btn-group" role="group" aria-label="">' +
                        '<button id="btnWaste' + i + '" type="button" class="btn btn-sm btn-outline-warning" data-toggle="modal" data-target="#modalEditWaste">Edit</button>' +
                        '</div></td>' +
                        '</tr>';
                    $('#tblWasteCategories').append(tblBody);

                    $('#btnWaste' + i).click(function () {
                        $('#wasteID').val(waste.waste_id);
                        $('#editwastetype').val(waste.waste_type);
                        $('#editwastesource').val(waste.waste_source);
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify('error happened' + errorThrown + textStatus, 'danger');
            }
        });

        //Update Waste Category Details
        $('#btnEditWaste').click(function () {
            var waste_id = $('#wasteID').val(),
                waste_type = $('#editwastetype').val(),
                waste_source = $('#editwastesource').val();

            var wasteUpdates = {
                "waste_id": waste_id,
                "waste_type": waste_type,
                "waste_source": waste_source
            };

            if (waste_type != "" && waste_source != "") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/updatewastecategory",
                    data: wasteUpdates,
                    success: function (res) {
                        $.notify(res.message, 'success');
                        location.reload(true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.notify('error happened' + errorThrown + textStatus, 'danger');
                    }
                });
            }
            else {
                $.notify('Please Fill In All The Information Required', 'info');
            }
        });
    },

    initSupervisor: function () {

        var allcookies = document.cookie;
        var cookiearray = allcookies.split(';');
        cookiearray.pop();
        var zitaromunhu = cookiearray.toString();
        var user_id = { 'user_id': zitaromunhu.slice(5) };

        var binIcon = document.getElementById('binIcon');
        var identifyIcon = document.getElementById('identifyIcon');
        var zonesIcon = document.getElementById('zoneIcon');
        identifyIcon.style.color = 'red';

        //Load Employees List
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/employees",
            success: function (res) {
                var Employee = res.employees;
                $.each(Employee, function (i, employee) {
                    var optEmployee = "<option id='" + employee.emp_id + "'>" + employee.name + " \t " + employee.surname + "</option>";
                    $('#employeeList').append(optEmployee);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify('error happened' + errorThrown + textStatus);
            }
        });

        //Load Bins List
        var wastebins = $.ajax({
            url: "http://localhost:3000/api/wastebins",
            dataType: "json",
            success: console.log("Wastebins Data Loaded."),
            error: function (xhr) {
                alert(xhr.statusText);
            }
        });

        //Load Zones List
        var zones = $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/zones",
            success: function (res) {
                var Zone = res.features;
                $.each(Zone, function (i, zone) {
                    var optZone = "<option id='" + zone.properties.zone_id + "'>" + zone.properties.name + "</option>";
                    $('#zonesList').append(optZone);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify('error happened' + errorThrown + textStatus);
            }
        });

        $.when(wastebins, zones).done(function () {

            var wastebin, zone;

            var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                attribution: '&copy; <a href="https//www.google.com/permissions">Google Maps</a>'
            }),
                googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                    maxZoom: 20,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                    attribution: '&copy; <a href="https//www.google.com/permissions">Google Maps</a>'
                }),
                googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                    maxZoom: 20,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                    attribution: '&copy; <a href="https//www.google.com/permissions">Google Maps</a>'
                });

            var map = L.map('map', {
                center: [-19.51830, 29.83927],
                zoom: 17,
                minZoom: 14,
                maxZoom: 22,
                boxZoom: true,
                layers: [googleHybrid]
            });

            // Creating scale control
            var scale = L.control.scale();
            scale.addTo(map);

            //Add Basemap to Map
            $('#basemaps').click(function () {
                if ($('#googleHybrid')[0].checked) {
                    googleHybrid.addTo(map);
                    googleSat.removeFrom(map);
                    googleStreets.removeFrom(map);
                }
                if ($('#googleSat')[0].checked) {
                    googleSat.addTo(map);
                    googleHybrid.removeFrom(map);
                    googleStreets.removeFrom(map);
                }
                if ($('#googleStreets')[0].checked) {
                    googleStreets.addTo(map);
                    googleSat.removeFrom(map);
                    googleHybrid.removeFrom(map);
                }

            });

            //Get waste categories
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/api/wastecategory",
                success: function (res) {
                    var Waste = res.wastecategory;
                    $.each(Waste, function (i, waste) {
                        var option = "<option id='" + waste.waste_id + "'>" + waste.waste_type + "</option>";
                        $('#wastelist').append(option);
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error happened' + errorThrown + textStatus);
                }
            });

            // FeatureGroup is to store editable layers
            var drawnItems = L.featureGroup().addTo(map);

            $('#checkBoxDrawnLayer').prop('checked', true);
            $('#checkBoxBins').prop('checked', true);
            $('#checkBoxZones').prop('checked', true);

            //Toggle drawnItems Layer on Map
            $('#checkBoxDrawnLayer').change(function () {

                if (this.checked) {
                    drawnItems.addTo(map);
                } else {
                    drawnItems.removeFrom(map);
                }
            });

            var drawControl = new L.Control.Draw({
                edit: {
                    featureGroup: drawnItems,
                    poly: {
                        allowIntersection: false
                    }
                },
                draw: {
                    polyline: false,
                    marker: false,
                    circle: false,
                    circlemarker: false,
                    rectangle: false,
                    multipolygon: {
                        allowIntersection: false,
                        showArea: true,
                        metric: true
                    }
                }
            });

            map.on(L.Draw.Event.CREATED, function (event) {
                var layer = event.layer;

                drawnItems.addLayer(layer);
            });

            //map option toggle events
            $('#map-options').click(function () {

                if ($('#optionAddBins')[0].checked) {

                    binIcon.style.color = 'red';
                    identifyIcon.style.color = 'white';
                    zonesIcon.style.color = 'white';

                    map.removeControl(drawControl);

                    //Adding more bins
                    map.on({
                        click: function (ew) {
                            point = ew.latlng;
                            var popup = L.popup().setLatLng(point).setContent('<button type="button" id="btnPlaceBin" data-toggle="modal" data-target="#modalPlaceBin" class="btn btn-sm btn-block btn-danger" data-dismiss="modal">Place Bin Here</button>').openOn(map);
                            map.panTo(ew.latlng);
                            $('#txtBoxGeom').val(ew.latlng.lng + " " + ew.latlng.lat);
                        }
                    });

                    //Store Bin Location in database
                    $('#btnSaveBinLoc').click(function () {

                        var type = $('#binType').val(),
                            volume = $('#binVolume').val(),
                            wastetype = $('#wastelist option:selected').attr('id'),
                            geom = $('#txtBoxGeom').val();

                        var binData = {
                            'type': type,
                            'volume': volume,
                            'wastetype': wastetype,
                            'geom': geom
                        };

                        if (type != "" && volume != "" && wastetype != "") {
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:3000/api/addwastebin",
                                data: binData,
                                success: function (res) {
                                    $.notify(res.message, 'success');
                                    location.reload(true);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.log('error happened' + errorThrown + textStatus);
                                }
                            });
                        }
                        else {
                            $.notify('Please Fill In All The Information Required', 'info');
                        }
                    });
                }
                else if ($('#optionAddZones')[0].checked) {
                    binIcon.style.color = 'white';
                    identifyIcon.style.color = 'white';
                    zonesIcon.style.color = 'red';

                    map.off('click');
                    map.addControl(drawControl);

                    drawnItems.on({
                        click: function(e) {
                            var test = drawnItems.toGeoJSON();
                            alert(test);
                        }
                    });

                }
                else if ($('#optionBrowseMap')[0].checked) {
                    binIcon.style.color = 'white';
                    identifyIcon.style.color = 'red';
                    zonesIcon.style.color = 'white';

                    map.off('click');
                    map.removeControl(drawControl);
                    $('#map').append(map);
                }
            });

            var myIcon = L.icon({
                iconUrl: '../images/trashcan.png',
                iconSize: [10, 15],
                iconAnchor: [10, 15],
                shadowAnchor: [10, 20],
                popupAnchor: [0, -53]
            });

            //Add WasteBins to Map
            wastebin = L.geoJSON(wastebins.responseJSON, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, { icon: myIcon });
                },
                onEachFeature: function (feature, layer) {
                    layer.on({
                        click: function (e) {
                            wastebin.eachLayer(function (l) {
                                wastebin.resetStyle(l);
                            });

                            $('.tbodyContent').remove();
                            var tbody = '<tbody class="tbodyContent">';
                            for (var key in e.target.feature.properties) {

                                tbody +=
                                    ('<tr class="center aligned"><td>' + key + '</td><td>' + e.target.feature.properties[key] + '</td></tr>');
                            }
                            $('#attribute').append(tbody + '</tbody>');
                            $('#attributes').fadeIn(300);
                            $("#dialogAttributes").dialog("open");
                            map.panTo(e.latlng);
                        }
                    });
                }
            }).addTo(map);

            //Add Zones to Map
            function zoneStyle(feature) {
                return {
                    "color": "#90ee90",
                    "weight": 2
                };
            }

            zone = L.geoJSON(zones.responseJSON, {
                style: zoneStyle,
                onEachFeature: function (feature, layer) {
                    layer.on({
                        click: function (e) {
                            wastebin.eachLayer(function (l) {
                                wastebin.resetStyle(l);
                            });

                            $('.tbodyContent').remove();
                            var tbody = '<tbody class="tbodyContent">';
                            for (var key in e.target.feature.properties) {

                                tbody +=
                                    ('<tr class="center aligned"><td>' + key + '</td><td>' + e.target.feature.properties[key] + '</td></tr>');
                            }
                            $('#attribute').append(tbody + '</tbody>');
                            $('#attributes').fadeIn(300);
                            $("#dialogAttributes").dialog("open");
                            map.panTo(e.latlng);
                        }
                    });
                }
            }).addTo(map);

            //Toggle Layers on Map
            $('#checkBoxBins').change(function () {

                if (this.checked) {
                    wastebin.addTo(map);
                }
                else {
                    wastebin.removeFrom(map);
                }
            });

            $('#checkBoxZones').change(function () {

                if (this.checked) {
                    zone.addTo(map);
                }
                else {
                    zone.removeFrom(map);
                }
            });
        });

        $('#btnAllocateDuty').click(function () {

            var time = $('#startTime').val(),
                job = $('#jobDescription').val(),
                emp_id = $('#employeeList option:selected').attr('id'),
                zone = $('#zonesList option:selected').attr('id'),
                supervisor = user_id.user_id;
            
            var dutyData = {
                'time': time,
                'job': job,
                'emp_id': emp_id,
                'zone': zone,
                'supervisor': supervisor
            };

            if (time != "" && job != "") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/allocateduty",
                    data: dutyData,
                    success: function (res) {
                        $.notify(res.message, 'success');
                        location.reload(true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.notify('error happened' + errorThrown + textStatus, 'danger');
                    }
                });
            }
            else {
                $.notify('Please Fill In All The Information Required', 'info');
            }
        });

        //List Duties
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/duties",
            data: user_id,
            success: function (res) {
                var Duty = res.duty;
                $.each(Duty, function (i, duty) {
                    var tblBody = '<tr>' +
                        '<td class="text-capitalize">' + duty.job_description + '</td>' +
                        '<td class="text-capitalize">' + duty.start_time.slice(0,-6) + '</td>' +
                        '<td class="text-capitalize">' + duty.zone + '</td>' +
                        '<td class="text-capitalize">' + duty.name + '\t' + duty.surname +'</td>' +
                        '</tr>';
                    $('#tblDuties').append(tblBody);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify('error happened' + errorThrown + textStatus, 'danger');
            }
        });
    },

    initCommon: function () {

        var allcookies = document.cookie;
        var cookiearray = allcookies.split(';');
        cookiearray.pop();
        var zitaromunhu = cookiearray.toString();
        var user_id = { 'user_id': zitaromunhu.slice(5) };

        //List Allocated Duties
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/empduties",
            data: user_id,
            success: function (res) {
                var Duty = res.duty, nguvadzekupedzabasa;
                $.each(Duty, function (i, duty) {

                    if(duty.end_time != null){
                        nguvadzekupedzabasa = duty.end_time.slice(0,-6);
                    }
                    else {
                        nguvadzekupedzabasa = 'Pending';
                    }

                    var tblBody = '<tr>' +
                        '<td class="text-capitalize">' + duty.job_description + '</td>' +
                        '<td class="text-capitalize">' + duty.start_time.slice(0, -6) + '</td>' +
                        '<td class="text-capitalize">' + nguvadzekupedzabasa + '</td>' +
                        '<td class="text-capitalize">' + duty.zone + '</td>' +
                        '<td class="text-capitalize">' + duty.name + '\t' + duty.surname + '</td>' +
                        '<td><div class="btn-group" role="group" aria-label="">' +
                        '<button id="btnUpdate' + i + '" type="button" class="btn btn-sm btn-outline-warning" data-toggle="modal" data-target="#modalUpdateDuty">Update</button>' +
                        '</div></td>'+
                        '</tr>';
                    $('#tblCleanerDuties').append(tblBody);

                    $('#btnUpdate' + i).click(function () {
                        $('#dutyID').val(duty.timecard_id);
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify('error happened' + errorThrown + textStatus, 'danger');
            }
        });

        $('#btnUpdateDuty').click(function(){

            var updateData = {
                'timecard_id': $('#dutyID').val(),
                'end_time': $('#endTime').val()
            };

            console.log(updateData);

            if (updateData.end_time != "" ) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/updatetimecard",
                    data: updateData,
                    success: function (res) {
                        $.notify(res.message, 'success');
                        location.reload(true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.notify('error happened' + errorThrown + textStatus, 'danger');
                    }
                });
            }
            else {
                $.notify('Please Fill In All The Information Required', 'info');
            }

        });
    },

    initCleanerMap: function () {

        $('#checkBoxBins').prop('checked', true);
        $('#checkBoxZones').prop('checked', true);

        //Load Bins List
        var wastebins = $.ajax({
            url: "http://localhost:3000/api/wastebins",
            dataType: "json",
            success: console.log("Wastebins Data Loaded."),
            error: function (xhr) {
                alert(xhr.statusText);
            }
        });

        var zones = $.ajax({
            url: "http://localhost:3000/api/zones",
            dataType: "json",
            success: console.log("Zones Data Loaded."),
            error: function (xhr) {
                alert(xhr.statusText);
            }
        });

        $.when(wastebins, zones).done(function () {

            var wastebin, zone;

            var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                attribution: '&copy; <a href="https//www.google.com/permissions">Google Maps</a>'
            }),
                googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                    maxZoom: 20,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                    attribution: '&copy; <a href="https//www.google.com/permissions">Google Maps</a>'
                }),
                googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                    maxZoom: 20,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                    attribution: '&copy; <a href="https//www.google.com/permissions">Google Maps</a>'
                });

            var map = L.map('map', {
                center: [-19.51830, 29.83927],
                zoom: 17,
                minZoom: 14,
                maxZoom: 22,
                boxZoom: true,
                layers: [googleHybrid]
            });

            // Creating scale control
            var scale = L.control.scale();
            scale.addTo(map);

            //Add Basemap to Map
            $('#basemaps').click(function () {
                if ($('#googleHybrid')[0].checked) {
                    googleHybrid.addTo(map);
                    googleSat.removeFrom(map);
                    googleStreets.removeFrom(map);
                }
                if ($('#googleSat')[0].checked) {
                    googleSat.addTo(map);
                    googleHybrid.removeFrom(map);
                    googleStreets.removeFrom(map);
                }
                if ($('#googleStreets')[0].checked) {
                    googleStreets.addTo(map);
                    googleSat.removeFrom(map);
                    googleHybrid.removeFrom(map);
                }

            });

            var myIcon = L.icon({
                iconUrl: '../images/trashcan.png',
                iconSize: [10, 15],
                iconAnchor: [10, 15],
                shadowAnchor: [10, 20],
                popupAnchor: [0, -53]
            });

            //Add WasteBins to Map
            wastebin = L.geoJSON(wastebins.responseJSON, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, { icon: myIcon });
                },
                onEachFeature: function (feature, layer) {
                    layer.on({
                        click: function (e) {
                            wastebin.eachLayer(function (l) {
                                wastebin.resetStyle(l);
                            });

                            $('.tbodyContent').remove();
                            var tbody = '<tbody class="tbodyContent">';
                            for (var key in e.target.feature.properties) {

                                tbody +=
                                    ('<tr class="center aligned"><td>' + key + '</td><td>' + e.target.feature.properties[key] + '</td></tr>');
                            }
                            $('#attribute').append(tbody + '</tbody>');
                            $('#attributes').fadeIn(300);
                            $("#dialogAttributes").dialog("open");
                            map.panTo(e.latlng);
                        }
                    });
                }
            }).addTo(map);

            //Add Zones to Map
            function zoneStyle(feature) {
                return {
                    "color": "#90ee90",
                    "weight": 2
                };
            }

            zone = L.geoJSON(zones.responseJSON, {
                style: zoneStyle,
                onEachFeature: function (feature, layer) {
                    layer.on({
                        click: function (e) {
                            wastebin.eachLayer(function (l) {
                                wastebin.resetStyle(l);
                            });

                            $('.tbodyContent').remove();
                            var tbody = '<tbody class="tbodyContent">';
                            for (var key in e.target.feature.properties) {

                                tbody +=
                                    ('<tr class="center aligned"><td>' + key + '</td><td>' + e.target.feature.properties[key] + '</td></tr>');
                            }
                            $('#attribute').append(tbody + '</tbody>');
                            $('#attributes').fadeIn(300);
                            $("#dialogAttributes").dialog("open");
                            map.panTo(e.latlng);
                        }
                    });
                }
            }).addTo(map);

            //Toggle Layers on Map
            $('#checkBoxBins').change(function () {

                if (this.checked) {
                    wastebin.addTo(map);
                }
                else {
                    wastebin.removeFrom(map);
                }
            });

            $('#checkBoxZones').change(function () {

                if (this.checked) {
                    zone.addTo(map);
                }
                else {
                    zone.removeFrom(map);
                }
            });

        });
    },

    initDriverMap: function () {

        $('#checkBoxBins').prop('checked', true);
        $('#checkBoxZones').prop('checked', true);

        var truckLocation = [-19.51830, 29.83927];
        var warehouseLocation = [-19.51830, 29.83927];
        var lastQueryTime = 0;
        var lastAtRestaurant = 0;
        var keepTrack = [];
        var currentSchedule = [];
        var currentRoute = null;
        var pointHopper = {};
        var pause = true;
        var speedFactor = 50;

        // Add your access token
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxsYW5rYXl6IiwiYSI6ImNrMjdkN3hlZDA4aWwzYm9icDV0ZjE3M2MifQ.pKz5gZffQ27rZQxpGVS8IA';

        //Load Bins List
        var wastebins = $.ajax({
            url: "http://localhost:3000/api/wastebins",
            dataType: "json",
            success: console.log("Wastebins Data Loaded."),
            error: function (xhr) {
                alert(xhr.statusText);
            }
        });

        var zones = $.ajax({
            url: "http://localhost:3000/api/zones",
            dataType: "json",
            success: console.log("Zones Data Loaded."),
            error: function (xhr) {
                alert(xhr.statusText);
            }
        });

        $.when(wastebins, zones).done(function () {

            var wastebin, zone;

            // Initialize a map
            var map = new mapboxgl.Map({
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
                center: truckLocation, // starting position
                zoom: 12 // starting zoom
            });

            //Add Basemap to Map
            $('#basemaps').click(function () {
                if ($('#googleHybrid')[0].checked) {
                    googleHybrid.addTo(map);
                    googleSat.removeFrom(map);
                    googleStreets.removeFrom(map);
                }
                if ($('#googleSat')[0].checked) {
                    googleSat.addTo(map);
                    googleHybrid.removeFrom(map);
                    googleStreets.removeFrom(map);
                }
                if ($('#googleStreets')[0].checked) {
                    googleStreets.addTo(map);
                    googleSat.removeFrom(map);
                    googleHybrid.removeFrom(map);
                }

            });

            var myIcon = L.icon({
                iconUrl: '../images/trashcan.png',
                iconSize: [10, 15],
                iconAnchor: [10, 15],
                shadowAnchor: [10, 20],
                popupAnchor: [0, -53]
            });

            //Add WasteBins to Map
            wastebin = L.geoJSON(wastebins.responseJSON, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, { icon: myIcon });
                },
                onEachFeature: function (feature, layer) {
                    layer.on({
                        click: function (e) {
                            wastebin.eachLayer(function (l) {
                                wastebin.resetStyle(l);
                            });

                            $('.tbodyContent').remove();
                            var tbody = '<tbody class="tbodyContent">';
                            for (var key in e.target.feature.properties) {

                                tbody +=
                                    ('<tr class="center aligned"><td>' + key + '</td><td>' + e.target.feature.properties[key] + '</td></tr>');
                            }
                            $('#attribute').append(tbody + '</tbody>');
                            $('#attributes').fadeIn(300);
                            $("#dialogAttributes").dialog("open");
                            map.panTo(e.latlng);
                        }
                    });
                }
            }).addTo(map);

            //Add Zones to Map
            function zoneStyle(feature) {
                return {
                    "color": "#90ee90",
                    "weight": 2
                };
            }

            zone = L.geoJSON(zones.responseJSON, {
                style: zoneStyle,
                onEachFeature: function (feature, layer) {
                    layer.on({
                        click: function (e) {
                            wastebin.eachLayer(function (l) {
                                wastebin.resetStyle(l);
                            });

                            $('.tbodyContent').remove();
                            var tbody = '<tbody class="tbodyContent">';
                            for (var key in e.target.feature.properties) {

                                tbody +=
                                    ('<tr class="center aligned"><td>' + key + '</td><td>' + e.target.feature.properties[key] + '</td></tr>');
                            }
                            $('#attribute').append(tbody + '</tbody>');
                            $('#attributes').fadeIn(300);
                            $("#dialogAttributes").dialog("open");
                            map.panTo(e.latlng);
                        }
                    });
                }
            }).addTo(map);

            //Toggle Layers on Map
            $('#checkBoxBins').change(function () {

                if (this.checked) {
                    wastebin.addTo(map);
                }
                else {
                    wastebin.removeFrom(map);
                }
            });

            $('#checkBoxZones').change(function () {

                if (this.checked) {
                    zone.addTo(map);
                }
                else {
                    zone.removeFrom(map);
                }
            });

            var bins = turf.featureCollection(wastebin.toGeoJSON());

            var zones_ = turf.featureCollection(zone.toGeoJSON());

            var warehouse = turf.featureCollection([turf.point(warehouseLocation)]);

            // Create an empty GeoJSON feature collection for drop off locations
            var dropoffs = turf.featureCollection([]);

            // Create an empty GeoJSON feature collection, which will be used as the data source for the route before users add any new data
            var nothing = turf.featureCollection([]);

            map.on('load', function () {
                var marker = document.createElement('div');
                marker.classList = 'truck';

                // Create a new marker
                truckMarker = new mapboxgl.Marker(marker)
                    .setLngLat(truckLocation)
                    .addTo(map);

                // Create a Bins layer
                map.addLayer({
                    id: 'wastebins',
                    type: 'circle',
                    source: {
                        data: bins,
                        type: 'geojson'
                    },
                    paint: {
                        'circle-radius': 20,
                        'circle-color': 'white',
                        'circle-stroke-color': '#3887be',
                        'circle-stroke-width': 3
                    }
                });

                // Create a Zones layer
                map.addLayer({
                    id: 'zones',
                    type: 'polygon',
                    source: {
                        data: zones_,
                        type: 'geojson'
                    },
                    paint: {
                        'circle-radius': 20,
                        'circle-color': 'white',
                        'circle-stroke-color': '#3887be',
                        'circle-stroke-width': 3
                    }
                });

                // Create a circle layer
                map.addLayer({
                    id: 'warehouse',
                    type: 'circle',
                    source: {
                        data: warehouse,
                        type: 'geojson'
                    },
                    paint: {
                        'circle-radius': 20,
                        'circle-color': 'white',
                        'circle-stroke-color': '#3887be',
                        'circle-stroke-width': 3
                    }
                });

                // Create a symbol layer on top of circle layer
                map.addLayer({
                    id: 'warehouse-symbol',
                    type: 'symbol',
                    source: {
                        data: warehouse,
                        type: 'geojson'
                    },
                    layout: {
                        'icon-image': 'grocery-15',
                        'icon-size': 1
                    },
                    paint: {
                        'text-color': '#3887be'
                    }
                });

                map.addLayer({
                    id: 'dropoffs-symbol',
                    type: 'symbol',
                    source: {
                        data: dropoffs,
                        type: 'geojson'
                    },
                    layout: {
                        'icon-allow-overlap': true,
                        'icon-ignore-placement': true,
                        'icon-image': 'marker-15',
                    }
                });

                map.addSource('route', {
                    type: 'geojson',
                    data: nothing
                });

                map.addLayer({
                    id: 'routeline-active',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            12, 3,
                            22, 12
                        ]
                    }
                }, 'waterway-label');

                map.addLayer({
                    id: 'routearrows',
                    type: 'symbol',
                    source: 'route',
                    layout: {
                        'symbol-placement': 'line',
                        'text-field': '▶',
                        'text-size': [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            12, 24,
                            22, 60
                        ],
                        'symbol-spacing': [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            12, 30,
                            22, 160
                        ],
                        'text-keep-upright': false
                    },
                    paint: {
                        'text-color': '#3887be',
                        'text-halo-color': 'hsl(55, 11%, 96%)',
                        'text-halo-width': 3
                    }
                }, 'waterway-label');

                // Listen for a click on the map
                map.on('click', function (e) {

                    // When the map is clicked, add a new drop off point
                    // and update the `dropoffs-symbol` layer
                    newDropoff(map.unproject(e.point));
                    updateDropoffs(dropoffs);
                });
            });

            function newDropoff(coords) {
                // Store the clicked point as a new GeoJSON feature with
                // two properties: `orderTime` and `key`
                var pt = turf.point(
                    [coords.lng, coords.lat],
                    {
                        orderTime: Date.now(),
                        key: Math.random()
                    }
                );
                dropoffs.features.push(pt);
                pointHopper[pt.properties.key] = pt;

                // Make a request to the Optimization API
                $.ajax({
                    method: 'GET',
                    url: assembleQueryURL(),
                }).done(function (data) {

                    // Create a GeoJSON feature collection
                    var routeGeoJSON = turf.featureCollection([turf.feature(data.trips[0].geometry)]);

                    // If there is no route provided, reset
                    if (!data.trips[0]) {
                        routeGeoJSON = nothing;
                    } else {
                        // Update the `route` source by getting the route source
                        // and setting the data equal to routeGeoJSON
                        map.getSource('route')
                            .setData(routeGeoJSON);
                    }

                    //
                    if (data.waypoints.length === 12) {
                        window.alert('Maximum number of points reached. Read more at docs.mapbox.com/api/navigation/#optimization.');
                    }
                });
            }

            function updateDropoffs(geojson) {
                map.getSource('dropoffs-symbol')
                    .setData(geojson);
            }

            // Here you'll specify all the parameters necessary for requesting a response from the Optimization API
            function assembleQueryURL() {

                // Store the location of the truck in a variable called coordinates
                var coordinates = [truckLocation];
                var distributions = [];
                keepTrack = [truckLocation];

                // Create an array of GeoJSON feature collections for each point
                var restJobs = objectToArray(pointHopper);

                // If there are actually orders from this restaurant
                if (restJobs.length > 0) {

                    // Check to see if the request was made after visiting the restaurant
                    var needToPickUp = restJobs.filter(function (d, i) {
                        return d.properties.orderTime > lastAtRestaurant;
                    }).length > 0;

                    // If the request was made after picking up from the restaurant,
                    // Add the restaurant as an additional stop
                    if (needToPickUp) {
                        var restaurantIndex = coordinates.length;
                        // Add the restaurant as a coordinate
                        coordinates.push(warehouseLocation);
                        // push the restaurant itself into the array
                        keepTrack.push(pointHopper.warehouse);
                    }

                    restJobs.forEach(function (d, i) {
                        // Add dropoff to list
                        keepTrack.push(d);
                        coordinates.push(d.geometry.coordinates);
                        // if order not yet picked up, add a reroute
                        if (needToPickUp && d.properties.orderTime > lastAtRestaurant) {
                            distributions.push(restaurantIndex + ',' + (coordinates.length - 1));
                        }
                    });
                }

                // Set the profile to `driving`
                // Coordinates will include the current location of the truck,
                return 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + coordinates.join(';') + '?distributions=' + distributions.join(';') + '&overview=full&steps=true&geometries=geojson&source=first&access_token=' + mapboxgl.accessToken;
            }

            function objectToArray(obj) {
                var keys = Object.keys(obj);
                var routeGeoJSON = keys.map(function (key) {
                    return obj[key];
                });
                return routeGeoJSON;
            }

        });
    }
};