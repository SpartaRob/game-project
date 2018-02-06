$(document).ready(function() {

  // alert('Welcome to Connect 4.')

  // var board = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0], [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];

  var boxes = $("button");
  var currentPlayer = 'Player 1';
  var counter = 1;

  console.log(boxes);

  $('#reset').on('click', resetBoard)
  $('.board button').on('click', addPiece)

  function addPiece(event){
    if ($(this).hasClass('default')) {
      if (currentPlayer === 'Player 1') {
        currentPlayer = 'Player 2';
        $('#player-turn').text("Current player is: " + currentPlayer);
        $(this).addClass('player1Selected');
        $(this).removeClass('default');
        counter++;
      } else {
        currentPlayer = 'Player 1';
        $('#player-turn').text("Current player is: " + currentPlayer);
        $(this).addClass('player2Selected');
        $(this).removeClass('default');
        counter++;
      }
    } else {
      alert('cell already selected please chose another');
    }
    if (counter >= 43) {
      $('#player-turn').text("The game is a draw")
      var run = prompt("This game is a draw, would you like to play again? \n 1. (y)es \n 2. (n)o")

      if (run !== 'n' && run !== 'y'){
        while (run !== 'n' && run !== 'y') {
          alert("Invalid input, please input y for yes or n for no");

          run = prompt("Would you like to play again? \n 1. (y)es \n 2. (n)o");
        }
      } else if (run === 'y') {
        resetBoard();
      } else {
        alert("Thank you playing");
      }
    }
  }

  function resetBoard(){
    $('#player-turn').text("Current player is: Player 1");
    counter = 1;
    $('.board button').addClass('default');
    $('.board button').removeClass('player1Selected');
    $('.board button').removeClass('player2Selected');
  }



});
