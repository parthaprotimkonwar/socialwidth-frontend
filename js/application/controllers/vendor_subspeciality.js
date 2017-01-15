myApp.controller('vendorSubSpecialityController', ['$scope', '$http', '$location', 'commonServices','CONSTANTS', function ($scope, $http, $location, commonServices,CONSTANTS) {

    //List out the subspeciality
    $scope.listSubSpecialities = function() {
        $scope.addSubSpecialityPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/list/subspecialities",CONSTANTS.GET_METHOD,null);
        $scope.addSubSpecialityPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.subSpecialityList = data.data;
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }
    $scope.listSubSpecialities();

    //List all Users
    $scope.listUsers = function() {
        $scope.listUsersPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/list/users",CONSTANTS.GET_METHOD,null);
        $scope.listUsersPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.userList = data.data;
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }
    $scope.listUsers();


    $scope.addUserSubSpeciality = function() {
        var data = { userIdSubSpecialityIdBean :
                        {"userId" : $scope.usersubspeciality.user_Id, "subSpecialityId" : $scope.usersubspeciality.subspeciality_Id},
                    "price" : $scope.usersubspeciality.price, "startingFrom" : $scope.usersubspeciality.startingFrom};
        $scope.addUserSubSpecialityPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/onboard/usersubspeciality",CONSTANTS.POST_METHOD,data);
        $scope.addUserSubSpecialityPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.listUserSubSpecialities();    //list all the specialities
            $scope.operationStatus = CONSTANTS.SUCCESS;
            $scope.message = 'Data push is successful';
            $scope.speciality = {};
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
            $scope.operationStatus = CONSTANTS.FAILURE;
            $scope.message = 'Unable to push data';
        });
    }

    $scope.listUserSubSpecialities = function() {
        $scope.listUserSubSpecialityPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/list/usersubspeciality",CONSTANTS.GET_METHOD,null);
        $scope.listUserSubSpecialityPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.userSubSpecialityList = data.data;
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }

    $scope.listUserSubSpecialities();

}]);
