"use strict";
/*

$ver = 0.1
NOTED ADDED MARCH 2017: THIS IS AN OLD FILE OF MINE FROM YONKS AGO THAT I 
INTEND TO UPDATE TO LOOK FOR AN ELEMENT BY EITHER CLASS OR ID ... 
I MIGHT STILL RE-ADAPT ITS USE TO THIS SITE.

David Bayliss
*/

    function loadRibbon(id) {
        var ribbon = document.createElement('canvas');
        // USING CLASS INSTEAD SO DON'T HAVE TO CHANGE THEME ELEMENTS

        //var divRibbon = document.getElementById(id);
	var divRibbon = document.getElementsByClassName(id);
	//var divRibbon = document.createElement('div');
        console.log(divRibbon[0]);
        divRibbon[0].appendChild(ribbon);
        


        
        return ribbon;
    }

	function particle(W, H)
	{

		// location on the canvas
		this.location = {x: Math.random()*W, y: Math.random()*H};
		// radius - size of individual particle
        // ... can be 0 (if invisible which is ok)
		this.radius = 0;
		// speed
		this.speed = 1;  // effects new particle location distance calculation every time "draw" function called
        this.speed = Math.random();
		//steering angle in degrees range = 0 to 360
		this.angle = Math.random()*360;
		// colors
		var r = Math.round(Math.random()*255);
		var g = Math.round(Math.random()*255);
		var b = Math.round(Math.random()*255);
		var a = Math.random();   // alpha - transparency
        a = a/10;
		this.rgba = "rgba("+r+", "+g+", "+b+", "+a+")";

        return;
	}

     function linepoints(x1, y1, x2, y2)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        return;
    }


	function draw(countMax, W, H, particles, linestack, ctx, ribbon)
	{
	    if (draw.countUP)
        {
            //console.log("Counting-UP");
            draw.count++;
            particles.push(new particle(W, H)); // new object particle
        } else {
            //console.log("Counting-Down");
            draw.count--;
            particles.pop();
        }

        if (draw.count > countMax)
        {
            draw.countUP = false;
        }
        if (draw.count < 10)
        {
            draw.countUP = true;
            draw.hypnotise++;
        }

        //console.log(draw.count);

        // -------------------------------------------------------------------------------------------------------------
        // So this bit just fills in the canvas rectangle with chosen colour
        // every time "draw" is called setInterval(mSec)
        // without it, the drawn pixles would never disappear
        if (draw.count > (countMax - 2) && (draw.hypnotise > 5))
        {
            ctx.globalCompositeOperation = "lighter";
        } else {
            ctx.globalCompositeOperation = "source-over"; // example code uses "source-over" here
                                                          // i.e. cover entire rectangle
        }

        if (draw.hypnotise > 6)
        {
            draw.hypnotise = 0;
        }

        // if alpha-transparency is 1, then every draw call, the rgba colour is solidly drawn over the lines drawn
        // if alpha-transparency is 0, then every draw call, nothing gets "erased" and artifacts remain unchanged
        // problem seems to be, when chosing optimum transaprancy, a "trace" or "ghost image" is left.
        var alphatrans = 1/draw.count;
		ctx.fillStyle = "rgba(34, 34, 34, " + alphatrans + ")";
		ctx.fillRect(0, 0, W, H);
        // -------------------------------------------------------------------------------------------------------------



		ctx.globalCompositeOperation = "source-over"; // example code uses "lighter" here


		for(var i = 0; i < particles.length; i++)
		{
			var p1 = particles[i];

            // draw p1 (I think - even if radius is 0 - invisible - as need it drawn on canvas)
            ctx.fillStyle = p1.rgba;
            // if radius = 0, then basically saying fillRect(x,y,0,0) where x, y are start coordinates
			ctx.fillRect(p1.location.x, p1.location.y, p1.radius, p1.radius);

			//Lets move the particles
			//So we basically created a set of particles moving in random direction
			//at the same speed
			//Time to add ribbon effect
			for(var n = 0; n < particles.length; n++)
			{
				var p2 = particles[n];
				//calculating distance of particle with all other particles
				var yd = p2.location.y - p1.location.y;
				var xd = p2.location.x - p1.location.x;
				var distance = Math.sqrt(xd*xd + yd*yd);
				//draw a line between both particles if they are in 200px range
                // if particles move apart beyond 200px then existing connecting lines disappear (the life)
                var reasonableDist = 200;
                if(ribbon.width < (2.5 * reasonableDist))
                {
                    reasonableDist = ribbon.width/3;
                }
				if(distance < reasonableDist)
				{
				    ctx.globalCompositeOperation = "lighter";
					ctx.beginPath();
					ctx.lineWidth = 1;
					ctx.moveTo(p1.location.x, p1.location.y);
					ctx.lineTo(p2.location.x, p2.location.y);

					ctx.strokeStyle = p1.rgba;
					ctx.stroke();

					//The ribbons appear now.
                    linestack.unshift(new linepoints(p1.location.x, p1.location.y, p2.location.x, p2.location.y)); // new object linepoints

                    if (linestack.length > 1000)
                    {
                            ctx.globalCompositeOperation = "source-over";
                            var myline = linestack[linestack.length - 1];
  					        ctx.beginPath();
      					    ctx.lineWidth = 10;
  	    				    ctx.moveTo(myline.x1, myline.y1);
  		    			    ctx.lineTo(myline.x2, myline.y2);
                            ctx.strokeStyle = "rgba(34,34,34,0.08)";
  					        ctx.stroke();
                            linestack.pop();
                    }
				}
			}

			//We are using simple vectors here
			//New x = old x + speed * cos(angle)
			p1.location.x = p1.location.x + p1.speed*Math.cos(p1.angle*Math.PI/180);
			//New y = old y + speed * sin(angle)
			p1.location.y = p1.location.y + p1.speed*Math.sin(p1.angle*Math.PI/180);
			//You can read about vectors here:
			//http://physics.about.com/od/mathematics/a/VectorMath.htm

            // Stay within boundaries of canvas
			if(p1.location.x < 0) p1.location.x = W;
			if(p1.location.x > W) p1.location.x = 0;
			if(p1.location.y < 0) p1.location.y = H;
			if(p1.location.y > H) p1.location.y = 0;
		}
	}


