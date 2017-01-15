myApp.controller('cityController', ['$scope', '$http', 'commonServices','CONSTANTS', function ($scope, $http, commonServices,CONSTANTS) {

    //Add a City
    $scope.addCity = function() {
        var data = {"name" : $scope.city.name, "latitude" : $scope.city.latitude, "longitude" : $scope.city.longitude, "status" : "ACTIVE"};
        $scope.addCityPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/onboard/city",CONSTANTS.POST_METHOD,data);
        $scope.addCityPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.listCities();    //list all the cities
            $scope.operationStatus = CONSTANTS.SUCCESS;
            $scope.message = 'Data push is successful';
            $scope.city = {};
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
            $scope.operationStatus = CONSTANTS.FAILURE;
            $scope.message = 'Unable to push data';
        });
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

    jQuery(function($) {
        $(".alert").alert();
     })

}]);
