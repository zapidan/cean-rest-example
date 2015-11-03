var app = angular.module("recordsapp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("list", {
      "url": "/list",
      "templateUrl": "templates/list.html",
      "controller": "MainController",
      "cache": false
    })
    .state("item", {
      "url": "/item/:documentId",
      "templateUrl": "templates/item.html",
      "controller": "MainController",
      "cache": false
    });
  $urlRouterProvider.otherwise("list");
});

app.controller("MainController", function($scope, $http, $state, $stateParams) {

  $scope.items = {};

  // getAll
  $scope.fetchAll = function() {
    $http({
      method: "GET",
      url: "/api/getAll"
    })
    .success(function(result) {
      for (var i = 0; i < result.length; i++) {
        $scope.items[result[i].id] = result[i];
      }
      console.log(JSON.stringify($scope.items));
    })
    .error(function(error) {
      console.log(JSON.stringify(error));
    });
  };

  // get
  if ($stateParams.documentId) {
    $http({
      method: "GET",
      url: "/api/get",
      params: {
        document_id: $stateParams.documentId
      }
    })
    .success(function(result) {
      $scope.inputForm = result[0];
      console.log($scope.inputForm);
    })
    .error(function(error) {
      console.log(JSON.stringify(error));
    });
  };

  // delete
  $scope.delete = function(documentId) {
    $http({
      method: "POST",
      url: "/api/delete",
      data: {
        document_id: documentId
      }
    })
    .success(function(result) {
      delete $scope.items[documentId];
    })
    .error(function(error) {
      console.log(JSON.stringify(error));
    });
  };

  // save
  $scope.save = function(firstname, lastname, email) {
    $http({
      method: "POST",
      url: "/api/save",
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        document_id: $stateParams.documentId
      }
    })
    .success(function(result) {
      $state.go("list");
    })
    .error(function(error) {
      console.log(JSON.stringify(error));
    });
  };
});
