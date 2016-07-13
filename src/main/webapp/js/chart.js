(function(){
    var //--- Настройки ---
        settings = {
            chart: {
                legend: {
                    orientation: "horizontal",
                    itemTextPosition: "right",
                    horizontalAlignment: "right",
                    verticalAlignment: "bottom",
                    columnCount: 4
                },
                series: [{
                    argumentField: "label",
                    valueField: "value",
                    label: {
                        visible: true,
                        font: {
                            size: 16
                        },
                        connector: {
                            visible: true,
                            width: 0.5
                        },
                        position: "columns",
                        customizeText: function(arg) {
                            return arg.valueText + " (" + arg.percentText + ")";
                        }
                    }
                }]
            }
        },
        extend = angular.extend,
        initialData = [];

    angular.module('chart', ['dx'])
        .component('grChart', {
            transclude: false,
            templateUrl:'chart/chart.html',
            require: {
                interfaceConnector: '^grInterfaceConnector'
            },
            controller:['$scope', function ($scope) {
                var iDataChart;

                //--- Контекст ---
                extend($scope, {
                    settings: settings,
                    data: []
                });

                //--- Настройки диаграммы ---
                extend(settings.chart, {
                    bindingOptions: {
                        dataSource: 'data'
                    }
                });

                //--- Инициализация интерфейсов ---
                this.$onInit = function() {
                    var interfaceConnector = this.interfaceConnector;

                    //--- Представление данных ---
                    iDataChart = interfaceConnector.exportInterface('iDataChart',
                        {
                            //--- Передать данные ---
                            setData: function(importData){
                                $scope.$$destroyed ? (initialData = importData) : (initialData = $scope.data = importData);
                            }
                        }
                    );
                };
            }]
        });
}
)();