jQuery.fn.exists = function(){return this.length>0;}
jQuery(document).ready(function($) {

    // console.log("jQuery(document).ready(function($) ... xarta.js");

    function ribbonDraw()
    {
        draw(countMax, W, H, particles, linestack, ctx, ribbon);
    }


    if ($('.site-branding-header-background-image').exists()) {
        // --------------------------------------------------------------------------------------------
        // "Ribbon" (originally but now heavily modified) html5 canvas effects on home-page
        // Originally from: http://thecodeplayer.com/walkthrough/glazing-ribbon-screensaver-effect-in-html5-canvas?s=rlt

        var ribbon = loadRibbon("site-branding-header-background-image");
        var ctx = ribbon.getContext("2d");

        ribbon.style.width ='100%';
        ribbon.style.height='100%';
        //ribbon.style.height='300px'; // setting fixed size for now until work-out positioning issues


        // ...then set the internal size to match
        ribbon.width  = ribbon.offsetWidth;
        ribbon.height = ribbon.offsetHeight;

        var W = ribbon.offsetWidth;
        var H = ribbon.offsetHeight;

        var linestack = []; // my array of linepoints

        // one particle to start with, then dynamically push/pop to array in draw()
    	var particles = []; // array
    	particles.push(new particle(W, H)); // new object particle

        var countMax = 20;

    	setInterval(ribbonDraw, 50); // mSEC between calling draw() over & over

        draw.countUP = true;
        draw.count = 1;
        draw.hypnotise = 0;


        // --------------------------------------------------------------------------------------------


    }




});

/*
-----------------------------------------------------------------------------------------
That wrapper will cause your code to be executed when the DOM is fully constructed.
If, for some reason, you want your code to execute immediately instead of waiting for
 the DOM ready event, then you can use this wrapper method instead:

(function($) {
    // Inside of this function, $() will work as an alias for jQuery()
    // and other libraries also using $ will not be accessible under this shortcut
})(jQuery);
-----------------------------------------------------------------------------------------

Look at:

$(window).load(function() {
    // ....
});

*/




