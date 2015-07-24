////////////////////////////////
//ANDEDDOGOTCHI GROUP PROJECT///
////////////////////////////////
// AUTHORS: Aarati Akkapeddi ///
//          Brandon Goodman ////
// PM:      Reshum Panchal /////
// UX:      Rosemary      //////
////////////////////////////////



/*<><><><><><><><>><><><><><><><><><><><><><><><><><><>*/
/*<><><><><><><><>><><><><><><><><><><><><><><><><><><>*/
/*<><><><><><><><>CANVAS (BLOOD BATH)<><><><><><><><><>*/
/*<><><><><><><><>><><><><><><><><><><><><><><><><><><>*/
/*<><><><><><><><>><><><><><><><><><><><><><><><><><><>*/
function bloodbath(){
var iw = $('body').innerWidth();
 function resizeCanvas(){
  
  console.log('mew');
          $(window).resize(function(){
                     //initial drawing of canvas and append to body
              iw = $('body').innerWidth();
              canvas.width = iw;
              canvas.height = $('.play').height()+50;
              var grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);
              grd.addColorStop(0, '#000');
              // dark blue
              grd.addColorStop(.50, '#191970');
              grd.addColorStop(1, '#800000')
              c.fillStyle = grd;
              c.fillRect(0,0, $(window).width(), $(window).height());
              $(canvas).appendTo('.canvas');
          });
      }

  console.log('canvas scripts loaded');

  //Declare global variables

  var canvas = document.createElement("canvas");
     var c = canvas.getContext('2d');

      $(document).ready(function(){
        //initial drawing of canvas and append to body
        canvas.width = $('.play').width();
        canvas.height = $('.play').height()+50;
        var grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);
        grd.addColorStop(0, '#000');
        // dark blue
        grd.addColorStop(.50, '#191970');
        grd.addColorStop(1, '#800000')
        c.fillStyle = grd;
        c.fillRect(0,0, $(window).width(), $(window).height());
        $(canvas).appendTo('.canvas');

        var particles = {};
        var particleIndex = 0;
        var particleNum = 20;
        var mouseX;
        var mouseY;

        //Particle Exploder
        $(document).on('click', function(event){
          for(var i in particles){
            particles[i].vx *= 90;
            particles[i].vy *= 90;

          }
        });

        //Particle emitter on mouse coordinates
        $(document).on('mousemove', function(event){
          //sets the mouseX to wherever the mouse is whenever the mouse moves
          mouseX = event.pageX;
          mouseY = event.pageY;
        });

        //particle constructor

        function Particle(){
          this.x = (iw/10) * 3.5;
          this.y = 150;

          //Random speeds
          this.vx = Math.random() * 20 -10;
          this.vy = Math.random() * 20 -10;

          //Increment the particle Index
          //Add this particle to the particles object with a key of particle index
          particleIndex ++;
          particles[particleIndex] = this;
          this.id = particleIndex;

          //add a lifespan
          this.life = 0;
          this.maxLife = Math.random() * 20 + 20;

        }

        Particle.prototype.draw = function(){
          this.x += this.vx;
          this.y += this.vy;
          this.gravity = 3;
          var myY = this.y;

          //simulate gravity
          this.vy += this.gravity;

          //So blood is diff shades of red (50 shades exactly, jk)
          c.fillStyle = 'rgb('
             +( Math.floor(Math.random() * 255) + 150)+','
             + Math.floor(Math.random() * 20) + ','
             + Math.floor(Math.random() * 20) + ')'
            ;
         //<><><><OPTIONAL c.fillStyle = this.color; <><><>*/
          c.fillRect(this.x, this.y, 10, 10);
          //Age your particle
          this.life++;
          //If particle is too old, delete it.
          if(this.life >= this.maxLife){
            delete particles[this.id];
          }

        };

        if( this.Y > canvas.height/5){
          this.vy *= -1.6;
          this.vx *= 0.6;
          console.log('gravity');
          this.Y = canvas.height/2;
        }


        setInterval(function(){
          //adding gradient bg
          var grd = c.createLinearGradient(0, 0, canvas.width/300, canvas.height);
          grd.addColorStop(0, '#000');
          grd.addColorStop(.50, '#191970');
          grd.addColorStop(1, '#800000')
          c.fillStyle = grd;
          /* c.fillStyle = 'rgba(255,255,255,0.4)';*/
          c.fillRect(0,0,$(window).width(), $(window).height());

          for(var i = 0; i < particleNum; i ++){
            new Particle();
          }

          for(var j in particles){
            particles[j].draw();
          }
        },
        30);


        resizeCanvas();

        });



};
