// Put all element here 
const UI = (function () {

    //Private funcitons 
    const UISelector = {
        deck: ".deck",
        card: ".card",
        restartBtn: ".restart",
    }
    // just create one card. 
    const createCard = function (cardClassName) {
        let li = document.createElement('li');
        li.classList.add('card', cardClassName);
        li.setAttribute('data-card-name', cardClassName);
        let i = document.createElement('i');
        i.classList.add('fa', cardClassName);
        i.setAttribute('data-card-name', cardClassName);
        li.appendChild(i);
        return li;
    },

    //Public funcitons
    return {
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
        }

    }

})();