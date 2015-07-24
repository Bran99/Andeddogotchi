


/*
                               .--.
                              /  ..\
                         ____.'  _o/
          .--.          '--.     |.__
         /..  \         _.-'     /--'
         \ o  /    _.--'        /
         /    \   ~'--....___.-'   
        /      \
       (/      \)      ,_
        |      \        |`\
         \      '._     \  `'-._
          '._      '-.   \      '-._/)
             `'- ,~- _.`  '.        '.--.
                            `-.,    / ..`\
          .--.                 //'-.   o /
         /..  \               (/     '--'
         \o _ (____
       __.|    .--'
      '---\    '.         ,
           '.    '-.___.-'/
             '-.__     _.'
                  `````

////////////////////////////////
//ANDEDDOGOTCHI GROUP PROJECT///
////////////////////////////////
// AUTHORS: Aarati Akkapeddi ///
//          Brandon Goodman ////
// PM:      Reshum Panchal /////
// UX:      Rosemary      //////
////////////////////////////////
*/

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
  this.loggedIn;
  this.newName;
  this.isDead;
  this.helper_shown;
  this.fbName;
  var controller = this;

  angular.element(document).ready(function () {
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
    controller.loggedIn = true;
    controller.gotchiName = data.user.gotchi_name;
    controller.helper_shown = data.user.helper_shown;
    if(data.gotchi) {
      controller.gotchi = data.gotchi;
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
        clearInterval(interval);

        if($('.grabThis').hasClass('death-show')) {
          $('.grabThis').removeClass('death-show');
        }
      })
  }

  this.deadGotchi = function () {
    $http.get('/gotchis/new.json', { authenticity_token: token })
         .success(function (data) {
           processCurrentUser(data);
           controller.gotchiName = controller.newName;
           $('.grabThis').removeClass('death-show');
           $('.grabThis').addClass('death');
           $('.gotchi').removeClass('died');
         })
  }
}]);
