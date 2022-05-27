var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){

   if(!started){
        // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
   }
});



//Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function(){

    //create a new variable called userChosenColour to store the id of the button that got clicked.
   var userChosenColour = $(this).attr("id");
   //add userChosenColour into userClickedPattern
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);

   animatePress(userChosenColour);
   //console.log(userClickedPattern);

   // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

    //once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

   //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
   level++;
   //update the h1 with this change in the value of level.
   $("#level-title").text("Level " + level);

    //generate a random number btw 0 to 3
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();              
 }

 function animatePress(currentColour){
     $("."+currentColour).addClass("pressed");

     setTimeout(function(){
        $("."+currentColour).removeClass("pressed");},100);
 }

 function checkAnswer(currentLevel){

    // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

       // console.log("success");

         //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
         if(userClickedPattern.length === gamePattern.length){
            //call nextSequence() after a 1000 milisecond delay.
            setTimeout(function(){
            nextSequence();},1000);
          }
    }
    else{
        console.log("wrong");

        //In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");
        //In the styles.css file, there is a class called "game-over", apply this class to the body 
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");},200);

        // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");
        // Call startOver() if the user gets the sequence wrong.
        startOver();

    }
 }

 function startOver(){
     //Inside this function, you'll need to reset the values of level, gamePattern and started variables.
     level = 0;
     gamePattern = [];
     started = false;
 }
