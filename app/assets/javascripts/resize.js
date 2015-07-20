
$(window).resize(function(){
  var iw = $('body').innerWidth();
  console.log(iw);
    if(iw <= 640){
        console.log(iw);
        var scrollTo = 200;
        $('body').animate({'scrollLeft': scrollTo}, 800); // use an animation to scroll to the destination
    } else if(iw <= 768){
        console.log(iw);
        var scrollTo2 = 1000;
        $('body').animate({'scrollLeft': scrollTo2}, 800); // use an animation to scroll to the destination
    }
});