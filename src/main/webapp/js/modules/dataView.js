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
						$scope.dataUrl = commonTools.getHostPath() + 'delegate/GridServices/gridData'; //TODO: переделать на data source от сервера
						grid.option(gridOptions);
						grid.repaint();

						$(grid.element()).attr('id', portletId + '_' + gridComponentName);

						//--- Настройка событийной модели ---
						eventModelTools.createEventActions(eventActions);

						//--- Добавление функций обработки ---
						addLiferayActions();

						//--- Запрос данных таблицы ---
						gridData($scope.dataUrl, grid.option('dataSetName'), userId, param, gridDataSuccess, gridDataError);
					};

					function gridConfigError(response) {
						console.error('Ошибка при получении настроек таблицы');
					};

					function gridDataSuccess(response) {
						grid.option('dataSource', response.data);
					};

					function gridDataError(response) {
						console.error('Ошибка при получении данных');
					};

					function addLiferayActions() {
						grid.liferayActions = {}
						grid.liferayActions.refreshData = function (params) {
							gridData($scope.dataUrl, grid.option('dataSetName'), userId, JSON.stringify(params), gridDataSuccess, gridDataError);
						}
					};


				}]
		});
})();