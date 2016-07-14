(function(){
    var colors = [
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
        setDataToTable = function(table, data){
            table.option('dataSource', data);
            table.refresh();
        };

    angular.module('dataView', [])
        .factory('gridConfig', ['$http', function($http){
            return function(componentId, successCallback, failCallback){
                $http.get('delegate/services/gridConfig/', { params: {componentId: componentId}}).then(successCallback, failCallback || angular.noop);
            }
        }])
        .factory('gridData', ['$http', function($http){
            return function(url, dataSetName, successCallback, failCallback){
                $http.get(url, { params: {dataSetName: dataSetName} }).then(successCallback, failCallback || angular.noop);
            }
        }])
        .component('grDataView', {
            transclude: false,
            templateUrl: 'liferay-upload-portlet/html/dataView.html',
            controller:['$scope', '$element', 'gridConfig', 'gridData', function ($scope, element, gridConfig, gridData) {
                var table,
                    selectedRowIndex = -1,
                    currentRow,
                    iDataView;

                //--- Контекст ---
                extend($scope, {
                    settings: { table: {} },
                    data: []
                });

                //--- Настройки таблицы ---
                extend($scope.settings.table, {
                    bindingOptions: {
                        dataSource: 'data'
                    },
                    //--- Выбор строки ---
                    onRowClick: function (e) {
                        if (e.rowType === 'data'){
                            //--- Выделение строки ---
                            currentRow && currentRow.removeClass('current-row');
                            currentRow = e.rowElement;
                            currentRow.addClass('current-row');

                            //--- Запоминаем для двойного клика выбранную строку ---
                            selectedRowIndex = e.rowIndex;
                        }
                        else{
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

                        for(i = data.length; i--; ){
                            dataRow = data[i];
                            for(q = selectedData.length; q--; ){
                                if (selectedData[q] === dataRow){
                                    rowIndexes.push(i);
                                    selectedData.splice(q, 1);
                                    break;
                                }
                            }
                            if (selectedData.length === 0){
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
                element.on('dxdblclick', function(){
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
                gridConfig(
                    1, //componentId - идентификатор компонента для которого запрашиваются настройки
                    function(response){
                        var gridOptions = response.data.dxDataGrid,
                            dataSetName = response.data.dataSource.name,
                            dataUrl = 'delegate/services/gridData';
                        table.option(gridOptions);
                        table.repaint();

                        //--- Запрос данных таблицы ---
                        gridData(
                            dataUrl,
                            dataSetName,
                            function(response){
                                table.option('dataSource', response.data);
                                table.refresh();
                            },
                            function(response){
                    	        console.error('Ошибка при получении данных');
                            }
                        );
                    },
                    function(response){
                    	console.error('Ошибка при получении настроек таблицы');
                    }
                );
            }]
        });
}
)();