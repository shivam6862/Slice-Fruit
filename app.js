var playing = false;
var score;
var trailsleft;
var step;
var action; //used for set interval function
var fruits = [
  "apple",
  "banana",
  "gauva",
  "mango",
  "pineapple",
  "peach",
  "pear",
  "cherries",
  "grapes",
  "orange",
  "water",
];

// write your name to website game
var yourname = "Player";
yourname = prompt("Please enter your name. ");
var yourname = yourname.trim();
if (yourname.length == 0) {
  document.getElementById("name").innerHTML = "Hi, Player";
  yourname = "Player";
} else {
  document.getElementById("name").innerHTML = "HI, ";
  document.getElementById("name").innerHTML += yourname.toUpperCase();
}

// coding function start from this point
$(function () {
  // clicking the start button
  $("#restart").click(function () {
    // if we are already playing
    if (playing == true) {
      // reload page
      location.reload();
    } else {
      //game strated
      playing = true;

      // set score equal to 0
      score = 0;
      $("#scorevalue").html(score);

      // show abaliable
      $("#avaiable").show();
      trailsleft = 3;
      addHeart();

      // hide game over box
      $("#gameover").hide();

      // changr button to reset game
      $("#restart").html("Reset Game");

      // Start sending fruit
      startAction();
    }
  });

  // function start from here

  // function-1
  // slicing a fruit on mouseover function
  $("#fruit1").mouseover(function () {
    // update score
    score++;
    $("#scorevalue").html(score);

    // slice cutting sound from background
    $("#slicesound")[0].play();

    //play sound
    // document.getElementById("slicesound").play();

    // stop down
    clearInterval(action);

    // hide fruit

    //slice fruit
    $("#fruit1").hide("explode", 500);

    // send new fruit
    setTimeout(startAction, 800);
  });

  // function-2
  //fill trialLeft box with hearts and removing the older heart
  function addHeart() {
    //first cleaning the add heart box
    $("#avaiable").empty();

    // filling with new heart
    for (i = 0; i < trailsleft; i++) {
      $("#avaiable").append('<img src="/img/heart.jpg" class="life"> ');
    }
  }

  // function-3
  // start sending fruit to the question box
  function startAction() {
    // generating a fruit
    // $("#question").append('<img src="../img/apple.jpg" class="fruit">');
    $("#fruit1").show();

    //choose a random fruit
    choosefruit();

    // random postion the fruit in the screen
    $("#fruit1").css({
      left: Math.round(Math.random() * ($(".myQuestion").width() - 100)),
      top: -50,
    });

    // generating a random step or giving speed value
    step = 1 + Math.round(Math.random() * 5); //changing the step

    // move fruit by ont step every 10ms
    action = setInterval(function () {
      $("#fruit1").css("top", $("#fruit1").position().top + step); // moving fruit by one step each times

      // check if fruit is to low or not
      if ($("#fruit1").position().top > $(".myQuestion").height()) {
        // check if we have any trail left
        if (trailsleft > 1) {
          // generating a fruit
          $("#fruit1").show();

          //choose a random fruit
          choosefruit();

          // random postion the fruit in th screen
          $("#fruit1").css({
            left: Math.round(Math.random() * ($(".myQuestion").width() - 100)),
            top: -50,
          });

          // generating a random step
          step = 1 + Math.round(Math.random() * 5); //changing the step

          // reduce trail by one
          trailsleft--;
          // populate heart
          addHeart();
        } else {
          // game over
          playing = false; // we are not paying any more
          $("#restart").html("Play Agian"); //change buttton to play again
          $("#gameover").show();
          $("#gameover").html(
            "<p>Congratulation! " +
              yourname +
              "</p><p>Your Score is " +
              score +
              "</p><p>Game Over!</p>"
          );
          $("#avaiable").hide();
          stopAction();
        }
      }
    }, 10);
  }

  // function-4
  // generate a random fruit
  function choosefruit() {
    $("#fruit1").attr(
      "src",
      "/img/" + fruits[Math.round(Math.random() * 10)] + ".jpg"
    );
  }

  // function-5
  // stop in the action
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
