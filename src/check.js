'use strict';

function getMessage (a, b) {

    if (typeof a === "boolean") {

        if (a) {
            return "Я попал в " + b;
        } else {
            return "Я никуда не попал";
        }

    }

    var calcHeightInCentimeters = function (i) {
        return i * 100;
    };

    if (typeof a === "number") {
        return "Я прыгнул на " + calcHeightInCentimeters(a) + " сантиметров";
    }

    if (Array.isArray(a) && !Array.isArray(b)) {

        var numberOfSteps = 0;

        for (var i = 0; i < a.length; i++) {
            numberOfSteps += a[i];
        }

        return "Я прошёл " + numberOfSteps + " шагов";
    }

    if (Array.isArray(a) && Array.isArray(b)) {

        var distancePath = 0;

        for (var i = 0; i < a.length; i++) {
            distancePath += a[i] * b[i];
        }

        return "Я прошёл " + distancePath + " метров";
    }
}
