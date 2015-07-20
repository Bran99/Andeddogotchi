
$(window).resize(function(){
  var iw = $('body').innerWidth();
  console.log(iw);
    if(iw <= 768){
        console.log(iw);
        console.log('poop2');
        var scrollTo = 1000;
        $('body').animate({'scrollLeft': scrollTo}, 800); // use an animation to scroll to the destination
    }
});