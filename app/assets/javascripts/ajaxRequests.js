var token = $('[name="csrf-token"]').attr('content'),
    isSleeping = 60000,
    fullity,
    rest,
    interval,
    bloodBath,
    loginCheck,
    gotchiAge;

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////// SLEEP CHECKER ///////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

$('.sun').on('click', function () {
  if(!$('.sun').hasClass('gray')) {
    isSleeping = 120000;
  }
})

$('.moon').on('click', function () {
  if(!$('.moon').hasClass('gray')) {
    isSleeping = 600000000;
  }
})

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////// DEATH CHECKER ///////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

function readyFunction() {
  $.ajax({
    url: "/gotchis",
    method: "PATCH",
    data: { "authenticity_token": token,
            gotchi: {health_action: "load"}
          },
    success: function(data) {
      console.log("success!", data);
      fullity = data.fullity || 0;
      rest = data.rest || 0;
      $('.fillfull').css('width', fullity);
      $('.fillhealth').css('width', rest);
      isDead();
      gotchiAge = data.age;
      console.log(gotchiAge);
    },
    error: function(data){
      console.log(data);
    }
  })
}

function isDead() {
  if (fullity <= 0 || rest <= 0) {
    $.ajax({
      url: "/gotchis",
      method: "DELETE",
      data: { "authenticity_token": token },
      success: function(data) {
        clearInterval(interval);
      }
    });
    $('.gotchi').addClass('died');
    setTimeout(function(){
      $('.death').addClass('death-show');
    },5000);
    clearInterval(interval);
    return true;
  } else {
    return false;
  }
}

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////// LOGIN HEALTH CHECKER ////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

$(document).ready(readyFunction);

//////////////////////////////////////////////
//////////////////////////////////////////////
///////////////// PAGE TICK //////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

var pageTick = function () {
  $.ajax({
    url: "/gotchis",
    method: "PATCH",
    data: { "authenticity_token": token,
            gotchi: {health_action: "tick"}
          },
    success: function(data) {
      $('.fillfull').css('width', data.fullity);
      $('.fillhealth').css('width', data.rest);
      fullity = data.fullity;
      rest = data.rest;
      isDead();
    },
    failure: function(data){
      console.log(data);
    }
  })
};

//////////////////////////////////////////////
//////////////////////////////////////////////
///////////////// CLICK BRAIN ////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

$('.brain').on('click', function (e) {
  $.ajax({
    url: "/gotchis",
    method: "PATCH",
    data: { "authenticity_token": token,
            gotchi: {health_action: "brain"}
          },
    success: function(data) {
      $('.fillfull').css('width', data.fullity);
      fullity = data.fullity;
      isDead();
    },
    failure: function(data){
      console.log(data);
    }
  })
})

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////// CLICK SHOWER  ///////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

$('.sun').on('click', function (e) {
  bloodBath = setInterval(function () {
    $.ajax({
      url: "/gotchis",
      method: "PATCH",
      data: { "authenticity_token": token,
              gotchi: {health_action: "blood_bath"}
            },
      success: function(data) {
        $('.fillhealth').css('width', data.rest);
        rest = data.rest;
        isDead();
      },
      failure: function(data){
        console.log(data);
      }
    });
  }, 3000)
});

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////// SHOWER OFF //////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

$('.moon').on('click', function (e) {
  clearInterval(bloodBath);
})
