myApp.service('CONSTANTS', function () {

    this.SUCCESS = 'SUCCESS';
    this.FAILURE = 'FAILURE';
    this.POST = 'POST';
    this.GET = 'GET';
    //this.APP_BASE_URL= 'http://ec2-52-40-162-133.us-west-2.compute.amazonaws.com:9001';
    this.APP_BASE_URL = 'http://localhost:9000';

    this.STATUS_SUCCESS = "SUCCESS";
    this.STATUS_FAILURE = "FAILURE";

});


loginAppModule.service('CONSTANTS', function () {

    this.POST = 'POST';
    this.GET = 'GET';
    //this.APP_BASE_URL= 'http://ec2-52-40-162-133.us-west-2.compute.amazonaws.com:9001';
    this.APP_BASE_URL = 'http://localhost:9000';
    this.STATUS_SUCCESS = "SUCCESS";
    this.STATUS_FAILURE = "FAILURE";

});
