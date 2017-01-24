(function()
{
    "use strict";

    angular
        .module("connect4")
        .controller("GameCtrl", ["$scope", "boardFactory",
            function GameCtrl ($scope, boardFactory)
            {
                self = this;
                $scope.winner, $scope.nWinsPlayer1 = 0, $scope.nWinsPlayer2 = 0;

                var nToWin, nCols, nRows, player, nMoves;

                (self.newGame = function()
                {
                    nToWin = 4, nCols = 7, nRows = 6, player = 1, nMoves = 0;
                    $scope.winner = null;
                    self.board = boardFactory.initialize(nCols, nRows, nToWin)
                })();


                self.dropToken = function(col)
                {
                    var emptyRow = self.board[col].lastIndexOf(0);

                	if (emptyRow >= 0 && !$scope.winner)
                	{
                		self.board[col][emptyRow] = player;
                		nMoves += 1;
                	};

                	if (nMoves > 6)
                	{
                		if (checkForWin(self.board, player, col, emptyRow))
                        {
                            $scope.winner = player;
                            (player === 1) ? $scope.nWinsPlayer1++ : $scope.nWinsPlayer2++
                        };
                	};

                	changePlayer();
                };


                self.setDiscColor = function(value)
                {
                    var style = { "backgroundColor" : "white" };

                    if (value === 1)
                    {
                        style = { "backgroundColor" : "red" };
                    }
                    else if (value === 2)
                    {
                        style = { "backgroundColor" : "yellow" };
                    }

                    return style;
                };


                var checkForWin = function (board, player, currentCol, currentRow)
                {
                    var result = false;

                    result = boardFactory.checkHorizontal (board, player, currentCol, currentRow)  ||
                             boardFactory.checkVertical (board, player, currentCol, currentRow)    ||
                             boardFactory.checkDiagonal (board, player, currentCol, currentRow,  1)||
                             boardFactory.checkDiagonal (board, player, currentCol, currentRow, -1);

                    return result;
                };

                var changePlayer = function()
                {
                    player = (player === 1) ? 2 : 1;
                };
            }
        ]);
})();
