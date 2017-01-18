/**
 * Created by pkonwar on 1/15/2017.
 */
myApp.controller('createClassController', ['$scope', '$http', '$interval', '$location', '$window', 'CONSTANTS', 'common',
    function ($scope, $http, $interval, $location, $window, CONSTANTS, common) {

        $scope.name = "create class controller";
        $scope.schedule = function () {

            //the URL
            var url = CONSTANTS.APP_BASE_URL + "/meetings/create";

            $scope.status = {};

            //"04/07/2017 23:02:55"
            var userId = localStorage.getItem("userId");
            var thedate = calculateDate($scope.meeting.datetime);
            var data = {
                "title": $scope.meeting.topic,
                "startDateTime": thedate,
                "duration": $scope.meeting.timeduration,
                "presenterId": userId
            };

            console.log("data to be send :");
            console.log(data);

            //execute request
            $scope.createMeetingPromise = common.httpRequest(url, CONSTANTS.POST, data);

            //handling the promise
            $scope.createMeetingPromise.success(function (data, status, headers, config) {
                console.log('Got back a response');
                console.log(data);
                console.log("clearing off the data");

                var status = data.status;

                if (status === CONSTANTS.STATUS_SUCCESS) {
                    //login is successful
                    $scope.meeting = {};       //clearing off the user registration form
                    successMesage("Meeting Scheduled successfully");
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

        //$scope.meeting.datetime
        function calculateDate(date) {

            var dateTimeArray = date.split(" ");
            var date = dateTimeArray[0];
            var time = dateTimeArray[1];
            var phase = dateTimeArray[2];

            var timeArray = time.split(":");
            var hours = timeArray[0];
            var minutes = timeArray[1];

            if (phase === "PM") {
                hours = parseInt(hours) + 12;
            }
            return date + " " + hours + ":" + minutes + ":00";
        }

        $(document).ready(function () {
            $('#date-picker1').daterangepicker(
                {
                    singleDatePicker: true,
                    timePicker: true,
                    format: 'MM/DD/YYYY h:mm A'
                },

                function (start, end, label) {
                    $scope.selectedDate = start;
                    console.log(start.toString());
                    console.log(start.toISOString(), end.toISOString(), label);
                });
        });

    }]);


