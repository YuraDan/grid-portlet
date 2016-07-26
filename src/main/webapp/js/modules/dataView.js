(function () {
	var hostPath = window.location.protocol + '//' + window.location.host + '/',
		colors = [
			'#7cf778',
			'#f80000',
			'#4fd7e4',
			'#5440e6',
			'#ff3ff9',
			'transparent',
			'#f1bf1a',
			'#ff8a5c',
			'#3f8cff',
			'#05924e',
			'#a70e0e'
		],
		extend = angular.extend,
		initialData = [],
		setDataToTable = function (table, data) {
			table.option('dataSource', data);
			table.refresh();
		};

	angular.module('dataView', [])
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
		}])
		.component('grDataView', {
			transclude: false,
			templateUrl: hostPath + 'liferay-grid-portlet/html/dataView.html',
			controller: ['$scope', '$element', 'gridConfig', 'gridData', function ($scope, element, gridConfig, gridData) {
				var table,
					selectedRowIndex = -1,
					currentRow,
					iDataView;

				//--- Контекст ---
				extend($scope, {
					settings: {table: {}},
					data: []
				});

				//--- Настройки таблицы ---
				extend($scope.settings.table, {
					bindingOptions: {
						dataSource: 'data'
					},
					//--- Выбор строки ---
					onRowClick: function (e) {
						if (e.rowType === 'data') {
							//--- Выделение строки ---
							currentRow && currentRow.removeClass('current-row');
							currentRow = e.rowElement;
							currentRow.addClass('current-row');

							//--- Запоминаем для двойного клика выбранную строку ---

							Liferay.fire(
								'clickIvent', {
									receiverPortletId: 'liferaygridportlet_WAR_liferaygridportlet_INSTANCE_5Isg99zyFBue',
									ivent: 'click',
									data: JSON.stringify(e.data)
								}
							);
						}
						else {
							//--- Запоминаем для двойного клика выбранную строку ---
							selectedRowIndex = -1;
						}
					},
					//--- Выбор атрибута ---
					onCellClick: function (e) {
						//--- Событие ---
						//iDataView.onAttributeSelect(e.rowIndex, e.column.dataField);
					},
					//--- Выделение строк ---
					onSelectionChanged: function (e) {
						var rowIndexes = [],
							selectedData = e.selectedRowsData,
							data = $scope.data,
							dataRow,
							i,
							q;

						for (i = data.length; i--;) {
							dataRow = data[i];
							for (q = selectedData.length; q--;) {
								if (selectedData[q] === dataRow) {
									rowIndexes.push(i);
									selectedData.splice(q, 1);
									break;
								}
							}
							if (selectedData.length === 0) {
								break;
							}
						}

						//--- Событие ---
						//iDataView.onSelectRows(rowIndexes);
					},
					//--- Таблица проинициализирована ---
					onInitialized: function (e) {
						table = e.component;
						$scope.data = initialData || [];
					}
				});

				//--- Строка выбрана для редактирования ---
				element.on('dxdblclick', function () {
					//--- Снимаем выделение по умолчанию ---
					if (window.getSelection) {
						window.getSelection().removeAllRanges();
					} else { // старый IE
						document.selection.empty();
					}
					//--- Событие ---
					//iDataView.onRowSelect(selectedRowIndex);
				});

				//--- Запрос настроек таблицы ---
				var portletId = element.parents('section.portlet').attr('id'),
					userId = parseInt(Liferay.ThemeDisplay.getUserId()),
					plId = parseInt(Liferay.ThemeDisplay.getPlid());

				var refreshGridConfig = function (param) {
					//--- Запрос настроек таблицы ---
					var portletId = element.parents('section.portlet').attr('id'),
						userId = parseInt(Liferay.ThemeDisplay.getUserId()),
						plId = parseInt(Liferay.ThemeDisplay.getPlid());

					gridConfig(
						portletId,
						userId,
						plId,
						function (response) {
							var gridOptions = response.data.dxDataGrid,
								dataSetName = response.data.dataSource.name,
								dataUrl = hostPath + 'delegate/GridServices/gridData';
							table.option(gridOptions);
							table.repaint();

							//--- Запрос данных таблицы ---
							gridData(
								dataUrl,
								dataSetName,
								userId,
								param,
								function (response) {
									table.option('dataSource', response.data);
									table.refresh();
								},
								function (response) {
									console.error('Ошибка при получении данных');
								}
							);
						},
						function (response) {
							console.error('Ошибка при получении настроек таблицы');
						}
					);
				};

				//Initial config
				refreshGridConfig('{}');

				Liferay.on('clickIvent', function (event) {
					// var portletId = element.parents('section.portlet').attr('id')
					// alert(event.receiverPortletId + '   ' + new String(portletId).valueOf());
					if ("portlet_" + event.receiverPortletId == new String(portletId).valueOf()) {
						// alert(event.data);
						refreshGridConfig(event.data);
					}

				});
			}]
		});
})();