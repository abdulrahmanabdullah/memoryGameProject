// Put all element here 
const UI = (function () {
    // priavte variables. 
    let lastCardOpened = null;
    let matcheCards = [];
    let isCardShowed = false;
    let moveSteps = 0;
    //Private funcitons 
    const UISelector = {
        deck: ".deck",
        card: ".card",
        restartBtn: ".restart",
        moves: ".moves",
        modalCenter: "#modal-center",
        timer: "#timer",
        stars: ".stars",
        timerModal: "#timer-modal",
        restartModalBtn: "#restart-modal-btn",
        movesModal: "#moves-modal",
    }
    // To create one card just one card :100: 
    const createCard = function (cardClassName) {
        let li = document.createElement('li');
        li.classList.add('card');
        li.setAttribute('data-card-name', cardClassName);
        let i = document.createElement('i');
        i.classList.add('fa', cardClassName);
        i.setAttribute('data-card-name', cardClassName);
        li.appendChild(i);
        return li;
    }
    const timerOne = () => TimerClass.getInstance();
    //Public funcitons
    return {
        timer: () => {
            return timerOne();
        },
        getUISelector: function () {
            return UISelector;
        },
        buildCards: function () {
            // array of cards class name 
            let cardClassName = GameModel.getReadyCard();
            // cause we need 16 cards, so write loop starting of 0 until 15 .
            for (let i = 0; i < 16; i++) {
                let className = cardClassName[i];
                let newCard = createCard(className);
                document.querySelector(UISelector.deck).appendChild(newCard);
            }
        },
        cardEventListener: function () {
            // Using Anonymous function to avoid create new variable like -> self  
            this.timer().startTimer(() =>
                document.querySelector(UISelector.timer).innerHTML = `<em>${this.timer().getCurrentTime()}</em>`);
            document.querySelectorAll(UISelector.card).forEach((card) => {
                card.addEventListener('click', () => {
                    // when current card = last card opened  OR cards already in our list OR both cards is showing 
                    // don't do anything return until  both card close.
                    if (lastCardOpened === card || matcheCards.includes(card) || isCardShowed) {
                        return;
                    }
                    card.classList.add('open', 'show');
                    // Last open card not equal null.. 
                    if (lastCardOpened) {
                        let thisCard = card.children[0].getAttribute('data-card-name');
                        let lastCard = lastCardOpened.children[0].getAttribute('data-card-name');
                        moveSteps += 1;
                        this.movesCounter(moveSteps);
                        this.buildStars(moveSteps);
                        //When matching card .. 
                        if (thisCard === lastCard) {
                            card.classList.add('match');
                            lastCardOpened.classList.add('match');
                            matcheCards.push(card);
                            matcheCards.push(lastCardOpened);
                            //to accept new one.
                            lastCardOpened = null;
                            // 16 means all card is matching 👍
                            if (matcheCards.length === 16) {
                                this.modalInfo();
                            }
                        }
                        //Card not matching 
                        else {
                            isCardShowed = true;
                            card.classList.add('no-match');
                            lastCardOpened.classList.add('no-match');
                            setTimeout(function () {
                                card.classList.remove('open', 'show');
                                lastCardOpened.classList.remove('open', 'show');
                                card.classList.remove('no-match');
                                lastCardOpened.classList.remove('no-match');
                                lastCardOpened = null;
                                isCardShowed = false;
                            }, 300);
                        }
                    } else {
                        lastCardOpened = card;
                    }
                });

            });
        },
        buildStars: function (moves) {
            let stars = document.querySelector(UISelector['stars']);
            let oneStar = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o"></i></li> <li><i class="fa fa-star-o"></i>';
            let twoStar = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o"></i>';
            let threeStar = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i>';
            if (moves < 5) {
                // put three stars 
                stars.innerHTML = threeStar;
            } else if (moves < 10) {
                // put two stars 
                stars.innerHTML = twoStar;
            } else {
                // put one stars 
                stars.innerHTML = oneStar;
            }
        },
        movesCounter: function (steps) {
            let moves = document.querySelector(UISelector['moves']);
            moves.innerHTML = steps;
        },
        restartGame: function () {
            moveSteps = 0;
            matcheCards = [];
            this.timer().restartTimer(() =>
                document.querySelector(UISelector.timer).innerHTML = `<em>${this.timer().getCurrentTime()}</em>`);
            this.movesCounter(moveSteps);
            this.buildStars(moveSteps);
            document.querySelector(UISelector.deck).innerHTML = '';
            this.buildCards();
            this.cardEventListener();
        },
        modalInfo: function () {
            let modalUI = document.querySelector(UISelector.modalCenter);
            //Stopping timer 
            this.timer().stopTimer();
            modalUI.classList.add('show');
            modalUI.style.display = 'block';
            document.querySelector(UISelector.movesModal).innerHTML = moveSteps;
            document.querySelector(UISelector.timerModal).innerHTML = this.timer().getCurrentTime();
            document.querySelector(UISelector.restartModalBtn).addEventListener('click', () => {
                modalUI.classList.remove('show');
                modalUI.style.display = 'none';
                this.restartGame();
            });
        },
        oneSecondHint: function () {
            document.querySelectorAll(UISelector.card).forEach((card) => {
                card.classList.add('open', 'show');
            });
            setTimeout(() => {
                this.cardEventListener();
            }, 1000);
            console.log("Calling after time out");
            this.cardEventListener();
        },
    }
})();