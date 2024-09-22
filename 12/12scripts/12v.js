
    let score = JSON.parse(localStorage.getItem('score')) ||  {
      wins: 0,
      losses: 0,
      ties: 0
    }

  updateScoreElement();

  /*
if(!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}
*/

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//};

document.querySelector('.js-auto-play-button')
 .addEventListener('click', () => {
    autoPlay();
 });

function autoPlay() {
  if(!isAutoPlaying) {
    intervalId =  setInterval( () => {
        const playerMove = pickCOmputerMove();
        playGame(playerMove);
      }, 1000);

    isAutoPlaying = true;

    // When the game is auto playing, change
    // the text in the button to 'Stop Playing'.
    document.querySelector('.js-auto-play-button')
     .innerHTML = 'Stop Playing'

  } else {
      clearInterval(intervalId);
      isAutoPlaying = false;

    // When the game is not playing, change
    // the text back to 'Auto Play'.
    document.querySelector('.js-auto-play-button')
     .innerHTML = 'Auto Play'
  }

  
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
   if (event.key === 'r') {
    playGame('rock');
   } else if (event.key === 'p') {
    playGame('paper');
   } else if (event.key === 's') {
    playGame('scissors');

   // Add an if-statement condition to
   // check if 'a' was pressed.
   } else if (event.key === 'a') {
    autoPlay();
   }
});


function playGame(playerMove) {
  const computerMove = pickCOmputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.'
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.'
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  }

  else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.'
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if(result === 'You win.') {
    score.wins+=1;
  } else if (result === 'You lose.') {
    score.losses+=1;
  } else if (result === 'Tie.') {
    score.ties+=1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = ` You
  <img src="12images/${playerMove}-emoji.png"
  class="move-icon"
  >
  <img src="12images/${computerMove}-emoji.png"
  class="move-icon"
  >
  Computer`;

}

// Create a new resetScore function so
// we can reuse this code.
// See 12r.js for the full code.
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

// Add an event listener for the reset score
// button using .addEventListener
document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    resetScore();
  });


function updateScoreElement () {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickCOmputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}