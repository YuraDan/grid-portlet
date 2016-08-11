(function () {
	var hostPath = window.location.protocol + '//' + window.location.host + '/';

	angular.module('dataView', ['servicePortlet', 'commonTools', 'eventModelTools'])
		.component('grDataView', {
			transclude: false,
			templateUrl: hostPath + 'liferay-grid-portlet/html/dataView.html',
			controller: ['$scope'
				, '$element'
				, 'servicePortlet'
				, 'commonTools'
				, 'eventModelTools'
				, function ($scope
					, element
					, servicePortlet
					, commonTools
					, eventModelTools) {

					var grid = null,
						portletId = commonTools.getPortletId(element);

					//--- Контекст ---
					angular.extend($scope, {
						settings: {
							grid: {}
						},
						gridButtonClick: function (r, c) {
							alert(r + ' ' + c);
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
					servicePortlet.getConfig(portletId, gridConfigSuccess, gridConfigError);

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

						//--- Добавление расширенных свойст ---
						addExtendedProperties(config.extendedProperties);

						//--- Запрос данных таблицы ---
						grid.actions.refreshData({});
					}

					function gridConfigError(response) {
						console.error('Ошибка при получении настроек таблицы');
					}

					function gridDataSuccess(data) {
						grid.option('dataSource', data);
					}

					function gridDataError(response) {
						console.error('Ошибка при получении данных');
					}


					function addExtendedProperties(extendedProperties) {
						for (var i = 0; i < extendedProperties.length; ++i) (function (props) {
							addPropertiesForComponent(props);
						})(extendedProperties[i]);
					}

					function addPropertiesForComponent(properties) {
						var dxComponent = null,
							defaultSuccessFn = function (data) {
								dxComponent.option('dataSource', data);
							};

						dxComponent = commonTools.getDxComponentByPath(portletId, properties.componentPath).component;
						if (!dxComponent) {
							return;
						}

						if (properties.dataSource && dxComponent) {
							var actions = {};
							switch (properties.componentType) {
								case "dxDataGrid":
									actions.refreshData = getRefreshDataFn(properties.dataSource, gridDataSuccess, gridDataError);
									break;
							}
							dxComponent.actions = actions;
						}
					}

					//--- Формирование функции обновления данных ---
					function getRefreshDataFn(dataSourceName, succesFn, errorFn) {
						return function (params) {
							servicePortlet.getData(dataSourceName
								, params
								, succesFn
								, errorFn);
						};
					}
				}]
		});
})();