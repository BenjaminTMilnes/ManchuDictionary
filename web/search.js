

application.filter("paginate", function () {
    return function (a, pageNumber, numberOfItemsPerPage) {
        if (a == null || a == undefined) {
            return [];
        }

        if (pageNumber == null) {
            pageNumber = 1;
        }

        if (numberOfItemsPerPage == null) {
            numberOfItemsPerPage = 10;
        }

        var p = (pageNumber - 1) * numberOfItemsPerPage;
        var q = (pageNumber) * numberOfItemsPerPage;

        return a.slice(p, q);
    }
});

application.filter("searchEntries", function () {
    return function (entries, text) {
        if (entries == null || entries == undefined) {
            return [];
        }

        if (stringIsNullOrEmpty(text)) {
            return entries;
        }
        else {
            return entries;
        }
    }
});

application.controller("SearchController", ["$scope", "$rootScope", "$routeParams", "dataService", "$filter", function SearchController($scope, $rootScope, $routeParams, dataService, $filter) {

    //  $scope.getColourOfWord = getColourOfWord;

    $scope.pageNumber = 1;
    $scope.numberOfItemsPerPage = 10;
    $scope.numberOfPages = 1;
    $scope.pages = [];

    $scope.searchResults = [];
    $scope.currentPageSearchResults = [];

    $scope.searchTerms = "";

    $scope.numberOfEntries = 0;

    $scope.converter = new RomanisationConverter();

    dataService.getData().then(function (data) {
        $scope.entries = data.Entries;
        $scope.numberOfEntries = $scope.entries.length;

        $scope.updateSearchResults($scope.searchTerms);
    });

    $scope.setPageNumber = function (n) {
        if (n <= 0 || n > $scope.numberOfPages) {
            return;
        }

        $scope.pageNumber = n;
        $scope.setPageNumberRange();
    }

    $scope.setPageNumberRange = function () {

        if ($scope.searchResults == null || $scope.searchResults == undefined) {
            return;
        }

        $scope.currentPageSearchResults = $filter("paginate")($scope.searchResults, $scope.pageNumber, $scope.numberOfItemsPerPage);

        $scope.numberOfPages = Math.ceil($scope.searchResults.length / $scope.numberOfItemsPerPage);
        $scope.pages = [];

        var addEllipses = 0;

        for (var i = 0; i < $scope.numberOfPages; i++) {
            if (i > 0 && i < $scope.numberOfPages - 1 && (i < $scope.pageNumber - 3 || i > $scope.pageNumber + 1)) {
                if (addEllipses == 0) {
                    $scope.pages.push({ "pageNumber": -1, "class": "pagenumber-ellipses" });
                }
                addEllipses = 1;
            }
            else {
                $scope.pages.push({ "pageNumber": i + 1, "class": (i == $scope.pageNumber - 1) ? "pagenumber-selected" : "pagenumber-unselected" });
                addEllipses = 0;
            }
        }

    }

    $scope.updateSearchResults = function (searchTerms) {
        $scope.searchResults = $filter("searchEntries")($scope.entries, searchTerms);

        $scope.setPageNumberRange();
    }

    $scope.$watch("searchTerms", function (newValue, oldValue) {
        $scope.updateSearchResults(newValue);
    });

    $scope.convertRomanisation = function (romanisation) {
        return $scope.converter.getManchu(romanisation);
    }

    $scope.getPartOfSpeechAbbreviation = function(partOfSpeech){
        if (partOfSpeech == "verb"){
            return "v.";
        }
        else if (partOfSpeech == "noun"){
            return "n.";
        }
        else if (partOfSpeech == "pronoun"){
            return "pro.";
        }
        else if (partOfSpeech == "adjective"){
            return "adj.";
        }

        return "";
    }

}]);