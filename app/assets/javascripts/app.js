var app = angular.module('andeddogotchi',[]);
var fillfull = $('.fillfull').width();
var fillhealth = $('.fillhealth').width();

var token = $('[name="csrf-token"]').attr('content');

app.config([
  "$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
]);

app.controller('andeddoController',["$http", function($http){
  this.user = {};
  this.gotchi = {};
  this.gotchiName;
  this.loggedIn = false;
  this.newName;
  this.isDead;
  var controller = this;

  var processCurrentUser = function (data) {
    if(data.name) {
      controller.gotchiName = data.gotchi_name;
      controller.gotchi.age = data.age;
      controller.loggedIn = true;
    }
  }

  this.createUser = function () {
    $http.post('/users.json', {
      authenticity_token: token,
      user: this.user
    })
      .success(function (data) {
        controller.gotchiName = data.user.gotchi_name;
        processCurrentUser(data);
      });
  };

  this.login = function () {
    $http.post('/session.json', {
      authenticity_token: token,
      user: this.user
    })
      .success(function (data) {
        console.log(data);
        if(data.gotchi_name) {
          controller.gotchiName = data.gotchi_name;
          processCurrentUser(data);
          console.log("logging in user");
          readyFunction();
          console.log("about to call isDead");
          controller.isDead = isDead();
        } else {
          isDead();
        }
      });
  };

  this.logOut = function () {
    $http({
      method: "DELETE",
      url: '/session.json',
      data: { params: { authenticity_token: token } }
    })
      .success(function (data) {
        controller.loggedIn = false;
      })
  }

  this.deadGotchi = function () {
    $http.get('/gotchis/new.json', { authenticity_token: token })
         .success(function (data) {
           processCurrentUser(data);
           controller.gotchiName = controller.newName;
           $('.death').removeClass('death-show');
           $('.died').removeClass('died');
         })
         interval = setInterval(pageTick, isSleeping);
  }
}]);
