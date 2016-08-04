(function () {
	var hostPath = window.location.protocol + '//' + window.location.host + '/';

	angular.module('dataView', ['servicePortlet', 'commonTools', 'eventModelTools'])
		.component('grDataView', {
			transclude: false,
			templateUrl: hostPath + 'liferay-grid-portlet/html/dataView.html',
			controller: ['$scope'
				, '$element'
				, 'getConfig'
				, 'getData'
				, 'commonTools'
				, 'eventModelTools'
				, function ($scope
					, element
					, getConfig
					, getData
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
					getConfig(portletId, userId, plId, gridConfigSuccess, gridConfigError);

					function gridConfigSuccess(config) {
						var gridComponentName = config.components.dxDataGrid.component,
							gridOptions = config.components.dxDataGrid.options,
							eventActions = config.eventAction;
						grid.option(gridOptions);
						grid.repaint();

						//--- Установка идентификатора элемента с гридом ---
						$(grid.element()).attr('id', portletId + '_' + gridComponentName);

						//--- Настройка событийной модели ---
						eventModelTools.createEventActions(eventActions);

						//--- Добавление функций обработки ---
						addActions(config.dataSource);

						//--- Запрос данных таблицы ---
						grid.actions.refreshData({});
					};

					function gridConfigError(response) {
						console.error('Ошибка при получении настроек таблицы');
					};

					function gridDataSuccess(data) {
						grid.option('dataSource', data);
					};

					function gridDataError(response) {
						console.error('Ошибка при получении данных');
					};

					//--- Добавление реакций на события Liferay ---
					function addActions(dataSources) {
						for (var i = 0; i < dataSources.length; ++i) (function (dataSource) {
							addActionsForComponent(dataSource);
						})(dataSources[i]);
					};

					//--- Добавление реакции на события на основе dataSource ---
					function addActionsForComponent(dataSource) {
						var dxComponent = null,
							defaultSuccessFn = function (data) {
								dxComponent.option('dataSource', data);
							};
						if (dataSource.component != dataSource.parentComponent) {
						}
						else {
							dxComponent = grid;
						}

						var actions = {};

						switch (dataSource.componentType) {
							case "dxDataGrid":
								actions.refreshData = getRefreshDataFn(dataSource.dataSource, userId, portletId, plId, gridDataSuccess, gridDataError);
								break;
						}
						dxComponent.actions = actions;
					};

					//--- Формирование функции обновления данных ---
					function getRefreshDataFn(dataSourceName, userId, portletId, plId, succesFn, errorFn) {
						return function (params) {
							params.i_portletid = portletId;
							params.i_plid = plId;
							getData(dataSourceName
								, userId, JSON.stringify(params)
								, succesFn
								, errorFn);
						};
					};
				}]
		});
})();