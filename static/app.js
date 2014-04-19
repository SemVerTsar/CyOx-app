app = angular.module('cyox', ['google-maps']);
var server = 'http://cyox-api.herokuapp.com';
// var server = 'http://127.0.0.1:8000';

app.controller('cyoxController', function($scope, $http) {
  $scope.route_points = [];
  $scope.route_summary = {};
  $scope.history = [];
  $scope.map = {
    center: {
      latitude: 51.7520209,
      longitude: -1.2577263
    },
    zoom: 12
  };
  $scope.state = 'input';
  $scope.geo = navigator.geolocation;
  $scope.data = {
      start_point: '',
      end_point: ''
  };

  $scope.caculate_route = function (start_point, end_point) {
    $scope.data.start_point = start_point;
    $scope.data.end_point = end_point;
    $scope.get_route();
  };

  $scope.get_route = function (){
    $scope.state = 'spinner';
    $http.post(server, $scope.data)
    .success(function(data, status, headers, config) {
       $scope.route_points = data['waypoints'];
       $scope.route_summary = data['summary'];
       $scope.state = 'route';
       $scope.route_errors = [];
    })
    .error(function(data, status, headers, config) {
      $scope.route_errors = data;
      $scope.state = 'input';
    });
  };

  $scope.get_history = function (){
    $scope.state = 'spinner';
    $http.get(server)
    .success(function(data, status, headers, config){
      $scope.history = data;
      $scope.state = 'history';
    })
    .error(function(data, status, headers, config) {
      alert("Could not get history!");
      $scope.state = 'history';
    });
  };

  $scope.change_state = function (newstate){
    $scope.state = newstate;
  };

  $scope.use_geo = function(){
    function onSuccess(position) {
      $scope.data.start_point = position.coords.latitude + ',' + position.coords.longitude;
    };
    function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }
    options = {enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  };

});
