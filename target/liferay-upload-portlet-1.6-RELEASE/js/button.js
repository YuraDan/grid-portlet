(function () {
    var //--- Настройки ---
        settings= {
            button: {
                icon: 'add',
                hint: 'Добавить'
            },
            command: 'addRow',
            removeRows: {
                icon: 'remove',
                hint: 'Удалить'
            }
        },
        //--- Контекст ---
        scopeInterface = {};

    angular.module('button', [])
        .component('grButton', {
            transclude: false,
            templateUrl: 'liferay-upload-portlet/html/button/button.html',
            bindings:{
                command: '@',
                settings: '@'
            },
            require:{
                interfaceConnector: '^grInterfaceConnector'
            },
            controller:['$scope', function ($scope) {
                var iCommand;

                //--- Контекст ---
                angular.extend($scope, scopeInterface);
                $scope.settings = settings;

                //--- Настройки кнопки ---
                angular.extend(settings.button, {
                    onClick: function(e){
                        iCommand.execute($scope.command);
                    }
                });

                //--- Инициализация интерфейсов ---
                this.$onInit = function () {
                    var interfaceConnector = this.interfaceConnector;

                    //--- Команды ---
                    iCommand = interfaceConnector.importInterface('iCommand',
                        {
                            //--- Выполнить команду ---
                            execute: ['command']
                        }
                    );
                };
            }]
        });
})();