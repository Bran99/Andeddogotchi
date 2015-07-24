////////////////////////////////
//ANDEDDOGOTCHI GROUP PROJECT///
////////////////////////////////
// AUTHORS: Aarati Akkapeddi ///
//          Brandon Goodman ////
// PM:      Reshum Panchal /////
// UX:      Rosemary      //////
////////////////////////////////


var token = $('[name="csrf-token"]').attr('content'),
    isSleeping = 60000,
    fullity,
    rest,
    interval,
    bloodBath,
    loginCheck,
    gotchiAge,
    restFill,
    fullFill;

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
/////////////// PAGE LOAD THING //////////////
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
      console.log(fullity+'fullity');
      rest = data.rest || 0;
      console.log(rest+'rest');
      $('.fillfull').css('width', fullity);
      $('.fillhealth').css('width', rest);
      isDead();
      gotchiAge = data.age;
      console.log(gotchiAge);
    },
    error: function(data){
      console.log(data);
    }
  });
}


//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////// DEATH CHECKER ///////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

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
    deathSound.play();
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
///////////////// PAGE TICK //////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

var pageTick = function () {
  console.log("Page is ticking");
  $.ajax({
    url: "/gotchis",
    method: "PATCH",
    data: { "authenticity_token": token,
            gotchi: {health_action: "tick"}
          },
    success: function(data) {
      fullFill = ((data.fullity / 100) * $('.bar').width())
      restFill = ((data.rest / 100) * $('.bar').width())
      $('.fillfull').css('width', fullFill);
      $('.fillhealth').css('width', restFill);

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
///////////////// CLICK FOOD /////////////////
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
      fullFill = ((data.fullity / 100) * $('.bar').width())
      $('.fillfull').css('width', fullFill);
      console.log(data.fullity);
      if(data.fullity > 50){
        $('.fillfull').css('background-color', 'lightgreen');
      }
      fullity = data.fullity;
      isDead();
    },
    failure: function(data){
      console.log(data);
    }
  })
})

$('.foot').on('click', function (e) {
  $.ajax({
    url: "/gotchis",
    method: "PATCH",
    data: { "authenticity_token": token,
            gotchi: {health_action: "foot"}
          },
    success: function(data) {
      fullFill = ((data.fullity / 100) * $('.bar').width())
      $('.fillfull').css('width', fullFill);
      console.log(data.fullity);
      if(data.fullity > 50){
        $('.fillfull').css('background-color', 'lightgreen');
      }
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
        restFill = ((data.rest / 100) * $('.bar').width())
        $('.fillhealth').css('width', restFill);
        if(data.rest > 50){
          $('.fillhealth').css('background-color', 'lightgreen');
        }
        rest = data.rest;
        isDead();
      },
      failure: function(data){
        console.log(data);
      }
    });
  }, 3000);
});

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////// SHOWER OFF //////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

$('.moon').on('click', function (e) {
  clearInterval(bloodBath);
})
