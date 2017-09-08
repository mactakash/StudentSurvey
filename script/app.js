var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.name = "";
    $scope.email = "";
    $scope.address = "";
    $scope.mobile = "";
    $scope.getStartEmail = ""
    $scope.returnData = {};
    $http.get("api-data/question.json")
        .then(function(response) {
            $scope.hobbies = response.data.hobbies;
            $scope.rolemodel = response.data.rolemodel;
            $scope.hometown = response.data.hometown;
            $scope.selectedName = response.data.hobbies[0];
            $scope.selectedRolemodel = response.data.rolemodel[0];
            $scope.selectedHomeTown = response.data.hometown[0];
        });

    $scope.savePersonal = function() {

        if ($scope.name.length > 0 && $scope.email.length > 0 && $scope.address.length > 0 && $scope.mobile.length > 0) {
            angular.element(document.querySelector('#personal-save-tick')).removeClass('hide');
            angular.element(document.querySelector('#collapse1')).collapse('toggle');
            angular.element(document.querySelector('#collapse2')).collapse('show');

        } else {
             //swal("Warning!", "Please Fill Personal Information Properly!", "error");
            return;
        }
    };

    $scope.saveGeneral = function() {

        if ($scope.name.length > 0 && $scope.email.length > 0 && $scope.address.length > 0 && $scope.mobile.length > 0) {
            angular.element(document.querySelector('#gereral-save-tick')).removeClass('hide');
            angular.element(document.querySelector('#submitSurverData')).removeClass('hide');
            angular.element(document.querySelector('#collapse2')).removeClass('in');
        } else {
            angular.element(document.querySelector('#collapse2')).collapse('toggle');
            angular.element(document.querySelector('#collapse1')).collapse('show');
            swal("Warning!", "Please Fill Personal Information Properly!", "error");
            return false;
        }
    };

    $scope.finalSubmit = function() {
        angular.element(document.querySelector('#sucess-msg')).removeClass('hide');
        angular.element(document.querySelector('#p-info')).addClass('hide');
        angular.element(document.querySelector('#g-info')).addClass('hide');
        angular.element(document.querySelector('#submitSurverData')).addClass('hide');
        angular.element(document.querySelector('#view-btn')).removeClass('hide');
        var student = {
            "name": $scope.name,
            "address": $scope.address,
            "mobile": $scope.mobile,
            "email": $scope.email,
            "hobbie": $scope.selectedName,
            "rolemodel": $scope.selectedRolemodel,
            "home_town": $scope.selectedHomeTown
        };
        $http.post("http://localhost:3000/student", student)
            .then(
                function(response) {
                    $scope.returnData = response.data;
                    swal("Good job!", "Your Survey Completd and Resonse Save to Server!", "success");
                },
                function(response) {
                    // failure callback
                    //if(API Server is Off)
                   swal("Good job!", "Your Survey Completd but Not Save to Server!", "success");
                     $scope.returnData=student;
                }
            );
    };
});