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
  $('#play-again').click(resetBoard)
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
        board[xpos][ypos] = 2;
        var cell = $("tr:eq(" + ypos + ")").find('td').eq(xpos);
        cell.children('button').addClass('player2Selected');
        cell.children('button').removeClass('default');
        counter++;
      }
    } else {
      $('#errorModal').show();
    }
  }

  //Looks at the currently selected column starting from the bottom cycing up until an empty cell is located returning its index
  function dropToBottom(x, y) {
    for (var i = 5; i >= 0; i--) {
        if (board[x][i] === 0) {
            return i;
        }
    }
    return y;
  }

  function checkForWin() {
    horizontalWin();
    verticalWin();
    diagonalWin();
  }

  //Changes the output display to show a player 1 win
  function player1Win(){
    $('#player-turn').text("Player 1 Wins")
    $('#play-again').show("slow");
    $('.board button').unbind();
  }

  //Changes the output display to show a player 1 win
  function player2Win(){
    $('#player-turn').text("Player 2 Wins")
    $('#play-again').show("slow");
    $('.board button').unbind();
  }

  function horizontalWin() {
    var currentValue = null,
    previousValue = 0,
    count = 0;

    for (var y = 0; y <= 5; y++) {
      for (var x = 0; x <= 6; x++) {
        currentValue = board[x][y];
        if (currentValue === previousValue && currentValue !== 0) {
          count += 1;
        } else {
          count = 0;
        }
        if (count === 3) {
          if (currentValue === 1) {
            player1Win();
          } else {
            player2Win();
          }
        }
        previousValue = currentValue;
      }
      count = 0;
      previousValue = 0;
    }
  }

  function verticalWin(){
    var currentValue = null;
    var previousValue = 0;
    var count = 0;

    for (var x = 0; x <= 6; x++) {
      for (var y = 0; y <= 5; y++) {
        currentValue = board[x][y];
        if (currentValue === previousValue && currentValue !== 0) {
          count += 1;
        } else {
          count = 0;
        }
        if (count === 3) {
          if (currentValue === 1) {
            player1Win();
          } else {
            player2Win();
          }
        }
        previousValue = currentValue;
      }
      count = 0;
      previousValue = 0;
    }
  }

  function diagonalWin(){

  }

  //Counter adds total pieces which have been placed and if the board is full without a winner will end the game
  function checkForDraw() {
    if (counter >= 42) {
      $('#player-turn').text("The game is a draw")
      $('#play-again').show("slow");
      $('.board button').unbind();
    }
  }


  //Resets the board, clears all styling, resets the turn counter and status message
  function resetBoard() {
    $('#player-turn').text("Current player is: Player 1");
    counter = 0;
    $('.board button').addClass('default');
    $('.board button').removeClass('player1Selected');
    $('.board button').removeClass('player2Selected');
    $('#play-again').hide();
    $('.board button').unbind();
    $('.board button').click(boardClick);
    currentPlayer = 'Player 1';
    board = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
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
