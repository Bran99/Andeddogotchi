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

  angular.element(document).ready(function () {
    // readyFunction();
    controller.checkLogin();
  });

  this.checkLogin = function () {
    $http.get('/session_check.json')
         .success(function (data) {
           if (data.user) {
             processCurrentUser(data);
           } else {
             controller.loggedIn = false;
           }
         });
  };

  var processCurrentUser = function (data) {
    console.log(data);
    controller.loggedIn = true;
    controller.gotchiName = data.user.gotchi_name;
    if(data.gotchi) {
      console.log("HEY HEY HEY I'M IN HERE!!!");
      controller.gotchi = data.gotchi;
      console.log(controller.gotchi);
      interval = setInterval(pageTick, isSleeping);
    } else {
      $('.gotchi').addClass('died');
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
    console.log("hi it's me");
    $http.post('/session.json', {
      authenticity_token: token,
      user: this.user
    })
      .success(function (data) {
        if(data.user.gotchi_name) {
          controller.gotchiName = data.user.gotchi_name;
          processCurrentUser(data);
          readyFunction();
          controller.isDead = isDead();
          if (controller.isDead === true && !$('.death-show')) {
            $('.grabThis').addClass('death-show');
          }
          console.log('the result of isDead is : ' + isDead());
          console.log('the value of ac.isDead is : ' + controller.isDead);
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
        console.log('dead?: ' + controller.isDead);
        console.log('gotchiName?: ' + controller.gotchiName);
        console.log('loggedIn?: ' + controller.loggedIn);
        clearInterval(interval);

        if($('.grabThis').hasClass('death-show')) {
          $('.grabThis').removeClass('death-show');
        }
      })
  }

  this.deadGotchi = function () {
    $http.get('/gotchis/new.json', { authenticity_token: token })
         .success(function (data) {
           console.log("hey i'm here again");
           console.log(data);
           processCurrentUser(data);
           controller.gotchiName = controller.newName;
           $('.grabThis').removeClass('death-show');
           $('.grabThis').addClass('death');
           $('.gotchi').removeClass('died');
         })
  }
}]);
