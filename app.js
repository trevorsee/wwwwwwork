/*  TextPad - 1.2.0
 *
 *  File: app.js
 *  Author: Paulo Nunes, http://syndicatefx.com
 *  Source: https://github.com/syndicatefx/textpad
 *  License: MIT
 */

// Include useful dependencies
// Smoke.js - https://github.com/hxgf/smoke.js
(function(e,t){var n={smoketimeout:[],init:false,zindex:1e3,i:0,bodyload:function(e){var r=t.createElement("div");r.setAttribute("id","smoke-out-"+e);r.className="smoke-base";r.style.zIndex=n.zindex;n.zindex++;t.body.appendChild(r)},newdialog:function(){var t=(new Date).getTime();t=Math.random(1,99)+t;if(!n.init){n.listen(e,"load",function(){n.bodyload(t)})}else{n.bodyload(t)}return t},forceload:function(){},build:function(t,r){n.i++;r.stack=n.i;t=t.replace(/\n/g,"<br />");t=t.replace(/\r/g,"<br />");var i="",s="OK",o="Cancel",u="",a="",f;if(r.type==="prompt"){i='<div class="dialog-prompt">'+'<input id="dialog-input-'+r.newid+'" type="text" '+(r.params.value?'value="'+r.params.value+'"':"")+" />"+"</div>"}if(r.params.ok){s=r.params.ok}if(r.params.cancel){o=r.params.cancel}if(r.params.classname){u=r.params.classname}if(r.type!=="signal"){a='<div class="dialog-buttons">';if(r.type==="alert"){a+='<button id="alert-ok-'+r.newid+'">'+s+"</button>"}else if(r.type==="quiz"){if(r.params.button_1){a+='<button class="quiz-button" id="'+r.type+"-ok1-"+r.newid+'">'+r.params.button_1+"</button>"}if(r.params.button_2){a+='<button class="quiz-button" id="'+r.type+"-ok2-"+r.newid+'">'+r.params.button_2+"</button>"}if(r.params.button_3){a+='<button class="quiz-button" id="'+r.type+"-ok3-"+r.newid+'">'+r.params.button_3+"</button>"}if(r.params.button_cancel){a+='<button id="'+r.type+"-cancel-"+r.newid+'" class="cancel">'+r.params.button_cancel+"</button>"}}else if(r.type==="prompt"||r.type==="confirm"){if(r.params.reverseButtons){a+='<button id="'+r.type+"-ok-"+r.newid+'">'+s+"</button>"+'<button id="'+r.type+"-cancel-"+r.newid+'" class="cancel">'+o+"</button>"}else{a+='<button id="'+r.type+"-cancel-"+r.newid+'" class="cancel">'+o+"</button>"+'<button id="'+r.type+"-ok-"+r.newid+'">'+s+"</button>"}}a+="</div>"}f='<div id="smoke-bg-'+r.newid+'" class="smokebg"></div>'+'<div class="dialog smoke '+u+'">'+'<div class="dialog-inner">'+t+i+a+"</div>"+"</div>";if(!n.init){n.listen(e,"load",function(){n.finishbuild(t,r,f)})}else{n.finishbuild(t,r,f)}},finishbuild:function(e,r,i){var s=t.getElementById("smoke-out-"+r.newid);s.className="smoke-base smoke-visible  smoke-"+r.type;s.innerHTML=i;while(s.innerHTML===""){s.innerHTML=i}if(n.smoketimeout[r.newid]){clearTimeout(n.smoketimeout[r.newid])}n.listen(t.getElementById("smoke-bg-"+r.newid),"click",function(){n.destroy(r.type,r.newid);if(r.type==="prompt"||r.type==="confirm"||r.type==="quiz"){r.callback(false)}else if(r.type==="alert"&&typeof r.callback!=="undefined"){r.callback()}});switch(r.type){case"alert":n.finishbuildAlert(e,r,i);break;case"confirm":n.finishbuildConfirm(e,r,i);break;case"quiz":n.finishbuildQuiz(e,r,i);break;case"prompt":n.finishbuildPrompt(e,r,i);break;case"signal":n.finishbuildSignal(e,r,i);break;default:throw"Unknown type: "+r.type}},finishbuildAlert:function(r,i,s){n.listen(t.getElementById("alert-ok-"+i.newid),"click",function(){n.destroy(i.type,i.newid);if(typeof i.callback!=="undefined"){i.callback()}});t.onkeyup=function(t){if(!t){t=e.event}if(t.keyCode===13||t.keyCode===32||t.keyCode===27){n.destroy(i.type,i.newid);if(typeof i.callback!=="undefined"){i.callback()}}}},finishbuildConfirm:function(r,i,s){n.listen(t.getElementById("confirm-cancel-"+i.newid),"click",function(){n.destroy(i.type,i.newid);i.callback(false)});n.listen(t.getElementById("confirm-ok-"+i.newid),"click",function(){n.destroy(i.type,i.newid);i.callback(true)});t.onkeyup=function(t){if(!t){t=e.event}if(t.keyCode===13||t.keyCode===32){n.destroy(i.type,i.newid);i.callback(true)}else if(t.keyCode===27){n.destroy(i.type,i.newid);i.callback(false)}}},finishbuildQuiz:function(r,i,s){var o,u,a;n.listen(t.getElementById("quiz-cancel-"+i.newid),"click",function(){n.destroy(i.type,i.newid);i.callback(false)});if(o=t.getElementById("quiz-ok1-"+i.newid))n.listen(o,"click",function(){n.destroy(i.type,i.newid);i.callback(o.innerHTML)});if(u=t.getElementById("quiz-ok2-"+i.newid))n.listen(u,"click",function(){n.destroy(i.type,i.newid);i.callback(u.innerHTML)});if(a=t.getElementById("quiz-ok3-"+i.newid))n.listen(a,"click",function(){n.destroy(i.type,i.newid);i.callback(a.innerHTML)});t.onkeyup=function(t){if(!t){t=e.event}if(t.keyCode===27){n.destroy(i.type,i.newid);i.callback(false)}}},finishbuildPrompt:function(r,i,s){var o=t.getElementById("dialog-input-"+i.newid);setTimeout(function(){o.focus();o.select()},100);n.listen(t.getElementById("prompt-cancel-"+i.newid),"click",function(){n.destroy(i.type,i.newid);i.callback(false)});n.listen(t.getElementById("prompt-ok-"+i.newid),"click",function(){n.destroy(i.type,i.newid);i.callback(o.value)});t.onkeyup=function(t){if(!t){t=e.event}if(t.keyCode===13){n.destroy(i.type,i.newid);i.callback(o.value)}else if(t.keyCode===27){n.destroy(i.type,i.newid);i.callback(false)}}},finishbuildSignal:function(r,i,s){t.onkeyup=function(t){if(!t){t=e.event}if(t.keyCode===27){n.destroy(i.type,i.newid);if(typeof i.callback!=="undefined"){i.callback()}}};n.smoketimeout[i.newid]=setTimeout(function(){n.destroy(i.type,i.newid);if(typeof i.callback!=="undefined"){i.callback()}},i.timeout)},destroy:function(e,r){var i=t.getElementById("smoke-out-"+r);if(e!=="quiz"){var s=t.getElementById(e+"-ok-"+r)}var o=t.getElementById(e+"-cancel-"+r);i.className="smoke-base";if(s){n.stoplistening(s,"click",function(){});t.onkeyup=null}if(e==="quiz"){var u=t.getElementsByClassName("quiz-button");for(var a=0;a<u.length;a++){n.stoplistening(u[a],"click",function(){});t.onkeyup=null}}if(o){n.stoplistening(o,"click",function(){})}n.i=0;i.innerHTML=""},alert:function(e,t,r){if(typeof r!=="object"){r=false}var i=n.newdialog();n.build(e,{type:"alert",callback:t,params:r,newid:i})},signal:function(e,t,r){if(typeof r!=="object"){r=false}var i=5e3;if(r.duration!=="undefined"){i=r.duration}var s=n.newdialog();n.build(e,{type:"signal",callback:t,timeout:i,params:r,newid:s})},confirm:function(e,t,r){if(typeof r!=="object"){r=false}var i=n.newdialog();n.build(e,{type:"confirm",callback:t,params:r,newid:i})},quiz:function(e,t,r){if(typeof r!=="object"){r=false}var i=n.newdialog();n.build(e,{type:"quiz",callback:t,params:r,newid:i})},prompt:function(e,t,r){if(typeof r!=="object"){r=false}var i=n.newdialog();return n.build(e,{type:"prompt",callback:t,params:r,newid:i})},listen:function(e,t,n){if(e.addEventListener){return e.addEventListener(t,n,false)}if(e.attachEvent){return e.attachEvent("on"+t,n)}return false},stoplistening:function(e,t,n){if(e.removeEventListener){return e.removeEventListener(t,n,false)}if(e.detachEvent){return e.detachEvent("on"+t,n)}return false}};n.init=true;if(typeof module!="undefined"&&module.exports){module.exports=n}else if(typeof define==="function"&&define.amd){define("smoke",[],function(){return n})}else{this.smoke=n}})(window,document)
// Countable.js - https://github.com/RadLikeWhoa/Countable
!function(e){"use strict";function n(e){for(var n,t,r=[],o=0,i=e.length;i>o;)n=e.charCodeAt(o++),n>=55296&&56319>=n&&i>o?(t=e.charCodeAt(o++),56320==(64512&t)?r.push(((1023&n)<<10)+(1023&t)+65536):(r.push(n,t),o--)):r.push(n);return r}function t(e,n){var t=Object.prototype.toString.call(e),r=e&&(("[object NodeList]"===t||"[object HTMLCollection]"===t)&&e.length||1===e.nodeType),o=n&&"function"==typeof n;return"console"in window&&"warn"in console&&(r||console.warn("Countable: No valid elements were found"),o||console.warn('Countable: "'+n+'" is not a valid callback function')),r&&o}function r(e){var n={hardReturns:!1,stripTags:!1,ignoreReturns:!1,ignoreZeroWidth:!0};for(var t in e)n.hasOwnProperty(t)&&(n[t]=e[t]);return n}function o(e,t){var r,o=""+("value"in e?e.value:e.innerText||e.textContent);return t.stripTags&&(o=o.replace(/<\/?[a-z][^>]*>/gi,"")),t.ignoreZeroWidth&&(o=o.replace(/[\u200B]+/,"")),r=o.trim(),{paragraphs:r?(r.match(t.hardReturns?/\n{2,}/g:/\n+/g)||[]).length+1:0,sentences:r?(r.match(/[.?!…]+./g)||[]).length+1:0,words:r?(r.replace(/['";:,.?¿\-!¡]+/g,"").match(/\S+/g)||[]).length:0,characters:r?n(r.replace(/\s/g,"")).length:0,all:n(t.ignoreReturns?o.replace(/[\n\r]/g,""):o).length}}function i(e,n){var t=e.length;if("undefined"!=typeof t)for(;t--;)n(e[t]);else n(e)}var a=[],c="oninput"in document?"input":"keyup";navigator.userAgent.match(/MSIE 9.0/)&&(c="keyup"),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var u={live:function(e,n,u){var l=r(u),s=function(e){var t=function(){n.call(e,o(e,l))};a.push({element:e,handler:t}),t(),e.addEventListener?e.addEventListener(c,t,!1):e.attachEvent&&e.attachEvent("on"+c,t)};if(t(e,n))return e.length?i(e,s):s(e),this},die:function(e){return t(e,function(){})?(i(e,function(e){var n;i(a,function(t){t.element===e&&(n=t)}),n&&(e.removeEventListener?e.removeEventListener(c,n.handler,!1):e.detachEvent&&e.detachEvent("on"+c,n.handler),a.splice(a.indexOf(n),1))}),this):void 0},once:function(e,n,a){return t(e,n)?(i(e,function(e){n.call(e,o(e,r(a)))}),this):void 0},count:function(e,n,t){return this.once(e,n,t)},enabled:function(e){var n=!1;return e&&1===e.nodeType&&i(a,function(t){t.element===e&&(n=!0)}),n}};"object"==typeof exports?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):e.Countable=u}(this);

/*--------------------------------------
 *  Let's build this puppy!
 *  Bare with me, i'm not a Javascript guru.
 *-------------------------------------*/

document.addEventListener("DOMContentLoaded", function(event) {
  // Declare our variables

  var content = document.getElementById("listContent"),
      space = document.getElementById("cardSpace"),
      holder = document.getElementById("cardSpace"),
      start   = document.getElementById("start"),
      answer   = document.getElementById("answer"),
      list    = document.getElementById("list"),
      cards   = document.getElementById("cards"),
      items = [];
      stateIsList = true;

  Array.prototype.randomElement = function () {
      return this[Math.floor(Math.random() * this.length)]
  }

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  new Clipboard('.copy');

  /*-------------------------------------
   *  Deal with LocalStorage availability
   *  1.Test to see if LocalStorage is available.
   *  2.If available, set and get items, where good to go.
   *  3.If NOT available fire alert message to user.
   *------------------------------------*/
  function hasStorage() {  //1
    var test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  };


  if(hasStorage() === true){  //2

    content.addEventListener("keyup", function() {
      localStorage.setItem("textPad-content", this.value);
    });

    if(localStorage.getItem("textPad-content")) {
      content.value = localStorage.getItem("textPad-content");
    }

  }else{  //3
    console.log("Sorry, either your browser doesn't support LocalStorage, or you have exceeded storage limits!");
  };

  content.scrollTop = content.scrollHeight;

  function getAnswer(){
    items = content.value.split("\n");
    item1 = items.randomElement();
    item2 = items.randomElement();
    item3 = items.randomElement();
  }

  function combineIdea(){
    getAnswer();
    answer.innerHTML ='The idea combines <span class="red">' + item1 + '</span>, <span class="red">' + item2 + '</span>, and <span class="red">' + item3 + '</span>.';

  }

  function showList(){
    if (!stateIsList) {
      stateIsList = !stateIsList;
      console.log('you are now in list mode');
      space.style.display = 'none';
      content.style.display = 'block';
      list.className += " underline";
      cards.className = list.className.replace(new RegExp('(?:^|\\s)'+ 'underline' + '(?:\\s|$)'), ' ');
    }
  }

  function showCards(){
    if (stateIsList) {
      stateIsList = !stateIsList;
      console.log('you are now in card mode');
      content.style.display = 'none';
      space.style.display = 'block';
      cards.className += " underline";
      list.className = list.className.replace(new RegExp('(?:^|\\s)'+ 'underline' + '(?:\\s|$)'), ' ');
      updateCards();
    }
  }

  function updateCards(){
    items = content.value.split("\n");
    var w = window.innerWidth;
    var h = window.innerHeight;
    console.log(w);
    console.log(h);
    holder.innerHTML = '';

    for (i=0; i<items.length; i++){
      var rot = getRandomInt(-45,+45)
      //var x = getRandomInt(-100,+100)
      //var y = getRandomInt(-100,+100)
      //var transform = 'style="overflow-y: scroll; overflow-x: visible; transform: translateX('+ x +'px) translateY('+ y +'px) rotate('+ rot +'deg)"'
      var x = getRandomInt(0, w-250);
      var y = getRandomInt(70, items.length/300*(4000+w));
      var transform = 'style="top:'+ y +'px; left:'+ x +'px; transform: rotate('+ rot +'deg)"'
      var card = '<div class="card-hover bg-white shadow-4 w5 h4 center dib absolute flex items-center justify-around pa4 box-sizing"' + transform + '>'+ items[i] + "</div>";
      holder.innerHTML = holder.innerHTML + card;
    }
  }

  start.addEventListener("click", function() {
    combineIdea();
  });

  list.addEventListener("click", function() {
    showList();
  });

  cards.addEventListener("click", function() {
    showCards();
  });

});
