myApp.controller('subSpecialityController', ['$scope', '$http', 'commonServices','CONSTANTS', function ($scope, $http, commonServices,CONSTANTS) {

    /*Add Sub Speciality Image*/
    $scope.subSpecialityImage='';
    $scope.subSpecialityCroppedImage='';

    var handleFileSelectSub=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.subSpecialityImage=evt.target.result;

        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#subSpecialityFileInput')).on('change',handleFileSelectSub);

    //List a Speciality
    /*----------------------------------------------------------------------------------------------------*/
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

    //Add a SubSpeciality
    $scope.addSubSpeciality = function() {
        var data = {"specialityId" : $scope.subspeciality.speciality_Id, "subSpeciality" : $scope.subspeciality.name, "status" : "ACTIVE", "imageBlob" : $scope.subSpecialityCroppedImage};
        $scope.addSubSpecialityPromise = commonServices.sendHttpRequest(CONSTANTS.APP_BASE_URL+"/admin/onboard/subspeciality",CONSTANTS.POST_METHOD,data);
        $scope.addSubSpecialityPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.listSubSpecialities();    //list all the specialities
            $scope.operationStatus = CONSTANTS.SUCCESS;
            $scope.message = 'Data push is successful';
            $scope.subspeciality = {};
            $scope.clearImageFile();
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
            $scope.operationStatus = CONSTANTS.FAILURE;
            $scope.message = 'Unable to push data';
        });
    }

    $scope.clearImageFile = function() {
        angular.element(document.querySelector('#subSpecialityFileInput')).val(null);
        $scope.subSpecialityImage='';
        $scope.subSpecialityCroppedImage='';
    }
     
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

    jQuery(function($) {
        $(".alert").alert();
     })

}]);
