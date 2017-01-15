myApp.controller('vendorAddressController', ['$scope', '$http', 'commonServices','CONSTANTS', function ($scope, $http, commonServices,CONSTANTS) {

    //Add User
    $scope.addAddress = function() {
        var data = { "addressHeading":"DEFAULT", "userId" : $scope.address.userId, "pincode" : $scope.address.pincode, "address" : $scope.address.address, "landmark" : $scope.address.landmark, "phoneNo" : $scope.address.phoneNo, "city" : $scope.address.city, "state" : $scope.address.state, "country" : $scope.address.country , "latitude" : $scope.address.latitude, "longitude" : $scope.address.longitude};

        $scope.addAddressPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/onboard/address",CONSTANTS.POST_METHOD,data);
        $scope.addAddressPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);

            $scope.listAddress();
            $scope.operationStatus = CONSTANTS.SUCCESS;
            $scope.message = 'Data push is successful';
            $scope.address = {};
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
            $scope.operationStatus = CONSTANTS.FAILURE;
            $scope.message = 'Unable to push data';
        });
    }

    //List all Users
    $scope.listAddress = function() {
        $scope.listUsersPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/list/addresses",CONSTANTS.GET_METHOD,null);
        $scope.listUsersPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.addressList = data.data;
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }

    $scope.listAddress();
}]);
