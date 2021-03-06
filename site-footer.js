jQuery(document).ready(function($) {
    
    // 2017 February, by admin@xarta.co.uk
    // first time I've done any real JavaScript, JQuery, CSS stuff in many years
    // ... and I never previously learned JavaScript or CSS beyond pretty basic stuff
    // ... really finding my feet.  Hopefully I'll mature and advance this code over time.

    // *********************************************************
    // FOLLOWING FUNCTIONS TO DO WITH DISPLAYING/PRESENTING CODE
    // *********************************************************

    // -> using SyntaxHighlighter Evolved plug-in, and combining with wp-colorbox plug-in
    // -> also uses a plug-in for easy css buttons with shortcodes

    // override: wp-colorbox/wp-colorbox.js
    $(".wp-colorbox-inline").colorbox({inline:true, width:"99%", minWidth:"99%",maxWidth:"99%"}).delay(50);


    $(".xarta-code-style").width("100%");                   // targeting divs with presentation code
    //var curWidthPx = parseInt($(window).width()+"px");    // browser window width
    //var big = curWidthPx > 1000;                          // might use in future (but using @media queries)
    

    // call this from window resize event available to JQuery, and pass as a callback
    // to the function that pre-pends the buttons and sets-up the on-click events
    function codeButtonLabelChange(){
        // using ".xarta-big-code" class in case I want to selectively target 
        // ONLY specific code presentation

        var curBigCodeWidthPx = parseInt($(".xarta-big-code").width());
        var small = curBigCodeWidthPx < 500;
        var labelFont = small ? "f" : "font";
        var labelWidth = small ? "w" : "width";

        $(".increase-font").html(labelFont); // classes target css buttons
        $(".decrease-font").html(labelFont);
        $(".inflate-code").html(labelWidth);
        $(".shrink-code").html(labelWidth); 
    };  

    // so buttons only exist after prepended by JQuery
    function renderCodeButtons(codeButtonLabelChange){

        var myprependFont = ' <a class="fasc-button fasc-size-large fasc-type-glossy fasc-ico-before dashicons-plus' +
            ' increase-font" style="background-color: #000; color: #ffffff;" data-fasc-style="background-color' + 
            ':#000;color:#ffffff;"></a> <a class="fasc-button fasc-size-large fasc-type-glossy fasc-ico-before' +
            ' dashicons-minus decrease-font" style="background-color: #000; color: #ffffff;" ' +
            ' data-fasc-style="background-color:#000;color:#ffffff;"></a>';
   
        var myprependWidth = '<a class="fasc-button fasc-size-large fasc-type-glossy fasc-ico-before dashicons-plus' +
            ' inflate-code" style="background-color: #000; color: #ffffff;" data-fasc-style="background-color' +
            ':#000;color:#ffffff;"></a> <a class="fasc-button fasc-size-large fasc-type-glossy fasc-ico-before' +
            ' dashicons-minus shrink-code" style="background-color: #000; color: #ffffff;" ' +
            ' data-fasc-style="background-color:#000;color:#ffffff;"></a>';

        $("p+ .xarta-code-buttons").prepend(myprependFont);
        $("p+ .xarta-code-buttons").prepend(myprependWidth);
        codeButtonLabelChange();


        // Set-up the on-click events for the buttons
        // initial css style sheet uses @media queries ...
        // ems as a fallback, and vws if supported
        // but once manually changing here, px should be fine

        $("a.decrease-font").on( "click", function() {
            var curSize = parseInt($(".xarta-big-code").css('font-size'));
            curSize = curSize - 1;
            $( '.xarta-big-code' ).each(function () {
                this.style.setProperty( 'font-size', curSize +'px', 'important' );
            });
        });

        $("a.increase-font").on( "click", function() {
            var curSize = parseInt($(".xarta-big-code").css('font-size'));
            curSize = curSize + 1;
            $( '.xarta-big-code' ).each(function () {
                this.style.setProperty( 'font-size', curSize +'px', 'important' );
            });
        });

        // on-click events for changing the width of the code-presentation area
        // this will also change the labels of the buttons if required
        // (the function was passed to this function)

        $("a.shrink-code").on( "click", function() {
            // .entry-content class particular to this theme (maybe)

            var probableContainerForPercentCalcs;

            if($(".tabcontents").length)
            {
                console.log("Ok: seem to be in a menutab");
                probableContainerForPercentCalcs = ".tabcontents";
                // so that new % doesn't end-up less than current%    
            }
            else
            {
                probableContainerForPercentCalcs = ".entry-content";    
            }

            var curContainerWidthPx = parseInt($(probableContainerForPercentCalcs).width());
            //var curWinWidthPx = parseInt($(window).width()+"px");
            var curWidth = parseInt($(".xarta-code-width").width());
            var fivePercent = curContainerWidthPx/20;
            var newWidthPx = curWidth-fivePercent;
         
            // IMPORTANT: keep as percentage e.g. orientation on mobile device
            var newWidthPercent = newWidthPx/curContainerWidthPx*100;

            $(".xarta-code-width").width(newWidthPercent+"%");
            codeButtonLabelChange();
        });


        $("a.inflate-code").on( "click", function() {
            var probableContainerForPercentCalcs;

            if($(".tabcontents").length)
            {
                console.log("Ok: seem to be in a menutab");
                probableContainerForPercentCalcs = ".tabcontents";
                // so that new % doesn't end-up less than current%    
            }
            else
            {
                probableContainerForPercentCalcs = ".entry-content";    
            }

            var curContainerWidthPx = parseInt($(probableContainerForPercentCalcs).width());
            console.log("curContainerWidthPx: "+curContainerWidthPx);
            //var curWinWidthPx = parseInt($(window).width()+"px");
            //console.log("curWinWidthPx: "+curWinWidthPx);
            var curWidth = parseInt($(".xarta-code-width").width());
            console.log("curWidth: "+curWidth);
            var fivePercent = curContainerWidthPx/20;
            console.log("fivePercent: "+fivePercent);
            var newWidthPx = curWidth+fivePercent;
            console.log("newWidthPx: "+newWidthPx);
            var oldWidthPercent = curWidth/curContainerWidthPx*100;
            console.log("oldWidthPercent: "+oldWidthPercent);
            var newWidthPercent = newWidthPx/curContainerWidthPx*100;
            console.log("newWidthPercent: "+newWidthPercent);

            $(".xarta-code-width").width(newWidthPercent+"%");
            codeButtonLabelChange();
        });
    
    }; // end renderCodeButtons()

    

    renderCodeButtons(codeButtonLabelChange);
    $(window).resize(function() {
        codeButtonLabelChange();
    }).resize();

    


    // USE FANCY FONT FOR SITE TITLE ------------------------------------------ 
    $('.site-title').html('<a href="https://blog.xarta.co.uk/" rel="home">ARA        TC</a>');

    /* NEEDS WORK!
    // first word of every p assign first-word css class
    $('p').not($('p').has('img')).each(function() {
        var word = $(this).html();
        var index = word.indexOf(' ');
        if(index == -1) {
            index = word.length;
        }
        $(this).html('<span class="first-word">' + word.substring(0, index) + '</span>' + word.substring(index, word.length));
    });
    */
    $("p:first").addClass("first-paragraph");


});

// script loaded in site header
function ledMsg($entry_title)
{
    /*  <div id="ledmarquee">
            Multi-<red>C<blue>o<yellow>l<green>o<red>r<green> JavaScript LED marquee - IE & FF compatible -
            <yellow>no fonts required<green> - one image (36k) - user-defined speed & width - 012...789 abc...xyz +-*
            /=?^&().,'!$...
        </div>
    */

    var ledDiv = '<div id=\"ledmarquee\">' + $entry_title + '</div>';
    var ledDivTarget = document.getElementsByClassName("entry-title");
    ledDivTarget[0].innerHTML = ledDiv; 
    onloadAppend(marqueeInit);
}