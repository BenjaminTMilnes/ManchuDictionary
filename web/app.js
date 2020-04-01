var application = angular.module("ManchuDictionary", ["ngRoute", "ngSanitize"]);

application.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "search.html", controller: "SearchController" });
});

application.directive("compile", ["$compile", function ($compile) {
    return function (scope, element, attributes) {
        scope.$watch(function (scope) {
            return scope.$eval(attributes.compile);
        }, function (value) {
            element.html(value);
            $compile(element.contents())(scope);
        });
    };
}]);

class Database {
    constructor(data) {
        this._data = data;
    }
    get entries() {
        return this._data.Entries;
    }
}

application.factory("dataService", ["$http", function ($http) {
    var dataService = {
        data: null,
        getData: function () {
            var that = this;

            if (this.data != null) {
                return new Promise(function (resolve, reject) { return resolve(that.data); });
            }

            return $http.get("dictionary.json").then(function (response) {
                that.data = response.data;

                return response.data;
            });
        }
    };

    return dataService;
}]);