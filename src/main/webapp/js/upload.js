(function () {
    /*window.onLoad = function(){
        document.body.addEventListener('dragend', function (evt){
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'none';
        }, false);
    }; */
    angular.module('gradis', ['dx', 'ngResource', 'analyzerXml'])
        //--- Редактирование строки данных ---
        .directive('grInterfaceConnector', function(){
            return {
                priority: 1000,
                restrict: 'A',
                scope: false,
                controllerAs: 'interfaceConnector',
                bindToController: true,
                controller: function() {
                    var interfaceRegister = {
                            importComponents: {},
                            exportComponents: {}
                        },
                        extend = angular.extend,
                        angularNoop = angular.noop,

                        verificationOfCompliance = function(definition, definitionImplementation){
                            var method,
                                isValid = true,
                                methodSet = {},
                                counter = 0;

                            return true;

                            for(method in definition){
                                //--- Реализован несуществующий метод ---
                                if (typeof definition[method] !== 'function'){
                                    methodSet[method] = true;
                                    counter++;
                                }
                            }

                            for(method in definitionImplementation){
                                //--- Реализован несуществующий метод ---
                                if (typeof definitionImplementation[method] !== 'function'){
                                    delete methodSet[method];
                                }
                            }

                            for(method in definitionImplementation){
                                //--- Реализован несуществующий метод ---
                                if (typeof definition[method] !== 'function'){
                                    console.log('Реализован несуществующий метод');
                                    isValid = false;
                                    break;
                                }

                                //--- Переопределена функция обратного вызова ---
                                if (method.indexOf('on') === 0){
                                    console.log('Переопределена функция обратного вызова');
                                    isValid = false;
                                    break;
                                }
                            }

                            return isValid;
                        },
                        connect = function(definition, definitionImplementation){
                            var onInterfaceConnected,
                                method;

                            for(method in definition){
                                if (definition[method] === angularNoop){
                                    definition[method] = definitionImplementation[method] || angularNoop;
                                }
                                else{
                                    definitionImplementation[method] = definition[method];
                                }
                            }

                            //extend(definition, definitionImplementation);

                            //--- Интерфейс реализован ---
                            onInterfaceConnected = definition.onInterfaceConnected;
                            if (onInterfaceConnected !== undefined){
                                onInterfaceConnected();
                                delete definition.onInterfaceConnected;
                            }
                        };

                    return {
                        //--- Публикация интерфейса ---
                        importInterface: function(name, definition){
                            var i,
                                max,
                                importComponents = interfaceRegister.importComponents,
                                publicComponents,
                                exportComponents = interfaceRegister.exportComponents,
                                definitionImplementation;

                            //--- Компоненты, опубликовавшие данный интерфейс ---
                            publicComponents = importComponents[name];
                            if (publicComponents === undefined){
                                publicComponents = importComponents[name] = [];
                            }
                            publicComponents.push(definition);

                            //--- Подключаем первый подходящий реализованный интерфейс ---
                            exportComponents = exportComponents[name] || [];
                            for(i = 0, max = exportComponents.length; i < max; i++){
                                definitionImplementation = exportComponents[i];

                                //--- Проверка на соответствие методов ---
                                if (verificationOfCompliance(definition, definitionImplementation)){
                                    //--- Подключаем интерфейс ---
                                    connect(definition, definitionImplementation);
                                    publicComponents.pop();
                                    break;
                                }
                            }

                            return definition;
                        },
                        //--- Реализация интерфейса ---
                        exportInterface: function(name, definitionImplementation){
                            var i,
                                importComponents = interfaceRegister.importComponents,
                                publicComponents,
                                exportComponents = interfaceRegister.exportComponents,
                                implementationComponents,
                                definition;

                            //--- Компоненты, реализовавшие данный интерфейс ---
                            implementationComponents = exportComponents[name];
                            if (implementationComponents === undefined){
                                implementationComponents = exportComponents[name] = [];
                            }
                            implementationComponents.push(definitionImplementation);

                            //--- Компоненты, опубликовавшие данный интерфейс ---
                            publicComponents = importComponents[name] || [];
                            for(i = publicComponents.length; i--; ){
                                definition = publicComponents[i];
                                //--- Проверка на соответствие методов ---
                                if (verificationOfCompliance(definition, definitionImplementation)){
                                    //--- Подключаем интерфейс ---
                                    connect(definition, definitionImplementation);
                                    publicComponents.splice(i, 1);
                                }
                            }

                            return definitionImplementation;
                        }
                    }
                }
            };
        });
})();
