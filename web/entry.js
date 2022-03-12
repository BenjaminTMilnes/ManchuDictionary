


application.controller("EntryController", ["$scope", "$rootScope", "$routeParams", "dataService", "$filter", function EntryController($scope, $rootScope, $routeParams, dataService, $filter) {

    //  $scope.getColourOfWord = getColourOfWord;

    $scope.converter = new RomanisationConverter();

    dataService.getData().then(function (data) {
        $scope.entries = data.Entries;
        console.log($routeParams);
        $scope.entry = $scope.entries.filter(entry => entry.URLReference == $routeParams["entryURLReference"])[0];
        console.log($scope.entry);
    });

    $scope.convertRomanisation = function (romanisation) {
        return $scope.converter.getManchu(romanisation);
    }

}]);