var memoryGame = {};

memoryGame.currentSource = undefined
memoryGame.card1Id = undefined
memoryGame.card2Id = undefined

memoryGame.generateGame = function() {

    var randomNumberArray = [];

    var randomImagesArray = [];

    while (randomNumberArray.length < 12) {
        var number = Math.floor(Math.random() * 6) + 1;
        var count = 0;
        for (var i = 0; i < randomNumberArray.length; i++) {
            if (randomNumberArray[i] == number) {
                count++;
            }
        }
        if (count != 2) {
            randomNumberArray[i] = number;
        }
    }
        console.log(randomNumberArray);
    for (var j = 0; j < randomNumberArray.length; j++) {
        var numberString = randomNumberArray[j].toString();
        randomImagesArray[j] = "images/" + numberString + ".jpg";
    }
        console.log(randomImagesArray);
    for (var k = 0; k < randomImagesArray.length; k++) {
        var gamePiece = document.getElementById("gamePiece" + (k+1));
        gamePiece.src = randomImagesArray[k];
    }

    //Clean up the flippedPieces array and remove flipped class attribute
    memoryGame.flippedPieces = memoryGame.treatDuplications("flipped");
    for (var k = 0; k < memoryGame.flippedPieces.length; k++) {
        memoryGame.flippedPieces[k].classList.remove("flipped")
    }
    memoryGame.flippedPieces = []

};

memoryGame.flipCard = function(e) {
    console.log("here")
    var self = this;

    e.target.classList.add("flipped");
    memoryGame.flippedPieces = memoryGame.treatDuplications("flipped");

    console.log(memoryGame.flippedPieces)

    if(memoryGame.flippedPieces.length%2 == 1)
    {
        console.log(e.target);
        memoryGame.currentSource = e.target.src;
        memoryGame.card1Id = e.target.id;

        console.log("one card flipped");
        console.log(memoryGame.currentSource);
    }

    if (memoryGame.flippedPieces.length > 0 && memoryGame.flippedPieces.length%2 == 0) {
        console.log("already have one card flipped")

        memoryGame.card2Id = e.target.id;

        console.log(memoryGame.card1Id)
        console.log(memoryGame.card2Id)
        if (memoryGame.currentSource == e.target.src) {
            console.log("equal!!! " + memoryGame.currentSource  + " " + e.target.id)


            if(memoryGame.flippedPieces.length == 12)
            {
                titleToChange = document.getElementById("titleOfGame");
                titleToChange.innerHTML = "Play it again"
                console.log("Success !")
            }

        }else {
            console.log("not equal")
            setTimeout(function(){
                memoryGame.flippedPieces = memoryGame.treatDuplications("flipped");

                removeValFromIndex = []
                for(var i = 0, length = memoryGame.flippedPieces.length; i < length; i++) {

                    console.log(memoryGame.flippedPieces)
                    if (memoryGame.flippedPieces[i].id == memoryGame.card1Id
                        || memoryGame.flippedPieces[i].id == memoryGame.card2Id)
                    {
                        removeValFromIndex.push(i)
                    }
                }

                itemToRemove = document.getElementById(memoryGame.card1Id)
                itemToRemove2 = document.getElementById(memoryGame.card2Id)
                itemToRemove.classList.remove("flipped")
                itemToRemove2.classList.remove("flipped")

                console.log(removeValFromIndex)
                for (var i = removeValFromIndex.length -1; i >= 0; i--)
                    memoryGame.flippedPieces.splice(removeValFromIndex[i],1);

                console.log(memoryGame.flippedPieces)

                console.log(memoryGame.gamePieces)
                for (var i = 0; i < memoryGame.gamePieces.length; i++){
                    console.log(memoryGame.gamePieces[i])
                    memoryGame.gamePieces[i].addEventListener("click",memoryGame.flipCard);
                }

            },2000);
        }

        memoryGame.currentSource = undefined;

    }

    e.target.classList.add("flipped");

};

memoryGame.init = function () {
    memoryGame.gameButton = document.getElementById("newGameButton");

    memoryGame.gamePieces = [];
    memoryGame.gamePieces = memoryGame.treatDuplications("gamePieceImage");
    memoryGame.gameButton.addEventListener("click",memoryGame.generateGame);

    for (var i = 0; i < memoryGame.gamePieces.length; i++){
        memoryGame.gamePieces[i].addEventListener("click",memoryGame.flipCard);
    }

    console.log(memoryGame.gamePieces);

};


memoryGame.treatDuplications = function(classSelector)
{
    var finalArray = [];
    var elements = document.getElementsByClassName(classSelector);
    for(var i = 0, length = elements.length; i < length; i++) {
        finalArray.push(elements[i])
    }
    return finalArray;
}


window.onload = memoryGame.init();