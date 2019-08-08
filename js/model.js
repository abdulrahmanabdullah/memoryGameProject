const GameModel = (function () {

    const cardClassName = [
        'fa-diamond',
        'fa-diamond',
        'fa-paper-plane-o',
        'fa-paper-plane-o',
        'fa-anchor',
        'fa-anchor',
        'fa-bolt',
        'fa-bolt',
        'fa-cube',
        'fa-cube',
        'fa-bomb',
        'fa-bomb',
        'fa-bicycle',
        'fa-bicycle',
        'fa-leaf',
        'fa-leaf'
    ];

    // Call this function on public functions.
    const shuffleCard =
        function (array) {
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

    return {
        // This function return array after shuffling.
        getReadyCard: function () {
            return shuffleCard(cardClassName);
        }
    }
})();