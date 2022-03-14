
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
        "imperative": "Imperative",
        "present_tense": "Present Tense",
        "subjunctive_present": "Subjunctive Present",
        "imperfect": "Imperfect",
        "indefinite_past": "Indefinite Past",
        "pluperfect": "Pluperfect",
        "past_conditional": "Past Conditional",
        "adversative": "Adversative",
        "concessive": "Concessive",
        "optative": "Optative",
        "gerund_i": "Gerund I",
        "gerund_ii": "Gerund II",
        "gerund_iii": "Gerund III",
        "passive": "Passive",
        "causative": "Causative",
        "verbal_noun": "Verbal Noun",
        "agent_noun": "Agent Noun",
        "indefinite": "Indefinite",
        "adverbial": "Adverbial",
        "dative": "Dative",
        "genitive": "Genitive"
    };

    $scope.inflexionsOrder = [
        "infinitive",
        "present_tense_interrogative",
        "future_participle",
        "future_tense",
        "future_tense_negated",
        "preterite",
        "conditional",
        "past_gerund",
        "imperative",
        "present_tense",
        "subjunctive_present",
        "imperfect",
        "indefinite_past",
        "pluperfect",
        "past_conditional",
        "adversative",
        "concessive",
        "optative",
        "gerund_i",
        "gerund_ii",
        "gerund_iii",
        "passive",
        "causative",
        "verbal_noun",
        "agent_noun",
        "indefinite",
        "adverbial",
        "dative",
        "genitive"
    ];

    $scope.inflexions = [];
    $scope.references = [];

    dataService.getData().then(function (data) {
        $scope.entries = data.Entries;
        $scope.entry = $scope.entries.filter(entry => entry.URLReference == $routeParams["entryURLReference"])[0];

        $scope.inflexionsOrder.forEach(t => {
            if ($scope.entry.Inflexions[t] !== undefined) {
                var inflexion = {};

                inflexion["Type"] = $scope.inflexionTypes[t];
                inflexion["Manchu"] = $scope.entry.Inflexions[t].Manchu;
                inflexion["Romanisations"] = {};
                inflexion["Romanisations"]["Moellendorff"] = $scope.entry.Inflexions[t].Romanisations.Moellendorff;

                $scope.inflexions.push(inflexion);
            }
        });

        var rr = [];

        $scope.entry.Interpretations.forEach(i => {
            rr = rr.concat(rr, i.References);
        });

        rr.forEach(r => {
            $scope.references.push(data.References[r]);
        });
    });

    $scope.convertRomanisation = function (romanisation) {
        return $scope.converter.getManchu(romanisation);
    }

}]);