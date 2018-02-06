$(document).ready(function() {

  // alert('Welcome to Connect 4.')

  var board = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0], [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];

  var boxes = $("button");
  var currentPlayer = 'Player 1';
  var counter = 1;

  console.log(boxes);


  $('.board button').on('click', function() {
    if ($(this).hasClass('default')) {
      if (currentPlayer === 'Player 1') {
        $('#player-turn').text("  " + currentPlayer);
        $(this).addClass('player1Selected');
        $(this).removeClass('default');
        counter++;
        currentPlayer = 'Player 2';
      } else {
        $('#player-turn').text("  " + currentPlayer);
        $(this).addClass('player2Selected');
        $(this).removeClass('default');
        counter++;
        currentPlayer = 'Player 1';
      }
    } else {
      alert('cell already selected please chose another');
    }
  });





  });
