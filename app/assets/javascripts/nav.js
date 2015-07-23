
////////////////////////////////
//ANDEDDOGOTCHI GROUP PROJECT///
////////////////////////////////
// AUTHORS: Aarati Akkapeddi ///
//          Brandon Goodman ////
// PM:      Reshum Panchal /////
// UX:      Rosemary      //////
////////////////////////////////


/*~~~~~~~~FUN AUDIO STUFF~~~~~~~~~~*/
var audioElement;
      $(document).ready(function() {
        loadingSound = document.createElement('audio');
        loadingSound.setAttribute('src', '/assets/loadddding.wav'); //filler audio for now
        //audioElement.load()
        //$.get();
      });

 var audioElement2;
      $(document).ready(function() {
        foodSound = document.createElement('audio');
        foodSound.setAttribute('src', '/assets/eating.wav'); //filler audio for now
        //audioElement.load()
        //$.get();
      });

 var audioElement3;
      $(document).ready(function() {
        showerSound = document.createElement('audio');
        showerSound.setAttribute('src', '/assets/showering.wav'); //filler audio for now
        //audioElement.load()
        //$.get();
      });

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*<><><><><><><><>><><><><><><><><><><><><><><><><><><>*/
/*<><><><><><><><>><><><><><><><><><><><><><><><><><><>*/
/*<><><><><>REST LOGIC & BLOOD BATH LOGIC<><><><><><><>*/
/*<><><><><><><><>><><><><><><><><><><><><><><><><><><>*/
/*<><><><><><><><>><><><><><><><><><><><><><><><><><><>*/

/*<><><><><><>BREATHING<><><><><>*/
/*<><~Breathe in~><>*/
function on(){
  $('.gotchi-1').addClass('moving');
}
/*<><~Breathe out~><>*/
function off(){
 $('.gotchi-1').removeClass('moving');
}

setInterval(on,2090);
setInterval(off,1800);


