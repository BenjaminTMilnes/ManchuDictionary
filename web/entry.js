
application.controller("EntryController", ["$scope", "$rootScope", "$routeParams", "dataService", "$filter", function EntryController($scope, $rootScope, $routeParams, dataService, $filter) {

    $scope.converter = new RomanisationConverter();

    $scope.inflexionTypes = {
        "infinitive": "Infinitive",
        "present_tense_interrogative": "Present Tense Interrogative",
        "future_participle": "Future Participle",
        "future_tense": "Future Tense",
        "future_tense_negated": "Future Tense Negated",
        "preterite": "Preterite",
        "conditional": "Conditional",
        "past_gerund": "Past Gerund",
        "dative": "Dative",
        "genitive": "Genitive"
    }

    dataService.getData().then(function (data) {
        $scope.entries = data.Entries;
        $scope.entry = $scope.entries.filter(entry => entry.URLReference == $routeParams["entryURLReference"])[0];
    });

    $scope.convertRomanisation = function (romanisation) {
        return $scope.converter.getManchu(romanisation);
    }

}]);