let player1 = {};
let player2 = {};
let currentPlayer; 
const startGameBtn = document.getElementById("startGame");


startGameBtn.addEventListener("click", function(){
    const dialog = document.getElementById("startDialog");
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    dialog.close();
    player1 = createPlayer(player1Name, "X", 0);
    player2 = createPlayer(player2Name, "O", 0);
    currentPlayer = player1;
    fromArrayToDOM.updateCurrentPlayer();
    fromArrayToDOM.updatePlayerNameDOM();


})








const gameDOM = document.querySelector(".game");
const gameBoard = (function(){
    const board = ["", "", "", "", "", "", "", "", ""];

    function getBoard(){
        return board;
    }

    function placeMarker(index){
        if (board[index] === ""){
            board[index] = currentPlayer.marker;
            return true;
            console.log(currentPlayer +  " " + currentPlayer.marker);
        }
        else{
            return false;
        }
    }

    function resetBoard(){
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        fromArrayToDOM.reset();
    }

    return{                 /*tukaj se hranijo vsi return elementi, saj jih je bolj praktično shranjevati skupaj */
            getBoard,
            placeMarker,
            resetBoard
    };

})();

function createPlayer(name,marker,score){
    return {name,marker,score};
}











const gameController = (function(){


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
            const[a,b,c] = pattern;
            if ((board[a] === "X" || board[a] === "O" ) && board[a] === board[b] && board[a] === board[c]){
                
                return gameController.getCurrentPlayer();

                
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







const fromArrayToDOM = (function(){
    array = gameBoard.getBoard();
    
 function update(){
    for (let i = 0; i < array.length; i++) {
        const childElement = gameDOM.querySelector(".marker" + i);
        const imgElement = childElement.querySelector("img");
        const newMarker = document.createElement("img");


        if(!imgElement){
            if(array[i] === "O"){
            newMarker.src = "photos/O-marker.png";
            childElement.appendChild(newMarker);
        }
        else if(array[i] === "X"){
            newMarker.src = "photos/X-marker.png";
            childElement.appendChild(newMarker);
        }
        }
        
        
    }
 }
    function reset(){
        for (let i = 0; i < array.length; i++) {
            const childElement = gameDOM.querySelector(".marker" + i);
            const imgElement = childElement.querySelector("img");



        if(imgElement){
            childElement.removeChild(imgElement);
        }
       
        }
        
        
    }
    
    function updateCurrentPlayer(){
        const nameText = document.querySelector(".currentPlayerName");
        playName = gameController.getCurrentPlayer().name;
        nameText.textContent = `its ${playName}'s turn `;
    }
    function updatePlayerNameDOM(){
        player1Name = document.querySelectorAll(".player1Name");/*----------------------------this updates name1 on DOM  */

        player1Name.forEach(element => {
            element.textContent = player1.name;
        });
        
        player2Name = document.querySelectorAll(".player2Name");/*-----------------------------this updates name2 on DOM */
        player2Name.forEach(element => {
            element.textContent = player2.name;
        });

        player1Score = document.querySelectorAll(".score1");/*-----------------------------this updates score of first player */
        player1Score.forEach(element =>{
            element.textContent = player1.score;
        });

        player2Score = document.querySelectorAll(".score2");/*--------------------------------this updates the score of second player */
        player2Score.forEach(element =>{
            element.textContent = player2.score;
        });
    }
    return{
        update,
        reset,
        updateCurrentPlayer,
        updatePlayerNameDOM
    }
    
})();









gameDOM.addEventListener("click", function(event){
    const clickedPlace = event.target;
    const placeNum = clickedPlace.className[6];
    const endScore = document.getElementById("scoreDialog");
    if(gameBoard.placeMarker(placeNum)){
        
        fromArrayToDOM.update();
        

            if(gameController.checkWin()){
                gameDOM.style.pointerEvents = "none";
                winner = gameController.getCurrentPlayer();
                winner.score += 1;
                fromArrayToDOM.updatePlayerNameDOM();
                setTimeout(function(){
                    endScore.show();
                    gameBoard.resetBoard();
                    gameDOM.style.pointerEvents = "auto";
                }, 1000);

            }
            else{
                gameController.switchTurn();
                fromArrayToDOM.updateCurrentPlayer();
            }

    }
   

})