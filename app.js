/*  TextPad - 1.2.0
 *
 *  File: app.js
 *  Author: Paulo Nunes, http://syndicatefx.com
 *  Source: https://github.com/syndicatefx/textpad
 *  License: MIT
 */

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
      copy = document.getElementById("copy"),
      items = [],
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
    copy.className += " db";
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
