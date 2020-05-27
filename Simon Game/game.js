var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern = [];
var started=false;
var level=0;

$(".btn").on("click",function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
    
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

$(document).on("keypress", function(event){
    if (!started) {
        $("h1").text("Level " + level);
        nextsequence();
        started = true;
      }
    else{
        nextsequence();
    }  

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("succes");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press any key to continue!");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;

}



function nextsequence(){
    userClickedPattern=[];
    
    level++;
    $("h1").text("Level " + level);

    var randomNumber= Math.floor((Math.random()*4));
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    var bId= "#" + randomChoosenColor;
    $(bId).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    animatePress(randomChoosenColor);

}


