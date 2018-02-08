$(document).ready(function() {

  var board = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  var currentPlayer = 'Player 1';
  var counter = 0;

  $('#reset').click(resetBoard)
  $('#show-rules').click(rulesShow)
  $('#rules-close').click(rulesClose)
  $('#error-close').click(errorClose)
  $('.board button').click(boardClick)


  //Add a piece to the board, removes default class styling, adds new styling depending active player, checks for a draw
  function boardClick(event) {
    var ypos = $('.board tr').index($(this).closest('tr'));
    var xpos = $(this).closest('tr').find('td').index($(this).closest('td'));

    ypos = dropToBottom(xpos, ypos);
    addPiece(xpos, ypos);
    checkForWin();
    checkForDraw();
  }

  function addPiece(xpos, ypos){
    if (board[xpos][ypos] === 0) {
      if (currentPlayer === 'Player 1') {
        currentPlayer = 'Player 2';
        $('#player-turn').text("Current player is: " + currentPlayer);
        board[xpos][ypos] = 1;
        var cell = $("tr:eq(" + ypos + ")").find('td').eq(xpos);
        cell.children('button').addClass('player1Selected');
        cell.children('button').removeClass('default');
        counter++;
      } else {
        currentPlayer = 'Player 1';
        $('#player-turn').text("Current player is: " + currentPlayer);
        board[xpos][ypos] = 1;
        var cell = $("tr:eq(" + ypos + ")").find('td').eq(xpos);
        cell.children('button').addClass('player2Selected');
        cell.children('button').removeClass('default');
        counter++;
      }
    } else {
      $('#errorModal').show();
    }
  }

  function dropToBottom(x, y) {
    for (var i = 5; i >= 0; i--) {
        if (board[x][i] === 0) {
            return i;
        }
    }
    return y;
}

  function checkForWin() {

  }

  //Counter adds total pieces which have been placed and if the board is full without a winner will end the game
  function checkForDraw() {
    if (counter >= 42) {
      $('#player-turn').text("The game is a draw")
      $('#play-again').show("slow");
    }
  }


  //Resets the board, clears all styling, resets the turn counter and status message
  function resetBoard() {
    $('#player-turn').text("Current player is: Player 1");
    counter = 1;
    $('.board button').addClass('default');
    $('.board button').removeClass('player1Selected');
    $('.board button').removeClass('player2Selected');
    $('#play-again').hide();
    board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
  }

  function rulesShow() {
    $('#rulesModal').show();
  }

  function rulesClose() {
    $('#rulesModal').hide();
  }

  function errorClose() {
    $('#errorModal').hide();
  }

});
