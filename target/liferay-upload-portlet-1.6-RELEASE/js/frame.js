(function () {
    var //--- Настройки ---
        settings = {},
        extend = angular.extend,
        onResize = function(e){
            var element = e.data.element;

            element.css('height', (element.get(0).clientWidth * 0.53) + 'px');
        };

    angular.module('frame', [])
        .filter('resourceUrl', ['$sce', function($sce){
            return function(url){
                return $sce.trustAsResourceUrl(url);
            };
        }])
        .filter('layerExtent', function(){
            return function(params){
                var bbox = params.bbox;

                if (bbox === undefined){
                    return params.url;
                }
                bbox = angular.fromJson(bbox);

                if (bbox.maxx - bbox.minx <= 0 || bbox.maxy - bbox.miny <= 0) {
                    return params.url;
                }

                return params.url +
                    '&bbox=' +
                    (+bbox.minx).toString() + ',' +
                    (+bbox.miny).toString() + ',' +
                    (+bbox.maxx).toString() + ',' +
                    (+bbox.maxy).toString()
            };
        })
        .component('grFrame', {
            transclude: false,
            templateUrl: 'liferay-upload-portlet/html/frame.html',
            require:{
                interfaceConnector: '^grInterfaceConnector'
            },
            controller:['$scope', '$element', function ($scope, $element) {
                //--- Контекст ---
                extend($scope, {
                    settings: settings,
                    params: {}
                });

                this.$postLink = function(){
                    var frame;

                    //--- Фрейм ---
                    if (frame = $element.find('.frame')){

                        onResize({
                            data: {
                                element: $element
                            }
                        });

                        //--- Изменение высоты контейнера при изменении размеров окна ---
                        $(window).on('resize', null, {
                            element: $element
                        }, onResize);
                    }
                };

                //--- Инициализация интерфейсов ---
                this.$onInit = function () {
                    var interfaceConnector = this.interfaceConnector;

                    //--- Отображение страницы во фрейме ---
                    interfaceConnector.exportInterface('iFrame',
                        {
                            //--- Установить URL, width, height для фрейма ---
                            set: function(params){
                                $scope.params = params;
                            },

                            refresh: function(){
                                var params = $scope.params;

                                $scope.params = {};
                                window.setTimeout(
                                    function() {
                                        $scope.params = params;
                                    },
                                    100);
                            }
                        }
                    );
                };
            }]
        });
})();