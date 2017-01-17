/**
 * Created by pkonwar on 1/15/2017.
 */
myApp.controller('createClassController', ['$scope', '$http', function ($scope, $http) {

    $scope.name = "create class controller";

    $(document).ready(function () {
        $('#date-picker1').daterangepicker({singleDatePicker: true}, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });

}]);


