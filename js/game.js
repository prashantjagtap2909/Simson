


var buttonColours = ["red", "blue", "green", "yellow"];


var gamePattern = [];


var userClickedPattern = [];


var started = false;


var level = 0;


$(document).keypress(function() {
  if (!started) {

    
    $("#level-title2").text("Level " + level);
    nextSequence();
    started = true;
  }
});




$(".btn").click(function() {

  
  var userChosenColour = $(this).attr("id");


  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  

 
  checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel) {

   
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

     

     
      if (userClickedPattern.length === gamePattern.length){

       
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
