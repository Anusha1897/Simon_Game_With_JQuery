//alert("Hello")
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"]
var level =0
var started=false;


$(document).keypress(function(event){
    
    if(!started)  {
        $('#level-title').text('level 0')
        nextSequence()
        started=true
    }
    
})

$('.btn').click(function(event){
    var userChosenColour = event.target.id
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(event.target.id)
   
    checkAnswer(userClickedPattern.length-1)
})



function animatePress(currentColour){
    $("#"+currentColour).addClass('pressed')
    setTimeout(function() {
        $("#"+currentColour).removeClass('pressed')
      }, 100);
}

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3')
    audio.play();
}

function nextSequence(){
    userClickedPattern=[]
    level++
    $("h1").text('Level '+level)
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
    console.log(gamePattern)
   } 

function checkAnswer(currentLevel){
    
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function() {
            nextSequence()
          }, 1000);
       }
   }
   else{
    console.log("wrong")
    playSound("wrong")
    $('body').addClass('game-over')
    $('#level-title').text('Game Over, Press Any Key to Restart')
    setTimeout(function() {
        $('body').removeClass('game-over')
      }, 200);
    
    startOver()
   }
}   
function startOver(){
    level=0;
    started=false
    gamePattern=[]
}

