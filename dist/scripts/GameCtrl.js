(function()
{
    "use strict";

    angular
        .module("connect4")
        .controller("GameCtrl", ["$scope", "boardFactory",
            function GameCtrl ($scope, boardFactory)
            {
                self = this;

                var player = 1;
                    // board = {};

                // var bitboard = new Uint8Array(new ArrayBuffer(5 * Math.floor(5/5)));
                // var ROW_MASK = 1 << (5-1);
                // console.log(bitboard);
                //
                // var printBoard = function (board)
                // {
                //     console.log();
                //     console.log("bit-board looks like this:");
                //     console.log();
                //
                //     var strBoard = "";
                //     for (var row = 0; row < 5; ++row)
                //     {
                //         for (var col = 0; col < 5; ++col)
                //         {
                //             strBoard += (board[row]&(ROW_MASK>>>col))? "1" : "0";
                //         }
                //         strBoard += "\n";
                //     }
                //
                //     console.log(strBoard);
                // };
                //
                // printBoard(bitboard);

                var board = boardFactory.initBitBoard(5, 5);
                console.log(board.setPosition(1, 4, 1));
                console.log(board.setPosition(1, 4, 2));
                console.log(board.setPosition(1, 4, 3));
                console.log(board.setPosition(1, 4, 4));

                console.log(board.printBoard());

                console.log(board.getPosition(1))

                var hasWon = function (board)
                {
                    var y;

                    y = board & (board >> 5);
                    if (y & (y >> 2 * 5))
                    { // check \ diagonal
                        return true;
                    }

                    y = board & (board >> 6);
                    if (y & (y >> 2 * 6))
                    { // check horizontal -
                        return true;
                    }

                    y = board & (board >> 7);
                    if (y & (y >> 2 * 7))
                    { // check / diagonal
                        return true;
                    }

                    y = board & (board >> 1);
                    if (y & (y >> 2))
                    { // check vertical |
                        return true;
                    }
                    return false;
                }

                console.log(hasWon(board));

                var changePlayer = function()
                {
                    player = (player === 1) ? 2 : 1
                }

                self.select = function(col, row)
                {
                    if (board[col] === undefined)
                    {
                        board[col] = [player];
                        changePlayer();
                    }
                    else if (board[col].length < 5)
                    {
                        board[col].push(player);
                        changePlayer();
                    }
                    console.log(board);
                }
            }
        ]);
})();
