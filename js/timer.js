//Timer class 
const TimerClass = (function TimerClass() {
    let instance;
    let seconds = 0;
    let minutes = 0;
    let isTimeStart = false;
    let timer;

    function createInstance() {
        let object = new TimerClass();
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
        startTimer: (callback) => {
            if (isTimeStart === true) {
                return;
            }
            isTimeStart = true;
            timer = setInterval(() => {
                seconds++;
                if (seconds >= 60) {
                    minutes++;
                    seconds = 0;
                }
                if (callback) {
                    callback();
                }
            }, 1000);

        },
        stopTimer: () => {
            clearInterval(timer);
            isTimeStart = false;
        },
        restartTimer: () => {
            this.stopTimer;
            seconds = 0;
            minutes = 0;
        },
        getCurrentTime: () => {
            let timeString = `0${minutes}:${seconds}`;
            return timeString;
        }
    }
})();