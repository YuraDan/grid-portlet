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
						plId = parseInt(Liferay.ThemeDisplay.getPlid()),
						dataSources = [];

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

						//--- Установка идентификатора элемента с гридом ---
						$(grid.element()).attr('id', portletId + '_' + gridComponentName);

						//--- Получение компонентов с dataSource ---
						dataSources = response.data.dataSource;

						//--- Настройка событийной модели ---
						eventModelTools.createEventActions(eventActions);

						//--- Добавление функций обработки ---
						addActions();

						//--- Запрос данных таблицы ---
						grid.actions.refreshData({});
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

					function addActions() {
						grid.actions = {}
						grid.actions.refreshData = function (params) {
							formDataRequests(params);
						}
					};

					//--- Формирование запросов данных для вложенных компонент ---
					function formDataRequests(params) {
						for (var i = 0; i < dataSources.length; ++i)(function (dataSource) {
							dataRequest(dataSource, params);
						})(dataSources[i]);
					};

					//--- Отправка запроса данных для вложенного компонента ---
					function dataRequest(dataSource, params) {
						gridData($scope.dataUrl
							, dataSource.dataSource
							, userId
							, JSON.stringify(params)
							, gridDataSuccess
							, gridDataError);
					};
				}]
		});
})();