(function(){
    var //--- Настройки ---
        settings= {
            popup: {
                width: '50%',
                height: 'auto',
                contentTemplate: "info",
                showTitle: true,
                title: "Регистрация",
                dragEnabled: true,
                closeOnOutsideClick: false
            },
            form: {
                colCount: 2,
                showRequiredMark: true,
                showValidationSummary: false
            },
            cancel: {
                text: 'Отменить'
            },
            save: {
                //text: 'Сохранить'
                text: 'Зарегистрироваться'
            }
        },
        extend = angular.extend;

    angular.module('dataForm', [])
        .component('grDataForm', {
            transclude: false,
            templateUrl:'liferay-upload-portlet/html/simpleForm.html',
            require: {
                interfaceConnector: '^grInterfaceConnector'
            },
            controller:['$scope', '$element', function ($scope, $element) {
                var iDataForm,
                    form;

                //--- Контекст ---
                extend($scope, {
                    settings: settings,
                    isShownPopup: false,
                    formData: {},
                    items: []
                });

                //--- Настройки ---
                extend(settings.popup, {
                    bindingOptions: {
                        visible: "isShownPopup"
                    },
                    onHidden: function(){
                        $scope.formData = {};
                    }
                });
                extend(settings.form, {
                    bindingOptions: {
                        formData: 'formData',
                        items: 'items'
                    },
                    //--- Таблица проинициализирована ---
                    onInitialized: function (e) {
                        form = e.component;
                    }
                });
                extend(settings.cancel, {
                    onClick: function(e){
                        $scope.isShownPopup = false;
                        iDataForm.onCancel();
                    }
                });
                extend(settings.save, {
                    onClick: function(e){
                        $scope.isShownPopup = false;
                        form.validate().isValid && iDataForm.onSave($scope.formData);
                    }
                });

                //--- Инициализация интерфейсов ---
                this.$onInit = function() {
                    var interfaceConnector = this.interfaceConnector;

                    //--- Редактирование данных ---
                    iDataForm = interfaceConnector.exportInterface('iDataForm',
                        {
                            //--- Передать данные ---
                            setData: function(importData){
                                var i,
                                    max,
                                    record,
                                    formData = {},
                                    items = [],
                                    itemSettings,
                                    email = '',
                                    telephoneMask = '+7(000)000-0000',
                                    telephone = ''/*,
                                    compareEmailAndTelephone = function(){
                                        return email !== '' || telephone !== '';
                                    }*/;

                                for(i = 0, max = importData.length; i < max; i++){
                                    record = importData[i];

                                    //--- Настройки атрибута ---
                                    itemSettings = {
                                        dataField: record.field,
                                        label: {
                                            text: record.label || ''
                                        }
                                    };
                                    switch(record.field){
                                        case 'name':
                                            extend(itemSettings,
                                                {
                                                    editorType: 'dxTextBox',
                                                    validationRules: [
                                                        {
                                                            type: 'required',
                                                            message: ''
                                                        }
                                                    ]
                                                });
                                            itemSettings.editorType = 'dxTextBox';
                                            break;

                                        case 'organization':
                                            itemSettings.editorType = 'dxTextBox';
                                            break;

                                        case 'email':
                                            extend(itemSettings,
                                                {
                                                    editorType: 'dxTextBox',
                                                    editorOptions: {
                                                        mode: 'email'/*,//Для мобильных устройств
                                                        valueChangeEvent: 'keyup',
                                                        onValueChanged: function(e){
                                                            email = e.value;
                                                        }*/
                                                    },
                                                    validationRules: [
                                                        {
                                                            type: 'email',
                                                            message: ''
                                                        },
                                                        {
                                                            type: 'required',
                                                            message: ''
                                                        }
                                                    ]
                                                });

                                            break;

                                        case 'telephone':
                                            extend(itemSettings,
                                                {
                                                    editorType: 'dxTextBox',
                                                    editorOptions: {
                                                        mode: 'tel',//Для мобильных устройств
                                                        //--- Маска ---
                                                        mask: telephoneMask,
                                                        useMaskedValue: true,
                                                        maskInvalidMessage: ''
                                                    },
                                                    validationRules: [
                                                        {
                                                            type: 'required',
                                                            message: ''
                                                        }
                                                    ]
                                                });

                                            break;

                                        case 'pageId':
                                            itemSettings.visible = false;
                                            break;

                                        default:
                                            continue;
                                    }

                                    items.push(itemSettings);

                                    //--- Атрибут и его значение ---
                                    //formData[record.field] = record.value;
                                    record.value !== undefined && (formData[record.field] = record.value);
                                }

                                $scope.formData = formData;
                                $scope.items = items;

                                $scope.isShownPopup = true;
                            },
                            //--- Сохранение данных из формы ---
                            onSave: function(data){},
                            //--- Отмена ---
                            onCancel: function(data){}
                        }
                    );
                };
            }]
        });
}
)();