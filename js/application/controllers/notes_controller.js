/*A Controller controlles a small unit of the modules.*/

myApp.controller('myController', ['$scope', '$http', 'commonServices','CONSTANTS', function ($scope, $http, commonServices,CONSTANTS) {

    /*$http.get('js/data.json').success(function (data) {
        $scope.authors = data;
    });*/

    //setting a default value to the select box
    $scope.peopleOrder = "name";



    //Get all SUBJECTS
    $scope.getSubjects = function() {
        console.log('getSubjects executing');

        $scope.getSubjectPromise = commonServices.sendHttpRequest("http://localhost:9000/admin/get/subjects",CONSTANTS.GET_METHOD,null);
        $scope.getSubjectPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.subjectList = data.data;
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }
    //Execute GetAllSubjects()
    $scope.getSubjects();

    $scope.getChapters = function() {
        //Get all CHAPTERS
        $scope.getChaptersPromise = commonServices.sendHttpRequest("http://localhost:9000/admin/get/chapters/"+$scope.subject_id,CONSTANTS.GET_METHOD,null);
        $scope.getChaptersPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.chapterList = data.data;
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }

    $scope.getQuestionAnswers = function() {

        //Get all QuestionAnswers
        $scope.getQAPromise = commonServices.sendHttpRequest("http://localhost:9000/admin/get/qa/"+$scope.chapter_id,CONSTANTS.GET_METHOD,null);
        $scope.getQAPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.questionAnswerList = data.data;
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }

    $scope.addSubject = function() {
        var data = {"subjectName" : $scope.newSubjectName};
        $scope.addSubjectPromise = commonServices.sendHttpRequest("http://localhost:9000/admin/add/subject",CONSTANTS.POST_METHOD,data);
        $scope.addSubjectPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.getSubjects();
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }

    $scope.addChapters = function() {
        var data = {"subjectId" : $scope.subject_id, "chapterName" : $scope.newChapterName};
        $scope.addChapterPromise = commonServices.sendHttpRequest("http://localhost:9000/admin/add/chapter",CONSTANTS.POST_METHOD,data);
        $scope.addChapterPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.getChapters();
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }

    $scope.addQuestionAnswer = function() {
        var data = {"chapterId" : $scope.chapter_id, "question" : $scope.newQuestion, "answer" : $scope.newAnswer};
        $scope.addQAPromise = commonServices.sendHttpRequest("http://localhost:9000/admin/add/qa",CONSTANTS.POST_METHOD,data);
        $scope.addQAPromise.success(function (data, status, headers, config) {
            console.log('Got back a response');
            console.log(data);
            $scope.getQuestionAnswers();
        }).error(function (data, status, headers, config) {
            console.log('AWS DOWN');
        });
    }

    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;

        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);


    $scope.checkResume = function() {
        console.log('calling');
        console.log($scope.myCroppedImage);
    }

}]);
