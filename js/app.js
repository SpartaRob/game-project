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
  var player1Score = 0;
  var player2Score = 0;
  var counter = 0;

  var player1Name = prompt("Please enter Player 1's Name", 'Player 1');
  var player2Name = prompt("Please enter Player 2's Name", 'Player 2');
  $('#player1-score').text(player1Name + " Score: " + player1Score);
  $('#player2-score').text(player2Name + " Score: " + player2Score);
  $('#player-turn').text("Current player is: " + player1Name);

  $('#reset').click(resetBoard)
  $('#reset').click(resetScore)
  $('#play-again').click(resetBoard)
  $('#show-rules').click(rulesShow)
  $('#rules-close').click(rulesClose)
  $('#error-close').click(errorClose)
  $('.board button').click(boardClick)



  // function setPlayer1Name(){
  // $('#player1-score').text(player1Name + "s Score: " + player1Score);
  // $('#player-turn').text("Current player is: " + player1Name);
  // }

  // function setPlayer2Name(){
  //   $('#player2-score').text(player2Name + "s Score: " + player2Score);
  // }

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
        $('#player-turn').text("Current player is: " + player2Name);
        board[xpos][ypos] = 1;
        var cell = $("tr:eq(" + ypos + ")").find('td').eq(xpos);
        cell.children('button').addClass('player1Selected');
        cell.children('button').removeClass('default');
        counter++;
      } else {
        currentPlayer = 'Player 1';
        $('#player-turn').text("Current player is: " + player1Name);
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

  //Runs all victory condition functions
  function checkForWin() {
    horizontalWin();
    verticalWin();
    forwardDiagonalWin();
    backwardDiagonalWin();
  }

  //Changes the output display to show a player 1 win
  function player1Win(){
    $('#player-turn').text(player1Name + " Wins");
    $('#play-again').show("slow");
    $('.board button').unbind();
    player1Score++;
    $('#player1-score').text(player1Name + " Score: " + player1Score);
  }

  //Changes the output display to show a player 1 win
  function player2Win(){
    $('#player-turn').text(player2Name + " Wins");
    $('#play-again').show("slow");
    $('.board button').unbind();
    player2Score++;
    $('#player2-score').text(player2Name + " Score: " + player2Score);
  }

  //Cycles through all of the rows adding up all adjacent identical cells within the row and declaring a winner if there are 4 next to each other
  function horizontalWin() {
    var currentValue = null;
    var previousValue = 0;
    var count = 0;

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

    //Cycles through all of the columns adding up all adjacent identical cells within the column and declaring a winner if there are 4 next to each other
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

  function backwardDiagonalWin(){
    var currentValue = null;
    var previousValue = 0;
    var count = 0;

    var xcurrent = 0;
    var ycurrent = 0;

    for (var x = 6; x >= 0; x--) {
      for (var y = 5; y >= 0; y--) {
        xcurrent = x;
        ycurrent = y;
        while (xcurrent >= 0 && ycurrent >= 0) {
          currentValue = board[xcurrent][ycurrent];
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
          xcurrent--;
          ycurrent--;
        }
        count = 0;
        previousValue = 0;
      }
    }
  }

  function forwardDiagonalWin(){
    var currentValue = null;
    var previousValue = 0;
    var count = 0;

    var xcurrent = 0;
    var ycurrent = 0;

    for (var x = 0; x <= 6; x++) {
      for (var y = 5; y >= 0; y--) {
        xcurrent = x;
        ycurrent = y;
        while (xcurrent <= 6 && ycurrent >= 0) {
          currentValue = board[xcurrent][ycurrent];
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
          xcurrent++;
          ycurrent--;
        }
        count = 0;
        previousValue = 0;
      }
    }
  }

  //Counter adds total pieces which have been placed and if the board is full without a winner will end the game
  function checkForDraw() {
    if (counter >= 42) {
      $('#player-turn').text("The game is a draw")
      $('#play-again').show("slow");
      $('.board button').unbind();
    }
  }

  //Prompt who will play 1st when starting a new game

 function playFirst(){
  var firstPlayer = prompt("Would you like " + player1Name + " or " + player2Name + " to play first?");

  if (firstPlayer == player1Name) {
    $('#player-turn').text("Current player is: " + player1Name);
    currentPlayer = 'Player 1';
  } else if (firstPlayer == player2Name) {
    $('#player-turn').text("Current player is: " + player2Name);
    currentPlayer = 'Player 2';
  }
 }


  //Resets the board, clears all styling, resets the turn counter and status message
  function resetBoard() {
    //$('#player-turn').text("Current player is: " + player1Name);
    playFirst()
    counter = 0;
    $('.board button').addClass('default');
    $('.board button').removeClass('player1Selected');
    $('.board button').removeClass('player2Selected');
    $('#play-again').hide();
    $('.board button').unbind();
    $('.board button').click(boardClick);
    //currentPlayer = 'Player 1';
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

  function resetScore(){
    player1Score = 0;
    player2Score = 0;
    $('#player1-score').text(player1Name + " Score: " + player1Score);
    $('#player2-score').text(player2Name + " Score: " + player2Score);
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
