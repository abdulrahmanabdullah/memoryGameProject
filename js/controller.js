const GameController = (function () {


    return {
        createCards: function () {
            UI.buildCards();
        },
        restartGame: function () {
            document.querySelector(UI.getUISelector()['restartBtn']).addEventListener('click', function () {
                UI.restartGame();
            });
        },
        init: function () {
            UI.buildCards();
            UI.cardEventListener();
            // UI.oneSecondHint();
        }
    }
})();