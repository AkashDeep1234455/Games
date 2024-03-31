let body = document.querySelector("body");
let openPage = document.querySelector(".startGame"); 
let playButton = document.querySelector("#playButton");
let backDiv = document.querySelector("#backDiv");
let greenButton = document.querySelector(".green");
let redButton = document.querySelector(".red")
let yellowButton = document.querySelector(".yellow")
let blueButton = document.querySelector(".blue")
let gameStartButton = document.querySelector(".start");
let gameMenu = document.querySelector("#gameMenu");
let gameEquipment = document.querySelector(".gameEquipment");
let allcolorbutton = document.querySelectorAll(".button button");
let audio = document.querySelector(".button audio");
let wrong = document.querySelector(".wrong");
let scoreCard = document.querySelector(".scorecard");
let scoreValue = document.querySelector(".scorecard .score");
let levelValue = document.querySelector(".scorecard .level");
let highValue = document.querySelector(".scorecard .highscore");
let quit =document.querySelector("#quit");




/////Starting page JavaScript
function typeWriter(){
    if(index<text.length){
        let paragraph = document.querySelector(".instructionText p");
        paragraph.innerHTML+=text.charAt(index);
        index++;
        setTimeout(typeWriter,speed);
    }
}
function gameMenuAppear(){
    gameMenu.style.opacity = "1";
}
function playButtonAppear(){
    playButton.style.opacity = "1";
}
window.onload = function(){
   
    setTimeout(playButtonAppear,800);
};

///play button click event listener

function playButtonClickEvents(){
    openPage.classList.add("delay");
    openPage.style.opacity = "0";
    gameMenu.style.opacity = "1";
    openPage.style.display = "none";
    gameMenu.style.display = "flex";
    
    gameMenu.classList.add("delay");
    let backButton = document.createElement("button");
    backDiv.append(backButton); 
    backButton.innerText = "BACK";
    backButton.classList.add("back");
    gameMenu.classList.add("delay");
    gameMenuAppear();
    gameEquipment.classList.add("delay");
   

}

playButton.addEventListener("click",playButtonClickEvents);

///Backbutton even listening
function backButtonActivity(event){
    if(event.target.nodeName=="BUTTON"){
        openPage.style.display = "flex";
        openPage.style.opacity = "1";
        gameMenu.style.display = "none";
        gameMenu.style.opacity = "0";
        let backButton = document.querySelector("#backDiv button");
        backButton.remove(); 
        

    }
};
backDiv.addEventListener("click",backButtonActivity);




///////game behaviour
let gameStart = false;
function gameStartFunction(){
    quit.style.display = "block";
    gameStartButton.style.display = "none";
    scoreCard.style.display = "flex";
    scoreValue.innerText="0";
    levelValue.innerText="1";
    if(gameStart==false){
        gameStart = true;
        gameFunction();
    }
};
gameStartButton.addEventListener("click",gameStartFunction);



///quit game





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function gamegeneration(level){
    if(gameStart==true){
    let numberOfSignal = Math.floor(Math.random()*level)+1;
    let availableOption= ["red","green","blue","yellow"];
    let userChoosedColor = [];
    while(numberOfSignal!=0){
        let buttonToTrigger = Math.floor(Math.random()*availableOption.length);
        let colorButton = availableOption[buttonToTrigger];
        if(colorButton==="red"){
            redButton.style.opacity = "1";
            audio.play();
            await sleep(200);
            audio.pause();
            audio.currentTime = 0;
            redButton.style.opacity = "0.5";
            userChoosedColor.push("red");
        }else if(colorButton==="green"){
            greenButton.style.opacity = "1";
           
           
            audio.play();
            await sleep(200);
            audio.pause();
            audio.currentTime = 0;
            greenButton.style.opacity = "0.5";
            userChoosedColor.push("green");
        }else if(colorButton==="blue"){
            blueButton.style.opacity = "1";
            audio.play();
            await sleep(200);
            audio.pause();
            audio.currentTime = 0;
            blueButton.style.opacity = "0.5";
          
            userChoosedColor.push("blue");
        }else if(colorButton==="yellow"){
            yellowButton.style.opacity = "1";
            audio.play();
            await sleep(200);
            audio.pause();
            audio.currentTime = 0;
            yellowButton.style.opacity = "0.5";
            userChoosedColor.push("yellow");
        }
        await sleep(500);
        numberOfSignal--;
    }
    console.log(userChoosedColor);
    return userChoosedColor;
}
};
let highscore = 0;
let userscore = 0;
////game function
async function gameFunction(){

    if(gameStart==true){
    let level = 1;
    
    let computerGeneratedSignals = await gamegeneration(level);
    


    redButton.addEventListener("click",handleButtonClick);
    greenButton.addEventListener("click",handleButtonClick);
    yellowButton.addEventListener("click",handleButtonClick);
    blueButton.addEventListener("click",handleButtonClick);
    quit.addEventListener("click",gameQuitFunction);
    backDiv.addEventListener("click",gameQuitFunction);


    function gameQuitFunction(){
        gameStart = false;
        quit.style.display = "none";
        gameStartButton.style.display = "block";
        scoreCard.style.display = "none";
        level =1;
        score=0;
        scoreValue.innerText="0";
        levelValue.innerText="1";
        computerGeneratedSignals = [];
        redButton.removeEventListener("click", handleButtonClick);
        greenButton.removeEventListener("click", handleButtonClick);
        yellowButton.removeEventListener("click", handleButtonClick);
        blueButton.removeEventListener("click", handleButtonClick);
    };
   
    async function handleButtonClick(event){
        console.log("click");
        this.style.opacity = "1";
        audio.play();
        await sleep(400);
        // Set opacity back to normal after a short delay
        this.style.opacity = "0.5";
        audio.pause();
       
        let color = event.target.className;
       
        console.dir(color);
    
        if(color==computerGeneratedSignals[0]){
            computerGeneratedSignals.shift();
            if(computerGeneratedSignals.length==0){
                ++level;
                ++userscore;
                levelValue.innerText=`${level}`;
                scoreValue.innerText=`${userscore}`;
                if(userscore>highscore){
                    highValue.innerText = `${userscore}`;
                    highscore=userscore;
                }
                await sleep(800);
                gamegeneration(level).then(signals => {
                    computerGeneratedSignals = signals;
                });
            }
        }else{
            level = 1;
            userscore = 0;
            scoreValue.innerText=`${userscore}`;
            levelValue.innerText=`${level}`;
            wrong.style.display = "flex";
            await sleep(1500);
            wrong.style.display = "none";
            gamegeneration(level).then(signals => {
                computerGeneratedSignals = signals;
            });
        }
    };  
   }
};


















