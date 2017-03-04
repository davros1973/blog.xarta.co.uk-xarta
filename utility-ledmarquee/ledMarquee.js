/* This script and many more are available free online at
The JavaScript Source!! http://www.javascriptsource.com
Created by: Curt Turner | http://www.turner3d.net/ */

// the number of characters in the display
mwidth=20;

// delay in milliseconds between character shifts
mdelay=200;

// set to true if you want to reduce multiple spaces to a single space
dumpExtraSpaces=false;

mpos=0;
chars=" 0123456789abcdefghijklmnopqrstuvwxyz+-*/=?^&().,'!~$";
content=new Array();
color=new Array();

colors=new Array();
  colors['green']=0;
  colors['yellow']=-27;
  colors['red']=-54;
  colors['blue']=-81;

colorind=new Array();
  colorind[0]='green';
var mtxt;

function marqueeInit(){
 	mtxt=document.getElementById("ledmarquee").innerHTML.toLowerCase();
 	mtxt=mtxt.replace(/\.\.\./g,'~');
 	mtxt=mtxt.replace(/&/g,'&');
 	mtxt=mtxt.replace(/"/g,"'");
 	mtxt=mtxt.replace(/\[/g,'(');
 	mtxt=mtxt.replace(/\]/g,')');
 	mtxt=mtxt.replace(/\{/g,'(');
 	mtxt=mtxt.replace(/\}/g,')');
 	mtxt=mtxt.replace(/[\n\r]/g,' ');
 	if(dumpExtraSpaces) mtxt=mtxt.replace(/\s{2,}/g,' ');
 	bpos=mtxt.indexOf('<');
 	attempt=0;
 	while(bpos>=0){
  		mtxt.search(/<([^>]*)>/);
  		ctmp=RegExp.$1;
  		colorind[bpos]=ctmp;
  		mtxt=mtxt.replace(/<[^>]*>/,'');
  		bpos=mtxt.indexOf('<');
  		attempt++;
  		if(attempt>500){
  			// prevent browser lockups if something goes fishy (open <)
   			alert('parse failure');
  			 return false;
  		}
 	}
 	mcont="<div style='display:none'>"+mtxt+"<p> </p></div>";
 	for(i=0;i<mwidth;i++){
  		mcont+="<div class='digit' id='js_dig"+i+"'></div>\n";
  		mtxt=' '+mtxt+' ';
 	}
 	curcolor=0;
 	for(i=0;i<mtxt.length;i++){
  		if(colorind[i-mwidth]!=null){
  			 curcolor=colors[colorind[i-mwidth]]||0;
 		 }
 		color[i]=curcolor;
 		content[i]=-16*chars.indexOf(mtxt.substr(i,1));
 	}
 	document.getElementById("ledmarquee").style.width=(mwidth*16)+'px';
 	document.getElementById("ledmarquee").innerHTML=mcont;
 	document.getElementById("ledmarquee").style.visibility='visible';
 	mtimer=setInterval('marqueeScroll()',mdelay);
}

function marqueeScroll(){
	for(i=0;i<mwidth;i++){
		// Dave Bayliss edit
		if (document.getElementById('js_dig'+i))
		{
 			document.getElementById('js_dig'+i).style.backgroundPosition=content[i+mpos]+'px '+color[i+mpos]+'px';
		}
	}
	mpos++;
	if(mpos==mtxt.length-mwidth) mpos=0;
}

function onloadAppend(func){
 	var oldonload=window.onload;
 	if(typeof window.onload!='function'){
		// Dave Bayliss edit
		if(document.getElementById("ledmarquee")) {
 	 		window.onload=func;}
 	} else {
  		window.onload=function(){
 	  		if(oldonload) {
  				oldonload();
 			  }
			  // Dave Bayliss edit
			  if(document.getElementById("ledmarquee")) {
 			  	func();}
 		 }
 	}
}

onloadAppend(marqueeInit);



