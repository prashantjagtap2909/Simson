


var buttonColours = ["red", "blue", "green", "yellow"];


var gamePattern = [];


var userClickedPattern = [];


var started = false;


var level = 0;

//6. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //7. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title2").text("Level " + level);
    nextSequence();
    started = true;
  }
});



//8. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //9. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //10. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  //console.log(userClickedPattern);

  //11. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


//12. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //13. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      // console.log("success");

      //14. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //15. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
            nextSequence();
          }, 1000);

        }

      } else {

        // console.log("wrong");

        //16. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");

        //17. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        //18. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title2").text("Game Over, Press Any Keyboard Key to Restart");

        //19. Call startOver() if the user gets the sequence wrong.
        startOver();

      }

}


//20. Inside game.js create a new function called nextSequence()
function nextSequence() {

  //21. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //22. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //23. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title2").text("Level " + level);



  //24. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

 
  var randomChosenColour = buttonColours[randomNumber];

  
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

/*

 
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

}
*/

 
  playSound(randomChosenColour);
}


function animatePress(currentColor) {


  $("#" + currentColor).addClass("pressed");


  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function playSound(name) {

  
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



function startOver() {

  
  level = 0;
  gamePattern = [];
  started = false;
}
