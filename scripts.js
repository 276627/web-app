function play(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  let result;

  if (playerChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = "You win!";
  } else {
    result = "Computer wins!";
  }

  document.getElementById('result').innerText = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;
}
document.addEventListener("DOMContentLoaded", function() {
  var count = 15;
  var timer = document.getElementById("timer");

  function startTimer() {
      count = 15;
      timer.textContent = count;

      var countdown = setInterval(function() {
          count--;
          timer.textContent = count;

          if (count <= 0) {
              clearInterval(countdown);
              timer.textContent = "Time's up!";
              setTimeout(startTimer, 2000); // Reset timer after 2 seconds
          }
      }, 1000);
  }

  startTimer();
});



document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset-btn');
    let currentPlayer = 'X';
    let gameOver = false;
  
    // Create the game board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => cellClick(cell));
            board.appendChild(cell);
        }
    }
  
    // Reset the game board
    function resetBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '#fff';
        });
        gameOver = false;
    }
  
    // Event listener for reset button
    resetButton.addEventListener('click', resetBoard);
  
    function cellClick(cell) {
        if (!cell.textContent && !gameOver) {
            cell.textContent = currentPlayer;
            checkWinner();
            if (!gameOver) {
                computerMove();
                checkWinner();
            }
        }
    }
  
    function computerMove() {
        const emptyCells = Array.from(document.querySelectorAll('.cell')).filter(cell => !cell.textContent);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerCell = emptyCells[randomIndex];
        computerCell.textContent = 'O';
    }
  
    function checkWinner() {
        const cells = Array.from(document.querySelectorAll('.cell'));
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
  
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                gameOver = true;
                highlightWinner(cells[a], cells[b], cells[c]);
                return;
            }
        }
  
        if (!cells.some(cell => !cell.textContent)) {
            gameOver = true;
            alert('It\'s a draw!');
        }
    }
  
    function highlightWinner(cell1, cell2, cell3) {
        cell1.style.backgroundColor = '#b4ffb4';
        cell2.style.backgroundColor = '#b4ffb4';
        cell3.style.backgroundColor = '#b4ffb4';
        alert(`${cell1.textContent} wins!`);
    }
  });
  
  // Define variables
  let currentPlayer = 'X';
  const board = ['', '', '', '', '', '', '', '', ''];
  const cells = document.querySelectorAll('#game-board div');
  const resetButton = document.getElementById('reset-btn');
  const saveButton = document.getElementById('save-btn');
  const loadButton = document.getElementById('load-btn');
  const highscoresDiv = document.getElementById('highscores');
  
  // Function to check for winning condition
  function checkWin() {
      const winningConditions = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
          [0, 4, 8], [2, 4, 6] // Diagonals
      ];
      return winningConditions.some(condition => {
          const [a, b, c] = condition;
          return board[a] && board[a] === board[b] && board[a] === board[c];
      });
  }
  
  // Function to handle cell click
  function cellClick(index) {
      if (!board[index]) {
          board[index] = currentPlayer;
          cells[index].textContent = currentPlayer;
          if (checkWin()) {
              alert(`${currentPlayer} wins!`);
              resetGame();
          } else if (!board.includes('')) {
              alert("It's a draw!");
              resetGame();
          } else {
              currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          }
      }
  }
  
  // Function to reset the game
  function resetGame() {
      board.fill('');
      cells.forEach(cell => cell.textContent = '');
      currentPlayer = 'X';
  }
  
  // Event listeners
  cells.forEach((cell, index) => cell.addEventListener('click', () => cellClick(index)));
  resetButton.addEventListener('click', resetGame);
  saveButton.addEventListener('click', saveHighscore);
  loadButton.addEventListener('click', loadHighscores);
  
  // Function to save highscore
  function saveHighscore() {
      const name = prompt("Enter your name:");
      if (name) {
          const score = currentPlayer === 'X' ? 'O wins' : 'X wins';
          const highscore = `${name}: ${score}`;
          localStorage.setItem('highscore', highscore);
          alert('Highscore saved!');
      }
  }
  
  // Function to load highscores
  function loadHighscores() {
      const highscore = localStorage.getItem('highscore');
      if (highscore) {
          highscoresDiv.textContent = `Highscore: ${highscore}`;
      } else {
          highscoresDiv.textContent = 'No highscores saved.';
      }
  }