(function () {
    Globalize.culture(navigator.language || navigator.browserLanguage);
    angular.module('gradisDynamicGridTest', ['dx', 'dataView']);
})();
