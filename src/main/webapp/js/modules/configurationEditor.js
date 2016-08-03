(function(){
    var //--- Настройки ---
        settings= {
            treeView: {
                dataStructure: 'plain',
                displayExpr: 'name'
            },
            form:{
                "components":
                {
                    "dxForm":{
                        "component":"dxForm",
                        "componentType":"dxForm",
                        "options":{
                            "colCount":1,
                            "items":[
                                {"itemType":"tabbed", "tabPanelOptions":{"deferRendering":false},
                                    "tabs":[
                                    {
                                        "title":"Общая информация",
                                        "colCount":2,
                                        "items":[
                                            {
                                                "colSpan":2,
                                                "dataField":"dxToolbar",
                                                "editorType":"dxToolbar",
                                                "visibleIndex":10,
                                                "editorOptions":{
                                                    "items":[
                                                        {"widget":"dxButton", "options":{"icon":"refresh"}, "location":"before", "locateInMenu":"auto"},
                                                        {"widget":"dxButton", "options":{"icon":"plus"}, "location":"before", "locateInMenu":"auto"},
                                                        {"widget":"dxButton", "options":{"icon":"save"}, "location":"before", "locateInMenu":"auto"},
                                                        {"widget":"dxButton", "options":{"icon":"print"}, "location":"before", "locateInMenu":"auto"}
                                                    ],
                                                    "visible":true
                                                }
                                            },
                                            {"label":{"text":"Версия", "location":"left", "alignment":"right"}, "width":100, "visible":true, "dataField":"numversion", "editorType":"dxTextBox", "visibleIndex":10000},
                                            {"label":{"text":"Состояние", "location":"left", "alignment":"right"}, "dataField":"state_id", "editorType":"dxSelectBox", "editorOptions":{"valueExpr":"id", "displayExpr":"name"}},
                                            {"label":{"text":"Сокр.", "location":"left", "alignment":"right"}, "width":60, "visible":true, "dataField":"short", "editorType":"dxTextBox", "visibleIndex":300},
                                            {"label":{"text":"Название", "location":"left", "alignment":"right"}, "width":228, "colSpan":2, "visible":true, "dataField":"name", "editorType":"dxTextBox", "visibleIndex":100},
                                            {"label":{"text":"Код", "location":"left", "alignment":"right"}, "width":100, "visible":true, "dataField":"code", "editorType":"dxTextBox", "visibleIndex":400},
                                            {"label":{"text":"Описание", "location":"left", "alignment":"right"}, "colSpan":2, "visible":true, "dataField":"comments", "editorType":"dxTextArea", "visibleIndex":400, "editorOptions":{"height":120}}
                                        ]
                                    },
                                    {"title":"История", "colCount":2, "items":[
                                        {"label":{"text":"Дата создания", "location":"left", "alignment":"right"}, "width":140, "visible":true, "dataField":"createdate", "editorType":"dxTextBox", "visibleIndex":1000},
                                        {"label":{"text":"Создатель", "location":"left", "alignment":"right"}, "width":100, "visible":true, "dataField":"creator", "editorType":"dxTextBox", "visibleIndex":1000},
                                        {"label":{"text":"Дата редактирования", "location":"left", "alignment":"right"}, "width":140, "visible":true, "dataField":"modifydate", "editorType":"dxTextBox", "visibleIndex":1100},
                                        {"label":{"text":"Редактор", "location":"left", "alignment":"right"}, "width":100, "visible":true, "dataField":"modifier", "editorType":"dxTextBox", "visibleIndex":1100},
                                        {"label":{"visible":false}, "colSpan":2, "dataField":"grHistory", "editorType":"dxDataGrid", "editorOptions":{ "columns":[
                                            {"label":{"text":"Дата версии", "location":"left", "alignment":"right"}, "width":140, "visible":true, "dataField":"versiondate", "editorType":"dxTextBox", "visibleIndex":1100},
                                            {"label":{"text":"Редактор", "location":"left", "alignment":"right"}, "width":100, "visible":true, "dataField":"historymodifier_name", "editorType":"dxTextBox", "visibleIndex":1100},
                                            {"width":100, "caption":"Версия возврата", "visible":false, "dataType":"string", "dataField":"numversion_revert", "visibleIndex":101},
                                            {"width":100, "caption":"Версия", "visible":false, "dataType":"string", "dataField":"numversion", "visibleIndex":101},
                                            {"width":100, "caption":"Состояние", "visible":true, "dataType":"string", "dataField":"historystate", "visibleIndex":600}
                                        ], "pager":{"showInfo":true, "allowedPageSizes":[5, 10, 20], "showPageSizeSelector":true}, "export":{"enabled":true, "fileName":"Данные ГРАДИС", "allowExportSelectedData":true}, "paging":{"pageSize":10}, "editing":{"mode":"form", "allowUpdating":true}, "sorting":{"mode":"multiple"}, "filterRow":{"visible":true, "applyFilter":"auto"}, "selection":{"mode":"multiple"}, "groupPanel":{"visible":false}, "searchPanel":{"width":240, "visible":false, "placeholder":"Поиск..."}, "columnFixing":{"enabled":true}, "stateStoring":{"type":"localStorage", "enabled":true, "storageKey":"grCategory"}, "columnChooser":{"enabled":true}, "allowColumnResizing":true, "allowColumnReordering":true, "rowAlternationEnabled":true}}
                                    ]}
                                ]},
                {"label":{"text":"ID", "location":"left", "alignment":"right"}, "width":60, "visible":false, "dataField":"id", "editorType":"dxTextBox", "visibleIndex":100}
            ]}}}, "eventAction":[
                {"eventPortlet":"portlet_liferaygridportlet_WAR_liferaygridportlet_INSTANCE_5Isg99zyFBue", "eventPlid":"20185", "eventParentComponent":"Таблица", "eventParentComponentType":"dxDataGrid", "eventComponentId":"4443", "eventComponent":"Таблица", "eventComponentType":"dxDataGrid", "eventName":"onRowClick", "actions":[
                    {"actionPortlet":"portlet_liferayformportlet_WAR_liferayformportlet_INSTANCE_Xye0o3VNaowV", "actionPlid":"25043", "actionParentComponent":"Карточка Категория", "actionParentComponentType":"dxForm", "actionComponentId":"5", "actionComponent":"Карточка Категория", "actionComponentType":"dxForm", "actionName":"refreshData", "parameters":[
                        {"inputName":"name", "outputName":"i_name"},
                        {"inputName":"id", "outputName":"i_id"}
                    ]}
                ]}
            ], "dataSource":[
                {"component":"dxForm", "componentType":"dxForm", "componentId":"5201", "parentComponent":"dxForm", "parentComponentType":"dxForm", "dataSource":"dsCategory"},
                {"component":"grHistory", "componentType":"dxDataGrid", "componentId":"5221", "parentComponent":"itHistory", "parentComponentType":"iTab", "dataSource":"dsHistory"},
                {"component":"state_id", "componentType":"dxSelectBox", "componentId":"5220", "parentComponent":"itInfo", "parentComponentType":"iTab", "dataSource":"dsState"}
            ]}
        },
        extend = angular.extend;

    var hostPath = window.location.protocol + '//' + window.location.host + '/';
    angular.module('configurationEditor', ['dx'])
        .component('grСonfigurationEditor', {
            transclude: false,
            templateUrl: hostPath + 'liferay-grid-portlet/html/configurationEditor.html',
            bindings:{
                configuration: '<'
            },
            controller:['$scope', function ($scope) {
                var treeView;

                //--- Контекст ---
                extend($scope, {
                    settings: settings
                });

                //--- Настройки иерархического дерева ---
                extend(settings.treeView, {
                    /*bindingOptions: {
                        items: 'items'
                    }, */
                    onInitialized: function (e) {
                        treeView = e.component;
                    }
                });

                //--- Инициализация ---
                this.$onInit = function() {
                    treeView.option('items', this.configuration);
                };
            }]
        });
}
)();