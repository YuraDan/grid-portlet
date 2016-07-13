(function () {
	var //--- Настройки ---
		settings = {
			detailInfo: {
				icon: 'chevronnext',
				text: 'Узнать подробнее'
			},
			analyseProgress: {
				showStatus: true,
				statusFormat: function (ratio, value) {
					var percent = Math.ceil(ratio * 100);

					if (percent > 100) {
						percent = 100;
					}

					return percent + '%' +
						(percent < 10 ? '  ' : (percent < 100 ? ' ' : ''));
				}
			},
			order: {
				text: 'Узнать, как рассчитано'
			}
		},
		extend = angular.extend,
		registrationFormData = [
			{
				field: 'name',
				label: 'ФИО'
			},
			{
				field: 'organization',
				label: 'Организация'
			},
			{
				field: 'email',
				label: 'Электронная почта'
			},
			{
				field: 'telephone',
				label: 'Телефон'
			},
			{
				field: 'pageId',
				value: -1
			}
		],
		scrollIntoView = function (selector, $scope, scopeExpression) {
			$scope.$watch(scopeExpression, function (newValue, oldValue) {
				newValue && setTimeout(function () {
					var node = $(selector).get(0);

					node && node.scrollIntoView();
				}, 100);
			});
		};
	

	angular.module('analyzerXml', ['uploadFile', 'dataView', 'frame', 'chart', 'dataForm'])
	//--- Получение URL карты ---
		.factory('geoserverLayerView', ['$resource', function ($resource) {
			var url = 'delegate/services/geoserverLayerView/';

			return $resource(url, {}, {}, {cancellable: true});
		}])
		//--- Сохранение регистрационных данных ---
		.factory('registration', ['$http', function ($http) {
			var url = 'delegate/services/registration';

			return function (formData, successCallback, failCallback) {
				$http.get(url, {
					params: formData
				}).then(successCallback, failCallback || angular.noop);
			}
		}])
		.component('grAnalyzerXml', {
			transclude: false,
			templateUrl: 'liferay-upload-portlet/html/analyzerXml.html',
			require: {
				interfaceConnector: '^grInterfaceConnector'
			},
			controller: ['$scope', '$element', 'geoserverLayerView', 'registration',
				function ($scope, $element, geoserverLayerView, registration) {
					var iDataView,
						iFileUpload,
						iFrame,
						iDataChart,
						iDataForm,
						pageId = -1;

					//--- Контекст ---
					extend($scope, {
						settings: settings,
						messageArray: [],
						isExistData: false,
						isShowData: false,
						isView: false,
						registeredData: null,
						isAnalyseProgress: false,
						isShowForm: false,
						showVisibility: function (isVisible) {
							return isVisible ? '' : 'gradisHide';
						},
						uploadRatio: 0,
						errorMessage: '',
						isOrdered: false
					});
					scrollIntoView('.registrationBlock', $scope, 'isShowData && isShowForm && registeredData === null');
					scrollIntoView('#detailInfo', $scope, 'isView && isShowData && isExistData && registeredData !== null');

					//--- Настройка кнопки "Подробная информация"---
					extend(settings.detailInfo, {
						bindingOptions: {
							icon: 'isShowData && "chevrondown" || "chevronnext"',
							visible: 'isExistData'
						},
						onClick: function (e) {
							$scope.isShowData = !$scope.isShowData;

							//--- Пользователь не зарегистрирован ---
							if ($scope.registeredData === null && $scope.isShowData) {
								//--- Регистрация ---
								registrationFormData && (iDataForm.setData(registrationFormData) || (registrationFormData = null));
								$scope.errorMessage = '';
								$scope.isShowForm = true;
							}
						}
					});

					//--- Настройка кнопки "Заказать"---
					extend(settings.order, {
						onClick: function (e) {
							if (pageId < 0) {
								return;
							}

							$scope.registeredData.pageId = pageId;
							$scope.registeredData.isHot = true;

							//--- Регистрация КПТ-файла ---
							registration(
								$scope.registeredData,
								//--- Успешная регистрация ---
								function (response) {
									$scope.isOrdered = true;
								},
								function (response) {
									console.error('Ошибка при заказе');
								}
							);
						}
					});

					//--- Настройка индикатора загрузки ---
					extend(settings.analyseProgress, {
						min: 0,
						max: 1,
						bindingOptions: {
							value: 'uploadRatio'
						}
					});

					//--- Инициализация интерфейсов ---
					this.$onInit = function () {
						var interfaceConnector = this.interfaceConnector,
							url = 'delegate/services/upload/',
							factor = 0.00003,
							timer = null,
							setCurrentStatus = function (ratio) {
								$scope.uploadRatio = ratio;
							},
							clearTimer = function () {
								if (timer !== null) {
									clearTimeout(timer);
									timer = null;
								}
							},
							resourceObject = null;

						//--- Представление данных ---
						iDataView = interfaceConnector.importInterface('iDataView', {
							//--- Передать данные ---
							setData: angular.noop,

							//--- Выделены строки данных ---
							onSelectRows: function (rowIndexes) {
							},
							//--- Выбрана строка данных ---
							onRowSelect: function (rowIndex) {
							},
							//--- Выбран атрибут ---
							onAttributeSelect: function (rowIndex, attributeName) {
							},
							//--- Интерфейс подключен ---
							onInterfaceConnected: function () {
							}
						});

						//--- Загрузка файлов на сервер ---
						iFileUpload = interfaceConnector.importInterface('iFileUpload', {
							//--- Установить URL для загрузки ---
							setUrl: angular.noop,

							//--- Начало загрузки ---
							onStart: function () {
								$scope.messageArray = [];

								$scope.isExistData = false;
								$scope.isView = false;
								$scope.isAnalyseProgress = false;
								$scope.isShowForm = false;
								$scope.registeredData === null && ($scope.isShowData = false);

								$scope.isOrdered = false;

								setCurrentStatus(0);

								//iDataView.setData([]);
							},
							//--- Завершение загрузки всех файлов ---
							onFinish: function () {
							},
							//--- Файл загружается ---
							onProgress: function (fileInfo, ratio) {
								if (ratio === 1) {
									clearTimer();
									$scope.isAnalyseProgress = true;
									timer = setTimeout(
										function run() {
											var ratio = $scope.uploadRatio,
												ingibitor = 1;

											if (ratio >= 0.80) {
												//ingibitor = 50;
											}
											ratio += 1 / (factor * ingibitor * fileInfo.size);

											if (ratio >= 0.90) {
												ratio = 0.90;
												clearTimer();
											}
											else {
												timer = setTimeout(run, 100);
											}

											$scope.$apply(function () {
												setCurrentStatus(ratio);
											});
										},
										100);
								}
							},
							//--- Файл загружен и проанализирован ---
							onUploaded: function (fileInfo, response, isSuccess) {
								var message = response.message || '',
									dataSet = isSuccess ? (response.data || []) : [],
									viewName = isSuccess ? (response.viewname || null) : null,
									dataChart = isSuccess ? (response.datachart || []) : [];

								$scope.isAnalyseProgress = false;
								clearTimer();

								//--- Идентификатор КПТ-файла ---
								pageId = isSuccess ? (response.page_id || -1) : -1;

								//--- Сообщение ---
								$scope.messageArray.push(message);

								//--- Просмотр данных ---
								$scope.isExistData = dataSet.length !== 0;
								iDataView.setData(dataSet);

								//--- Диаграмма ---
								iDataChart.setData(dataChart);

								//--- Просмотр слоя ---
								$scope.isView = false;
								iFrame.set({});
								if (viewName !== null) {
									//--- Отмена предыдущего запроса ---
									if (resourceObject !== null) {
										resourceObject.$cancelRequest();
									}

									//--- Запрос ---
									resourceObject = geoserverLayerView.get(
										{
											name: viewName,
											width: 1000
										},
										function (e) {
											$scope.isView = true;
										}
									);

									iFrame.set(resourceObject);
								}

								//--- Зарегистрированный КПТ-файл ---
								//--- Зарегистрированный пользователь ---
								if (pageId >= 0 && $scope.registeredData !== null) {
									//--- Идентификатор КПТ-файла ---
									$scope.registeredData.pageId = pageId;

									//--- Регистрация КПТ-файла ---
									registration(
										$scope.registeredData,
										//--- Успешная регистрация ---
										function (response) {
										},
										function (response) {
											console.error('Ошибка при регистрации КПТ-файла');
										}
									);
								}

							},
							//--- Интерфейс подключен ---
							onInterfaceConnected: function () {
								//--- Установить URL для загрузки ---
								iFileUpload.setUrl(url);
							}
						});

						//--- Просмотр слоя ---
						iFrame = interfaceConnector.importInterface('iFrame', {
							set: angular.noop,
							refresh: angular.noop
						});

						//--- Диаграмма ---
						iDataChart = interfaceConnector.importInterface('iDataChart', {
							//--- Передать данные ---
							setData: angular.noop
						});

						//--- Форма регистрации ---
						iDataForm = interfaceConnector.importInterface('iDataForm', {
							//--- Передать данные ---
							setData: angular.noop,
							//--- Сохранение данных из формы ---
							onSave: function (data) {
								$scope.errorMessage = '';

								//--- Идентификатор КПТ-файла ---
								data.pageId = pageId;

								data.isHot = false;

								registration(
									data,
									function (e) {
										//--- Идентификатор клиента --
										data.clientId = e.data.client_id;

										$scope.registeredData = data;
										$scope.isShowForm = false;
									},
									function (e) {
										$scope.errorMessage = e.data.message;
									}
								);
							},
							//--- Отмена ---
							onCancel: function (data) {
								$scope.isShowForm = false;
								$scope.isShowData = false;
							}
						});

					};
				}]
		});
})();