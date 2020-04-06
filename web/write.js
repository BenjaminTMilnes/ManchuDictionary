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

        if (text.substr(marker.p, 1) == "a") {
            marker.p += 1;
            return String.fromCharCode(0x1820);
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