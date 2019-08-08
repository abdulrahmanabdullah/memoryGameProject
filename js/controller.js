//Controller class to create ul and li elements 
// and when click restart button.
const GameController = (function () {

    // I like this idea 😄 😄 😄 to help peploe when reload page.
    const hintUser = () => {
        UI.buildCards();
        let cards = UI.getUISelector()['card'];
        document.querySelectorAll(cards).forEach((card) => {
            card.classList.add('open', 'show');
        });
        setTimeout(() => {
            document.querySelectorAll(cards).forEach((card) => {
                card.classList.remove('open', 'show');
            });
        }, 1000);
        UI.cardEventListener();
    }
    return {
        restartGame: function () {
            document.querySelector(UI.getUISelector()['restartBtn']).addEventListener('click', function () {
                UI.restartGame();
            });
        },
        getHint: () => hintUser(),
        init: function () {
            this.getHint();
        }
    }
})();