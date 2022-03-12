class Marker {
    constructor() {
        this.position = 0;
    }

    get p() {
        return this.position;
    }

    set p(value) {
        this.position = value;
    }
}

class RomanisationConverter {
    constructor() { }

    getManchu(text) {
        var marker = new Marker();
        var manchu = "";

        while (marker.p < text.length) {
            manchu += this.getLetterAt(text, marker);
        }

        return manchu;
    }

    getLetterAt(text, marker) {
        if (marker.p >= text.length) {
            return "";
        }

        if (text.substr(marker.p, 1) == " ") {
            marker.p += 1;
            return " ";
        }

        if (text.substr(marker.p, 1) == "a") {
            marker.p += 1;
            return String.fromCharCode(0x1820);
        }
        if (text.substr(marker.p, 1) == "e") {
            marker.p += 1;
            return String.fromCharCode(0x185d);
        }
        if (text.substr(marker.p, 1) == "i") {
            marker.p += 1;
            return String.fromCharCode(0x1873);
        }
        if (text.substr(marker.p, 1) == "o") {
            marker.p += 1;
            return String.fromCharCode(0x1823);
        }
        if (text.substr(marker.p, 2) == "uu") {
            marker.p += 2;
            return String.fromCharCode(0x1861);
        }
        if (text.substr(marker.p, 1) == "v") {
            marker.p += 1;
            return String.fromCharCode(0x1861);
        }
        if (text.substr(marker.p, 1) == "u") {
            marker.p += 1;
            return String.fromCharCode(0x1860);
        }
        if (text.substr(marker.p, 1) == "y") {
            marker.p += 1;
            return String.fromCharCode(0x185f);
        }
        
        if (text.substr(marker.p, 2) == "ng") {
            marker.p += 2;
            return String.fromCharCode(0x1829);
        }
        if (text.substr(marker.p, 1) == "n") {
            marker.p += 1;
            return String.fromCharCode(0x1828);
        }
        if (text.substr(marker.p, 1) == "k") {
            marker.p += 1;
            return String.fromCharCode(0x1874);
        }
        if (text.substr(marker.p, 1) == "g") {
            marker.p += 1;
            return String.fromCharCode(0x1864);
        }
        if (text.substr(marker.p, 1) == "h") {
            marker.p += 1;
            return String.fromCharCode(0x1865);
        }
        if (text.substr(marker.p, 1) == "b") {
            marker.p += 1;
            return String.fromCharCode(0x182a);
        }
        if (text.substr(marker.p, 1) == "p") {
            marker.p += 1;
            return String.fromCharCode(0x1866);
        }
        if (text.substr(marker.p, 2) == "sh") {
            marker.p += 2;
            return String.fromCharCode(0x1867);
        }
        if (text.substr(marker.p, 1) == "s") {
            marker.p += 1;
            return String.fromCharCode(0x1830);
        }
        if (text.substr(marker.p, 1) == "t") {
            marker.p += 1;
            return String.fromCharCode(0x1868);
        }
        if (text.substr(marker.p, 1) == "d") {
            marker.p += 1;
            return String.fromCharCode(0x1869);
        }
        if (text.substr(marker.p, 1) == "l") {
            marker.p += 1;
            return String.fromCharCode(0x182f);
        }
        if (text.substr(marker.p, 1) == "m") {
            marker.p += 1;
            return String.fromCharCode(0x182e);
        }
        if (text.substr(marker.p, 1) == "c") {
            marker.p += 1;
            return String.fromCharCode(0x1834);
        }
        if (text.substr(marker.p, 1) == "j") {
            marker.p += 1;
            return String.fromCharCode(0x1835);
        }
        if (text.substr(marker.p, 1) == "r") {
            marker.p += 1;
            return String.fromCharCode(0x1875);
        }
        if (text.substr(marker.p, 1) == "f") {
            marker.p += 1;
            return String.fromCharCode(0x1876);
        }
        if (text.substr(marker.p, 1) == "w") {
            marker.p += 1;
            return String.fromCharCode(0x1838);
        }

        marker.p += 1;
        return text.substr(marker.p, 1);
    }
}

application.controller("WriteController", ["$scope", "$rootScope", "$routeParams", "dataService", "$filter", function WriteController($scope, $rootScope, $routeParams, dataService, $filter) {

    $scope.romanisation = "";
    $scope.manchu = "";

    $scope.converter = new RomanisationConverter();

    $scope.$watch("romanisation", function (newValue, oldValue) {
        $scope.manchu = $scope.converter.getManchu(newValue);
    });

}]);