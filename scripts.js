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
        return currentPlayer;
    }
    function checkWin(){
        const /**----------------------------------------------------tukaj naredi checkwin---tukaj si ostal */
    }
})();
