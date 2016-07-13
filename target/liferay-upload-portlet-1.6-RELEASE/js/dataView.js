(function(){
    var //--- Настройки ---
        settings = {
            table: {
                //--- Столбцы для показа ---
                columns: [
                    {
                        dataField: 'group_name',
                        caption: '',
                        visible: false,
                        groupIndex: 0,
                        sortOrder: 'desc',
                        groupCellTemplate: function(cellElement, cellInfo){
                            $('<span>').html(cellInfo.text).appendTo(cellElement);
                        }
                    },
                    {
                        dataField: 'count_parcel',
                        caption: 'Кол-во ЗУ',
                        width: 116
                    },
                    {
                        dataField: 'reason',
                        caption: 'Причина'
                    },
                    {
                        dataField: 'sum_tax',
                        caption: 'Сумма налога, руб.',
                        width: 163,
                        sortOrder: 'desc',
                        customizeText: function(cellInfo){
                            var value = +cellInfo.value;

                            return value === 0 ? '' : accounting.formatNumber(value, 2, " ", ",")
                        }
                    },
                    {
                        dataField: 'error_id',
                        caption: 'Цвет',
                        width: 110,
                        cellTemplate: function(cellElement, cellInfo){
                            cellElement.addClass('gisColor');

                            $('<span></span>')
                                .attr('style', 'background-color: ' +
                                (colors[+cellInfo.value] === undefined ? 'transparent' : colors[+cellInfo.value]))
                                .appendTo(cellElement);
                        }
                    }
                ],
                /*columns:[
                    {
                        dataField: 'cblock_name',
                        caption: 'Кад. квартал',
                        width: 106
                    },
                    {
                        dataField: 'count_parcel',
                        caption: 'Кол-во ЗУ'
                    },
                    {
                        dataField: 'sum_cost',
                        caption: 'Сумма КС',
                        width: 110,
                        customizeText: function(cellInfo){
                            return accounting.formatNumber(+cellInfo.value, 2, " ", ",")
                        }
                    },
                    {
                        dataField: 'sum_area',
                        caption: 'Площадь ЗУ'
                    },
                    {
                        dataField: 'count_cost0',
                        caption: 'Кол-во ЗУ КС=0'
                    },
                    {
                        dataField: 'sum_area_cost0',
                        caption: 'Пл. ЗУ КС=0'
                    },
                    {
                        dataField: 'count_category0',
                        caption: 'Кол-во ЗУ категория=не установлена'
                    },
                    {
                        dataField: 'sum_area_category0',
                        caption: 'Пл. ЗУ категория=не установлена'
                    },
                    {
                        dataField: 'count_area0',
                        caption: 'Кол-во ЗУ площадь=0'
                    },
                    {
                        dataField: 'count_contour0',
                        caption: 'Кол-во ЗУ без межевания'
                    },
                    {
                        dataField: 'sum_area_contour0',
                        caption: 'Пл. ЗУ без межевания'
                    },
                    {
                        dataField: 'count_use_not_correct',
                        caption: 'Кол-во ЗУ с некорректным РВИ'
                    },
                    {
                        dataField: 'sum_area_use_not_correct',
                        caption: 'Пл. ЗУ с некорректным РВИ'
                    },
                    {
                        dataField: 'count_use0',
                        caption: 'Кол-во ЗУ с неустановленным РВИ'
                    },
                    {
                        dataField: 'sum_area_use0',
                        caption: 'Пл. ЗУ с неустановленным РВИ'
                    },
                    {
                        dataField: 'error_id',
                        caption: 'Цвет',
                        width: 110,
                        cellTemplate: function(cellElement, cellInfo){
                            cellElement.addClass('gisColor');

                            $('<span></span>')
                                .attr('style', 'background-color: ' +
                                (colors[+cellInfo.value] === undefined ? 'red' : colors[+cellInfo.value]))
                                .appendTo(cellElement);
                        }
                    }
                ],  */
                /*
                 v_cblock_name text;    --Кад. квартал
                 v_count_parcel bigint; --Кол-во ЗУ
                 v_sum_cost double PRECISION; --Сумма КС
                 v_sum_area  double PRECISION; --Площадь ЗУ
                 v_count_cost0 bigint;         --Кол-во ЗУ КС=0
                 v_sum_area_cost0  double PRECISION; --Пл. ЗУ КС=0
                 v_count_category0 bigint;           --Кол-во ЗУ категория=не установлена
                 v_sum_area_category0  double PRECISION; --Пл. ЗУ категория=не установлена
                 v_count_area0 bigint; --Кол-во ЗУ площадь=0
                 v_count_contour0 bigint; --Кол-во ЗУ без межевания
                 v_sum_area_contour0  double PRECISION; --Пл. ЗУ без межевания
                 v_count_use_not_correct bigint; --Кол-во ЗУ с не корректным РВИ
                 v_sum_area_use_not_correct  double PRECISION; --Пл. ЗУ с не корректным РВИ
                 v_count_use0 bigint;             --Кол-во ЗУ с не установленным РВИ
                 v_sum_area_use0 double PRECISION; --Пл. ЗУ с не установленным РВИ                * */

                //--- Сортировка ---
                sorting:{
                    mode:"single", // 'none' | 'single' | 'multiple'
                    ascendingText:'По возрастанию',
                    descendingText:'По убыванию',
                    clearText:'Отменить сортировку'
                },

                //--- Поиск ---
                searchPanel:{
                    visible:false,
                    width:240,
                    placeholder:"Найти...",
                    highlightSearchText:true
                },

                //--- Фильтр ---
                filterRow:{
                    visible:false,
                    applyFilter:'auto', // 'auto' | 'onClick'
                    resetOperationText:'Отменить фильтр',
                    operationDescriptions:{
                        '=':'Равно',
                        '<>':'Не равно',
                        '<':'Меньше',
                        '<=':'Меньше или равно',
                        '>':'Больше than',
                        '>=':'Больше или равно',
                        'startswith':'Начинается',
                        'contains':'Содержит',
                        'notcontains':'Не содержит',
                        'endswith':'Заканчивается',
                        'between':'Диапазон'
                    },
                    betweenStartText:'От',
                    betweenEndText:'До'
                },

                //--- Редактирование ---
                /*editing:{
                 mode:"form", //'row' | 'batch' | 'cell' | 'form'
                 allowAdding:true,
                 allowUpdating:false,
                 allowDeleting:false,
                 texts:{
                 addRow:'Добавить',
                 editRow:'Изменить',
                 deleteRow:'Удалить',
                 saveRowChanges:'Сохранить',
                 cancelRowChanges:'Отменить'
                 }
                 },*/

                //--- Выделение строк ---
                selection:{
                    mode:'none', //'none' | 'single' | 'multiple'
                    showCheckBoxesMode:'always'//'onClick' | 'onLongTap' | 'always' | 'none'
                },

                //--- Группировка по столбцам ---
                grouping:{
                    autoExpandAll:true,
                    groupContinuedMessage:'Начало на предыдущей странице',
                    groupContinuesMessage:'Продолжение на следующей странице'
                },
                /*groupPanel:{
                    visible:true,
                    emptyPanelText:'Для группировки по столбцу перетащите сюда его заголовок'
                },*/

                //--- Страницы ---
                scrolling:{
                    mode:'standard' // 'standard' || 'virtual' || 'infinite'
                },
                paging:{
                    //--- Постраничная загрузка данных ---
                    enabled:true,
                    pageSize:10,
                    pageIndex:0
                },
                pager:{
                    //--- Размер страницы ---
                    showPageSizeSelector:true,
                    allowedPageSizes:[5, 10, 20],

                    //--- Подпись ---
                    showInfo:true,
                    infoText:'Страница {0} из {1} ({2} записей)',

                    //--- Перемещение "Вперед" и "Назад" ---
                    showNavigationButtons:true
                },

                //--- Экспорт ---
                'export':{
                    enabled:false,
                    allowExportSelectedData:true,
                    excelFilterEnabled:true,
                    excelWrapTextEnabled:true,
                    fileName:'Данные',
                    texts:{
                        excelFormat:'Excel',
                        exportTo:'Экспорт в',
                        exportToExcel:'Экспорт в Excel',
                        selectedRows:'Выделенные строки'
                    }
                },

                //--- Оформление ---
                showBorders:true, //Рамка таблицы
                rowAlternationEnabled:false, //Подсветка строк

                //--- Столбцы ---
                //columns:["CompanyName", "City", "State", "Phone", "Fax"]
                allowColumnReordering:true,
                allowColumnResizing:true,
                columnChooser:{
                    enabled:false,
                    title:'Удаленные столбцы',
                    emptyPanelText:'Для удаления столбца из таблицы перетащите сюда его заголовок'
                }
            }
        },
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
        setDataToTable = function(table, data){
            table.option('dataSource', data);
            table.refresh();
        };

    angular.module('dataView', [])
        .component('grDataView', {
            transclude: false,
            templateUrl:'liferay-upload-portlet/html/dataView.html',
            require: {
                interfaceConnector: '^grInterfaceConnector'
            },
            controller:['$scope', '$element', function ($scope, element) {
                var table,
                    selectedRowIndex = -1,
                    currentRow,
                    iDataView;

                //--- Контекст ---
                extend($scope, {
                    settings: settings,
                    data: []
                });

                //--- Настройки таблицы ---
                extend(settings.table, {
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
                        iDataView.onAttributeSelect(e.rowIndex, e.column.dataField);
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
                        iDataView.onSelectRows(rowIndexes);
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
                    iDataView.onRowSelect(selectedRowIndex);
                });

                //--- Инициализация интерфейсов ---
                this.$onInit = function() {
                    var interfaceConnector = this.interfaceConnector;

                    //--- Представление данных ---
                    iDataView = interfaceConnector.exportInterface('iDataView',
                        {
                            //--- Передать данные ---
                            setData: function(importData){
                                $scope.$$destroyed ? (initialData = importData) : (initialData = $scope.data = importData);
                            },
                            //--- Выделены строки данных ---
                            onSelectRows: function(rowIndexes){},
                            //--- Показать выбранную строку в форме ---
                            onRowSelect: function(rowIndex){},
                            //--- Выбран атрибут ---
                            onAttributeSelect: function(rowIndex, attributeName){}
                        }
                    );
                };
            }]
        });
}
)();