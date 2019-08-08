const GameController = (function () {
    // priavte variables .
    let lastCardOpened = null;
    let matcheCards = [];
    let isCardShowed = false;

    return {
        createCards: function () {
            UI.buildCards();
        },
        cardEventListener: function () {
            document.querySelectorAll(UI.getUISelector()['card']).forEach((card) => {
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
                        //When matching card .. 
                        if (thisCard === lastCard) {
                            card.classList.add('match');
                            lastCardOpened.classList.add('match');
                            matcheCards.push(card);
                            matcheCards.push(lastCardOpened);
                            //to accept new one.
                            lastCardOpened = null;
                        }
                        //Card not matching 
                        else {
                            isCardShowed = true;
                            setTimeout(function () {
                                card.classList.remove('open', 'show');
                                lastCardOpened.classList.remove('open', 'show');
                                lastCardOpened = null;
                                isCardShowed = false;
                            }, 1000);
                        }
                    } else {
                        lastCardOpened = card;
                    }
                })
            });
        }
    }
})();