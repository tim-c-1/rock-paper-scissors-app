
function getComputerChoice(){
    let choice = Math.random()
    if (choice >= 0.66){
        return "scissors"
    } else if (choice < 0.66 && choice >= 0.33){
        return "rock"
    } else {
        return "paper"
    }
}

// legacy function from console version
function getHumanChoice(){
    let choice = prompt("Rock/Paper/Scissors?").toLowerCase()
    if (choice == ""){
        choice = "rock" //default choice to rock
    }
    if (choice == "scissors" || choice == "rock" || choice == "paper"){
        return choice
    } else {
        console.log("Not a valid choice. Choose again.")
    }
}


function playRound(humanChoice, computerChoice){
    
    if (humanChoice === computerChoice) {
        console.log("tied!");
        resultsDiv.textContent = "Tied!";
    } else if (humanChoice == "rock" && computerChoice == "paper"){
        computerScore++
        console.log("you lose!");
        resultsDiv.textContent = "You lose!";
    } else if (humanChoice == "rock" && computerChoice == "scissors"){
        humanScore++
        console.log("you win!");
        resultsDiv.textContent = "You win!";
    } else if (humanChoice == "scissors" && computerChoice == "paper"){
        humanScore++
        console.log("you win!");
        resultsDiv.textContent = "You win!";
    } else if (humanChoice == "scissors" && computerChoice == "rock"){
        computerScore++
        console.log("you lose!");
        resultsDiv.textContent = "You lose!";
    } else if (humanChoice == "paper" && computerChoice == "rock"){
        humanScore++
        console.log("you win!");
        resultsDiv.textContent = "You win!";
    } else if (humanChoice == "paper" && computerChoice == "scissors"){
        computerScore++
        console.log("you lose!");
        resultsDiv.textContent = "You lose!";
    }
}


function playGame(humanChoice, rounds=1){
   for (let i = 0; i < rounds; i++){
        // let humanChoice = getHumanChoice();
        let computerChoice = getComputerChoice();
        playRound(humanChoice,computerChoice);
        console.log("your score is: \nyou: " + humanScore +"\ncomputer: " + computerScore);
   }

}

function updateScoreboard(){
    humanScoreboard.textContent = `you: ${humanScore}`;
    computerScoreboard.textContent = `computer: ${computerScore}`;
}

function addResetButton(){
    resetContainer.appendChild(resetButton);
    resetButton.style = `width: 120px; font-size: 22px;`;
    resetButton.textContent = "reset game";
    resetButton.addEventListener("click", () => {
        resultsDiv.textContent = '';
        humanScore = 0;
        computerScore = 0;
        updateScoreboard();
        resetButton.remove();
    })
}

function gameOver(){
    let winner = Math.max(humanScore, computerScore)
    if (winner == humanScore){
        winner = "you";
        playerTotalScore++;
    }else{
        winner = "computer";
        computerTotalScore++;
    }

    totalHumanScore.textContent = playerTotalScore;
    totalComputerScore.textContent = computerTotalScore;
    resultsDiv.textContent = `round over. ${winner} won.`;
    addResetButton();
}

function checkGameOver(){
    if (humanScore == 5 || computerScore == 5){
        gameOver();
    }
}


let humanScore = 0;
let computerScore = 0;
let playerTotalScore = 0;
let computerTotalScore = 0;


const rockButton = document.querySelector("#rock");
const paperButton  = document.querySelector("#paper");
const scissorButton = document.querySelector("#scissors");
const humanScoreboard = document.querySelector(".humanScore");
const computerScoreboard = document.querySelector(".computerScore")
const resetButton = document.createElement("button");
const resultsDiv = document.querySelector(".results");

const totalHumanScore = document.querySelector("#humanTotalScore");
const totalComputerScore = document.querySelector("#computerTotalScore");
const resetContainer = document.querySelector("#resetbutton");
const remote = require('electron').remote;

rockButton.addEventListener("click", () => {
    // check that game is not at completion before continuing
    if (humanScore < 5 && computerScore < 5){
        let humanChoice = "rock";
        playGame(humanChoice);
        updateScoreboard();
        checkGameOver();    
    }
    
});

paperButton.addEventListener("click", () => {
    // check that game is not at completion before continuing
    if (humanScore < 5 && computerScore < 5){
        let humanChoice = "paper";
        playGame(humanChoice);
        updateScoreboard();
        checkGameOver();
    }
});

scissorButton.addEventListener("click", () => {
    // check that game is not at completion before continuing
    if (humanScore < 5 && computerScore < 5){
        let humanChoice = "scissors";
        playGame(humanChoice);
        updateScoreboard();
        checkGameOver();
    }
});

// allows for closing of window from button press
const ipc = require('electron').ipcRenderer

function closeApp(e){
    e.preventDefault();
    ipc.send('close');
}

document.querySelector("#exit").addEventListener("click", closeApp);