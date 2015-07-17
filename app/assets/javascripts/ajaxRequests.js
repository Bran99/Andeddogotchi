var token = $('[name="csrf-token"]').attr('content'),
    isSleeping = 2000,
    fullity,
    interval;

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
    isSleeping = 60000;
  }
})

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////// DEATH CHECKER ///////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

function isDead() {
  if (fullity <= 0) {
    $.ajax({
      url: "/gotchis",
      method: "DELETE",
      data: { "authenticity_token": token },
      success: function(data) {
        clearInterval(interval);
      }
    })
    $('.death-hidden').removeClass('death-hidden')
              .attr('class', 'death');
  }
}

//////////////////////////////////////////////
//////////////////////////////////////////////
///////////////// LOAD PAGE //////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

$(document).ready(function () {
  $.ajax({
    url: "/gotchis",
    method: "PATCH",
    data: { "authenticity_token": token,
            gotchi: {health_action: "load"}
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
///////////////// PAGE TICK //////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

interval = setInterval(function () {
  $.ajax({
    url: "/gotchis",
    method: "PATCH",
    data: { "authenticity_token": token,
            gotchi: {health_action: "tick"}
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
}, isSleeping)

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
