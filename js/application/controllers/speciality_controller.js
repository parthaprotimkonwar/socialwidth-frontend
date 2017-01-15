myApp.controller('specialityController', ['$scope', '$http', 'commonServices','CONSTANTS','$timeout', function ($scope, $http, commonServices,CONSTANTS,$timeout) {

    /*Add Speciality Image*/
    $scope.specialityImage='';
    $scope.specialityCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.specialityImage=evt.target.result;

        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#specialityFileInput')).on('change',handleFileSelect);

    //Add a Speciality
    /*----------------------------------------------------------------------------------------------------*/
    $scope.addSpeciality = function() {
        var data = {"speciality" : $scope.speciality.name, "status" : "ACTIVE", "imageBlob" : $scope.specialityCroppedImage};
        console.log(data);
        $scope.addSpecialityPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/onboard/speciality",CONSTANTS.POST_METHOD,data);
        $scope.addSpecialityPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.listSpecialities();    //list all the specialities
            $scope.operationStatus = CONSTANTS.SUCCESS;
            $scope.message = 'Data push is successful';
            $scope.speciality = {};
            console.log('Before image' + $scope.specialityCroppedImage);
            $scope.clearImageFile();
            console.log('After image' + $scope.specialityCroppedImage);
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
            $scope.operationStatus = CONSTANTS.FAILURE;
            $scope.message = 'Unable to push data';
        });
    }

    $scope.clearImageFile = function() {
        angular.element(document.querySelector('#specialityFileInput')).val(null);
        $scope.specialityImage=null;
        $scope.specialityCroppedImage=null;
    }
    
    $scope.listSpecialities = function() {
        $scope.addSpecialityPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/list/specialities",CONSTANTS.GET_METHOD,null);
        $scope.addSpecialityPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.specialityList = data.data;
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }

    $scope.listSpecialities();
    /*----------------------------------------------------------------------------------------------------*/

    $scope.findSpecialityById = function(id) {
        for(var i=0; i<$scope.specialityList.length; i++) {
            var speciality = $scope.specialityList[i];
            if(speciality.specialityId == id) {
                return speciality.speciality;
            }
        }
        return id;
    }

    jQuery(function($) {
        $(".alert").alert();
     })

}]);
