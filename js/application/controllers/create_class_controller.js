/**
 * Created by pkonwar on 1/15/2017.
 */
myApp.controller('createClassController', ['$scope', '$http', function ($scope, $http) {

    $scope.name = "create class controller";


    jQuery(document).ready(function($){
        $('input[name="daterange"]').daterangepicker();
    });

        /*$(document).ready(function() {
            $('#date-range-picker').daterangepicker(null, function(start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
            });
        });
        $(document).ready(function() {
            $('#date-picker').daterangepicker({ singleDatePicker: true }, function(start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
            });
        });
        $(document).ready(function() {
            $('#date-range-and-time-picker').daterangepicker({
                timePicker: true,
                timePickerIncrement: 30,
                format: 'MM/DD/YYYY h:mm A'
            }, function(start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
            });
        });*/


}]);


