(function()
{
    "use strict";

    angular
        .module("connect4")
        .factory("boardFactory", [
            function boardFactory ()
            {
                var self = this, nCols, nRows, nToWin;

                self.initialize = function (cols, rows, nWin)
                {
                    nCols = cols, nRows = rows, nToWin = nWin;
                    var array  = [];

                    for (var i = 0; i < nCols; i += 1)
                    {
                        array.push(Array(nRows).fill(0));
                    }

                    return array;
                }

                self.checkHorizontal = function (board, player, currentCol, currentRow)
                {
                    var counter = 0, result  = false;

                    for (var i = 0; i < nCols; i += 1)
                    {
                        if (board[i][currentRow] === player)
                        {
                            counter += 1;
                        }
                        else
                        {
                            counter = 0;
                        }

                        if (counter === nToWin)
                        {
                            result = true;
                            break;
                        }
                    }

                    return result;
                }

                self.checkVertical = function (board, player, currentCol, currentRow)
                {
                    var counter = 0, result  = false;

                    for (var i = 0; i < nCols; i += 1)
                    {
                        if (board[currentCol][i] === player)
                        {
                            counter += 1;
                        }
                        else
                        {
                            counter = 0;
                        }

                        if (counter === nToWin)
                        {
                            result = true;
                            break;
                        }
                    }

                    return result;
                }

                self.checkDiagonal = function (board, player, currentCol, currentRow, gradient)
                {
                    var startPos = findDiagonalStart(currentCol, currentRow, gradient),
                        startCol = startPos[0],
                        startRow = startPos[1],
                        i = 0, counter = 0, result = false;

                    while ((startCol + i) < nCols && startRow + (i * gradient) < nRows)
                    {
                        var cellValue = board[startCol + i][startRow + (i * gradient)];

                        if (board[startCol + i][startRow + (i * gradient)] === player)
                        {
                            counter += 1;
                        }
                        else
                        {
                            counter = 0;
                        }

                        if (counter === nToWin)
                        {
                            result = true;
                            break;
                        }

                        i += 1;
                    }

                    return result;
                }


                // knowing that the 'gradient' of the diagonal must be 1 or -1,
                // we can use 'straight line' equation, y = mx - b, to determine
                // start element of current diagonal...

                var findDiagonalStart = function(currentCol, currentRow, gradient)
                {
                    var yIntercept = currentRow - (gradient * currentCol),
                        startCol, startRow;

                    if (yIntercept < 0)
                    {
                        startRow = 0;
                        startCol = 0 - yIntercept;
                    }
                    else if (yIntercept > nRows)
                    {
                        startRow = nRows;
                        startCol = yIntercept - nRows;
                    }
                    else
                    {
                        startRow = yIntercept;
                        startCol = 0;
                    }

                    return [startCol, startRow]
                }

                return self;
            }
        ])
})();
