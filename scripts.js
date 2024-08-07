const gameBoard = (function(){
    const board = ["", "", "", "", "", "", "", "", ""];

    function getBoard(){
        return board;
    }

    function placeMarker(index, marker){
        if (board[index] === ""){
            board[index] = marker;
        }
    }

    function resetBoard(){
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return{                 /*tukaj se hranijo vsi return elementi, saj jih je bolj praktično shranjevati skupaj */
            getBoard,
            placeMarker,
            resetBoard
    };

})();

function createPlayer(name,marker){
    return {name,marker};
}

const player1 = createPlayer("player1", "X");
const player2 = createPlayer("player2", "O");

const gameController = (function(){

    let currentPlayer = player1;

    function switchTurn(){
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function getCurrentPlayer(){
        return currentPlayer; /*---------------------enako je spodaj v returnu, tu pustim da vidim kaj funkcija naredi */
    }
    function checkWin(){
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],               /*three rows */
            [0, 3, 6], [1, 4, 7], [2, 5, 8],                /*three columns */
            [0, 4, 8], [2, 4, 6]                   /*two diagonals */
        ];


        const board = gameBoard.getBoard();
        console.log(board);
        for (const pattern of winPatterns) {
            console.log("test")
            const[a,b,c] = pattern;
            if ((board[a] === "X" || board[a] === "O" ) && board[a] === board[b] && board[a] === board[c]){
                console.log("its a win");
                return getCurrentPlayer();
                
            }
            console.log(board[0]);     
            }
            return null;
        }
        
        return{
            switchTurn,
            getCurrentPlayer,
            checkWin
        }
    }
)();
