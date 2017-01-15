myApp.controller('vendorController', ['$scope', '$http', '$location', 'commonServices','CONSTANTS', function ($scope, $http, $location, commonServices,CONSTANTS) {
    $scope.vendorImage='';
    $scope.vendorCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.vendorImage=evt.target.result;

        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#vendorFileInput')).on('change',handleFileSelect);

    $scope.addAddress = function() {
        console.log('go go go');
        var data = {"cityId" : $scope.user.city_Id, "userType" : "VENDORS", "name" : $scope.user.name, "email" : $scope.user.email, "mobile" : $scope.user.mobile};
        console.log(data);

    }

    //List all Cities
    $scope.listCities = function() {
        $scope.listCitiesPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/list/cities",CONSTANTS.GET_METHOD,null);
        $scope.listCitiesPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.cityList = data.data;
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }

    $scope.listCities();

    //Add User
    $scope.addUser = function() {
        var data = {"cityId" : $scope.user.city_Id, "userType" : "VENDORS", "name" : $scope.user.name, "email" : $scope.user.email, "mobile" : $scope.user.mobile, "status" : "ACTIVE"};
        $scope.addUserPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/onboard/user",CONSTANTS.POST_METHOD,data);
        $scope.addUserPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);

            $scope.listUsers();
            $scope.operationStatus = CONSTANTS.SUCCESS;
            $scope.message = 'Data push is successful';
            $scope.user = {};
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
            $scope.operationStatus = CONSTANTS.FAILURE;
            $scope.message = 'Unable to push data';
        });
    }

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
}]);
