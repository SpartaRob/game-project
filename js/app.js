$(document).ready(function() {

  var board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];

  var currentPlayer = 'Player 1';
  var counter = 0;

  $('#reset').click(resetBoard)
  $('#show-rules').click(rulesShow)
  $('#rules-close').click(rulesClose)
  $('#error-close').click(errorClose)
  $('#game-close').click(gameClose)
  $('.board button').click(addPiece)


  //Add a piece to the board, removes default class styling, adds new styling depending active player, checks for a draw
  function addPiece(event) {
    var y_pos = $('.board tr').index($(this).closest('tr'));
    var x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));

    console.log(y_pos, x_pos);

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
      $('#errorModal').show();
    }
    checkForWin();
    checkForDraw();
  }

  function checkForWin() {

  }

  //Counter adds total pieces which have been placed and if the board is full without a winner will end the game
  function checkForDraw() {
    if (counter >= 5) {
      $('#player-turn').text("The game is a draw")
      var run = prompt("This game is a draw, would you like to play again? \n 1. (y)es \n 2. (n)o")


      //Input Validation for prompt box
      if (run !== 'n' && run !== 'y') {
        while (run !== 'n' && run !== 'y') {
          alert("Invalid input, please input y for yes or n for no");

          run = prompt("Would you like to play again? \n 1. (y)es \n 2. (n)o");
        }
      } else if (run === 'y') {
        resetBoard();
      } else {
        $('#endGameModal').show();
      }
    }
  }


  //Resets the board, clears all styling, resets the turn counter and status message
  function resetBoard() {
    $('#player-turn').text("Current player is: Player 1");
    counter = 1;
    $('.board button').addClass('default');
    $('.board button').removeClass('player1Selected');
    $('.board button').removeClass('player2Selected');
  }

  function rulesShow(){
    $('#rulesModal').show();
  }

  function rulesClose(){
    $('#rulesModal').hide();
  }

  function errorClose(){
    $('#errorModal').hide();
  }

  function gameClose(){
    $('#endGameModal').hide();
  }
});
