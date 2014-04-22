(function ($) {
    "use strict";

    function NumberGeneration() {
        var MAX_NO_OF_CONSECUTIVE_PITCH_CHANGES = 2; /* after the initial one, so 2 == 3 in a row */

        var self = {};
        var currentNumber = 1;
        var upCount = 0;
        var lastMovementWasUp = null;
        var downCount = 0;

        self.init = function () {
            self.setChangeInterval();
        };

        self.setChangeInterval = function () {
            setInterval(self.changeText, 2000);
        };

        self.changeText = function () {
            var up;

            if (upCount >= MAX_NO_OF_CONSECUTIVE_PITCH_CHANGES && lastMovementWasUp) {
                up = false;
            }
            else if (downCount >= MAX_NO_OF_CONSECUTIVE_PITCH_CHANGES && !lastMovementWasUp) {
                up = true
            }
            else {
                up = Math.round(Math.random()) == 1;
            }

            if (up) {
                upCount++;
                downCount = 0;
                lastMovementWasUp = true;
            }
            else {
                downCount++;
                upCount = 0;
                lastMovementWasUp = false;
            }

            $('body').text(currentNumber + " " + (up ? "\u21E7" : "\u21E9")).css('color', up ? 'green' : 'blue');

            if (currentNumber < 10) {
                currentNumber++;
            }
            else {
                currentNumber = 1;
            }

        };

        return self;
    }

    window.numberGeneration = new NumberGeneration();
    numberGeneration.init();
})(jQuery);

