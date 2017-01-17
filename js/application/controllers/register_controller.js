/**
 * Created by pkonwar on 1/15/2017.
 */

/**
 * Created by pkonwar on 1/15/2017.
 */
loginAppModule.controller('registerController', ['$scope', '$http', '$interval', 'CONSTANTS', 'common', function ($scope, $http, $interval, CONSTANTS, common) {

    $scope.name = "lets login";

    //register a user
    $scope.registerUser = function () {

        //the URL
        var url = CONSTANTS.APP_BASE_URL + "/user/register";
        $scope.status = {};     //initalizing status variable

        //data to send
        var data = {
            "presenterName": $scope.register.username,
            "emailId": $scope.register.email,
            "password": $scope.register.password
        };

        //validations
        if (!($scope.register.password === $scope.register.confirm_password)) {
            errorMesage("Password and Confirm password doesn't match");
            return;
        }

        //execute request
        $scope.registrationPromise = common.httpRequest(url, CONSTANTS.POST, data);

        //handling the promise
        $scope.registrationPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            console.log("clearing off the data");
            $scope.register = {};       //clearing off the user registration form
            successMesage("success");
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
            $scope.errorMesage("failure");
        });
    }

    //clearing all the status
    function clearStatus() {
        $scope.status = {};
        $scope.message = "";
        console.log("clearing status");
    }

    //print success message
    function successMesage(message) {
        $scope.status.request_success = "true";
        $scope.message = message;
        $interval(clearStatus, 6000, 1);    //clear the status after 6 sec
    }

    //print failure message
    function errorMesage(message) {
        $scope.status.request_failure = "true";
        $scope.message = message;
        $interval(clearStatus, 10000, 1);    //clear the status after 6 sec
    }

}]);