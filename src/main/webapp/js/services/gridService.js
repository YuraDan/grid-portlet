(function () {
    var hostPath = window.location.protocol + '//' + window.location.host + '/';

    angular.module('gridService', [])
        .factory('gridConfig', ['$http', function ($http) {
			return function (portletId, userId, plId, successCallback, failCallback) {
				$http.get(hostPath + 'delegate/GridServices/gridConfig/', {
					params: {
						portletId: portletId,
						userId: userId,
						plId: plId
					}
				}).then(successCallback, failCallback || angular.noop);
			}
		}])
		.factory('gridEvents', ['$http', function ($http) {
			return function (portletId, userId, plId, successCallback, failCallback) {
				$http.get(hostPath + 'delegate/GridServices/gridEvents/', {
					params: {
						portletId: portletId,
						userId: userId,
						plId: plId
					}
				}).then(successCallback, failCallback || angular.noop);
			}
		}])
		.factory('gridData', ['$http', function ($http) {
			return function (url, dataSetName, userId, param, successCallback, failCallback) {
				$http.get(url, {
					params: {
						dataSetName: dataSetName,
						userId: userId,
						param: param
					}
				}).then(successCallback, failCallback || angular.noop);
			}
		}]);
})();