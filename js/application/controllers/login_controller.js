/**
 * Created by pkonwar on 1/15/2017.
 */
loginAppModule.controller('loginController', ['$scope', '$http', '$interval', '$location', '$window', 'CONSTANTS', 'common',
    function ($scope, $http, $interval, $location, $window, CONSTANTS, common) {

        $scope.login = function () {

            //the URL
            var url = CONSTANTS.APP_BASE_URL + "/user/login";

            $scope.status = {};

            var data = {
                "emailId": $scope.user.emailId,
                "password": $scope.user.password
            };

            console.log("data to be send :");
            console.log($scope.user);

            //execute request
            $scope.loginPromise = common.httpRequest(url, CONSTANTS.POST, data);

            //handling the promise
            $scope.loginPromise.success(function (data, status, headers, config) {
                console.log('Got back a response');
                console.log(data);
                console.log("clearing off the data");

                var status = data.status;

                if (status === CONSTANTS.STATUS_SUCCESS) {
                    //login is successful
                    $scope.user = {};       //clearing off the user registration form
                    successMesage("User Login is successful");

                    localStorage.setItem("userId",data.data.id);
                    localStorage.setItem("userName",data.data.presenterName);
                    //$location.url('index.html?/admin/dashboard');
                    //$window.location.href = 'http://localhost:9000/index.html?';
                    var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/HTML/index.html?";
                    $window.location.href = url;

                } else {
                    //failed login
                    //print the message
                    errorMesage(data.errorResponse.errorMessage);
                }
                //$location.path('/admin/login');
            }).error(function (data, status, headers, config) {
                console.log('AWS DOWN');
                errorMesage(data.errorMessage);
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
            $interval(clearStatus, 10000, 1);    //clear the status after 10 sec
        }

    }]);