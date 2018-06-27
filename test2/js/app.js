var card, cards;
var totalLength;
let moves = 0;
function gridSelected() {
    var e = document.getElementById("ddValue");
    totalLength = e.options[e.selectedIndex].value;
    document.getElementById("card-deck").innerHTML = " ";
    for (var i = 1; i <= (totalLength * totalLength); i++) {
        if (i <= (totalLength * totalLength) / 2) {
            document.getElementById("card-deck").innerHTML += "<li class='card' type='" + i + "'>" + i + "</li>";
            document.getElementById("card-deck").innerHTML += "<li class='card' type='" + i + "'>" + i + "</li>";

        }
    }
    var screenWidth = screen.width;
    var cardsWidth = (screenWidth / totalLength) - 30;
    for (var i = 0; i < (totalLength * totalLength); i++) {
        document.getElementsByTagName("li")[i].style.width = cardsWidth + "px";
    }
    card = document.getElementsByClassName("card");
    cards = [...card];
    // loop to add event listeners to each card
    for (var i = 0; i < cards.length; i++) {
        card = cards[i];
        card.addEventListener("click", displayCard);
        card.addEventListener("click", cardOpen);
        card.addEventListener("click", congratulations);
    };
    moves = 0;
    startGame();
}

// All cards in game
const deck = document.getElementById("card-deck");


let counter = document.querySelector(".moves");

//variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1")

// array for opened cards
var openedCards = [];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// start game function 
function startGame() {
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
}

var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

// add opened cards and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
};

//when cards match
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

//when cards don't match
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1000);
}

//disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}

//enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

//count moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;

}

// congratulation message
function congratulations() {
    if (matchedCard.length == (totalLength * totalLength)) {
        // show congratulations modal
        modal.classList.add("show");
        document.getElementById("finalMove").innerHTML = moves;
        closeModal();
    };
}

//close icon 
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
        startGame();
    });
}




