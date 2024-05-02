function play(playerChoice) {
    var choices = ["rock", "paper", "scissors"];
    var computerChoice = choices[Math.floor(Math.random() * 3)];
  
    var result = "";
  
    if (playerChoice === computerChoice) {
      result = "It's a tie!";
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      result = "You win!";
    } else {
      result = "You lose!";
    }
  
    document.getElementById("result").innerText = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
  }
 