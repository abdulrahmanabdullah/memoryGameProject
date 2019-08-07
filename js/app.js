// UI 
const cardsUI = document.querySelector('.deck');
const startsUI = document.querySelector('.stars');
const movesUI = document.querySelector('.moves');
const modalUI = document.getElementById('modalCenter');
const totalMovesUI = document.getElementById('moves');
const timerUI = document.getElementById('timer');
const timerModalUI = document.getElementById('timer-modal');

// Global variables .
// track the matching cards, when reach to 8 that's mean game is end.
let trackUser = 0;

// calculate user moves.
let moveSteps = 0;
// This is for timer.
let seconds = 0;
let minutes = 0;


// When open page or restart game call this funciton
document.addEventListener("DOMContentLoaded", initGame);
function initGame() {
    // Hide all cards 
    hideAllCards();
}


// Save all card names as array then pass it to shuffle method .
function fetchIconNames() {
    let cardNames = [];
    for (const card of cardsUI.children) {
        let names = card.children[0].className;
        cardNames.push(names);
    }
    return cardNames;
}

// When refresh page or start new game call this function 
function shuffledIconName() {
    let currentCount = -1;
    let cardNames = shuffle(fetchIconNames());
    for (const card of cardsUI.children) {
        currentCount += 1;
        let i_tage = card.children[0];
        i_tage.className = cardNames[currentCount];
    }
}

// put card when click 
openCardList = [];
let isMatching = () => {
    return openCardList.length >= 2 && openCardList[0].children[0].className === openCardList[1].children[0].className;
}

// check matching cards if it matching add match class, else hide cards . 
function makeItMatch() {
    if (isMatching()) {
        for (const item of openCardList) {
            item.classList.add('match');
        }
        trackUser += 1;
        openCardList = [];
    } else {
        hideOpenCards();
        openCardList = [];
    }
    // When user reach to 8 that means he matching all cards then display modal message.
    trackUser === 8 ? notify() : console.log("Not yet");
}

function cardStateReady() {
    // When user start clicked any card, fire timer.
    for (const card of cardsUI.children) {
        card.addEventListener('click', function () {
            openCardList.push(card);
            //observe user moves.
            moveSteps += 1;
            rating();
            if (openCardList.length <= 2) {
                card.classList.add('show', 'open');
                setTimeout(makeItMatch, 1000);
            }
        });
    }
}

// Fire when card click . 
cardStateReady();

function rating() {
    movesUI.innerHTML = `${moveSteps}`;
    let putThreeStars = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i>`;
    let putTwoStars = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o"></i>`;
    let putOneStar = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o"></i></li> <li><i class="fa fa-star-o"></i> `;
    if (moveSteps < 3) {
        startsUI.innerHTML = putThreeStars;
    } else if (moveSteps < 8) {
        startsUI.innerHTML = putTwoStars;
    } else {
        startsUI.innerHTML = putOneStar;
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
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
}

// Restart game 
const restartUI = document.querySelector('.restart');
restartUI.addEventListener('click', restartGame);

function restartGame() {
    trackUser = 0;
    moveSteps = 0;
    movesUI.innerHTML = moveSteps;
    hideAllCards();
    rating();
    seconds = 0;
    minutes = 0;
    timerUI.innerHTML = `${minutes}:${seconds}`;
}

// hide show and open cards 
function hideOpenCards() {
    for (const card of cardsUI.children) {
        if (!card.classList.contains('match')) {
            card.className = 'card';
        }
    }
}


function notify() {
    // finaly get seconds and minutes to tell user how long he played..
    timerModalUI.innerHTML = `You do it after:${minutes}:${seconds}`;
    totalMovesUI.innerHTML = moveSteps;
    modalUI.classList.add('show');
    modalUI.style.display = 'block';
    //When click restart ... 
    document.getElementById('restart-game-btn').addEventListener('click', function () {
        modalUI.classList.remove('show');
        modalUI.style.display = 'none';
        restartGame();
    });
}


/*
 ** Timer area 
*/
let fireTimer = setInterval(() => calculateTime(), 1000);

function calculateTime() {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    timerUI.innerHTML = `${minutes}:${seconds}`;
}

function stopTimer() {
    clearInterval(fireTimer);
}

/*
 ** RESTER GAME area 
*/

//Hide all cards when refresh page or open page even restart game .
function hideAllCards() {
    for (const card of cardsUI.children) {
        card.className = 'card';
    }
    shuffledIconName();
    fireTimer ;
}