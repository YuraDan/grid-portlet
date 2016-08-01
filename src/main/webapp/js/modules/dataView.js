(function () {
	var hostPath = window.location.protocol + '//' + window.location.host + '/';

	angular.module('dataView', ['gridService', 'commonTools', 'eventModelTools'])
		.component('grDataView', {
			transclude: false,
			templateUrl: hostPath + 'liferay-grid-portlet/html/dataView.html',
			controller: ['$scope'
				, '$element'
				, 'gridConfig'
				, 'gridEvents'
				, 'gridData'
				, 'commonTools'
				, 'eventModelTools'
				, function ($scope
					, element
					, gridConfig
					, gridEvents
					, gridData
					, commonTools
					, eventModelTools) {

					var grid = null,
						portletId = commonTools.getPortletId(element),
						userId = parseInt(Liferay.ThemeDisplay.getUserId()),
						plId = parseInt(Liferay.ThemeDisplay.getPlid());

					//--- Контекст ---
					angular.extend($scope, {
						settings: {
							grid: {}
						}
					});

					//--- Настройки грида ---
					angular.extend($scope.settings.grid, {
						//--- Грид проинициализирован ---
						onInitialized: function (e) {
							grid = e.component;
						}
					});

					//--- Запрос настроек таблицы ---
					gridConfig(portletId, userId, plId, gridConfigSuccess, gridConfigError);

					function gridConfigSuccess(response) {
						var gridComponentName = response.data.components.dxDataGrid.component,
							gridOptions = response.data.components.dxDataGrid.options,
							param = "{}",
							eventActions = response.data.eventAction;
						$scope.dataSetName = response.data.components.dxDataGrid.dataSource.name;
						$scope.dataSetUrl = response.data.components.dxDataGrid.dataSource.url;
						$scope.dataUrl = commonTools.getHostPath() + 'delegate/GridServices/gridData'; //TODO: переделать на data source от сервера
						grid.option(gridOptions);
						grid.repaint();

						$(grid.element()).attr('id', portletId + '_' + gridComponentName);

						//--- Настройка событийной модели ---
						eventModelTools.createEventActions(eventActions);

						//--- Добавление функций обработки ---
						addLiferayActions();

						//--- Запрос данных таблицы ---
						gridData($scope.dataUrl, $scope.dataSetName, userId, param, gridDataSuccess, gridDataError);
					};

					function gridConfigError(response) {
						console.error('Ошибка при получении настроек таблицы');
					};

					function gridDataSuccess(response) {
						var dataSource = response.data;

						grid.option('dataSource', dataSource);

						var testObj = {
							code: "003008000000",
							comments: "Земли без категории",
							createdate: "2016-05-23T12:34:22.152193",
							creator: "postgres",
							guid: "9FA529E9-A699-4168-9FF4-692FC9560DE9",
							id: 3,
							modifier: "postgres",
							modifydate: "2016-07-14T12:38:23.726649",
							name: "Категория не установлена",
							numversion: "1.0",
							pos: 8,
							r_count: null,
							short: "ЗБК222",
							state_id: 1,
							state_name: "Новый",
						}

						dataSource.push(testObj);
						testObj.short = "ЗБК222333";
						
						//grid.refresh();
					};

					function gridDataError(response) {
						console.error('Ошибка при получении данных');
					};

					function addLiferayActions() {
						grid.liferayActions = {}
						grid.liferayActions.refreshData = function (params) {
							gridData($scope.dataUrl, $scope.dataSetName, userId, JSON.stringify(params), gridDataSuccess, gridDataError);
						}
					};
				}]
		});
})();