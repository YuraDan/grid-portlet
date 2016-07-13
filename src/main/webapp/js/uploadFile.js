(function () {
	var //--- Настройки ---
		settings = {
			uploader: {
				accept: 'text/xml',
				allowCanceling: false,
				labelText: '',
				multiple: false,
				readyToUploadMessage: 'Готово для загрузки на сервер',
				selectButtonText: 'Выберите файл КПТ или перетащите его сюда',
				uploadButtonText: 'Анализировать',
				uploadedMessage: 'Завершено',
				uploadFailedMessage: 'Ошибка',
				uploadMode: 'instantly'
			},
			showFile: {
				text: 'Показать xml файл в печатном представлении'
			}
		},
		createXmlDocumentForIE = function () {
			if (typeof arguments.callee.activeXString != "string") {
				var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0",
					"MSXML2.DOMDocument"];

				for (var i = 0, len = versions.length; i < len; i++) {
					try {
						var xmldom = new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						return xmldom;
					} catch (ex) {
						//skip
					}
				}
			}

			return new ActiveXObject(arguments.callee.activeXString);
		},
		parseXml = function (xml) {
			var xmldom = null;

			if (window.ActiveXObject !== undefined) {
				xmldom = createXmlDocumentForIE();
				//xmldom.setProperty('ProhibitDTD', false);
				xmldom.loadXML(xml);
				if (xmldom.parseError != 0) {
					//throw new Error("XML parsing error: " + xmldom.parseError.reason);
					console.error('XML parsing error:' + xmldom.parseError.reason);
					return null;
				}
			}
			else if (typeof DOMParser != "undefined") {
				xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
				var errors = xmldom.getElementsByTagName("parsererror");
				if (errors.length) {
					//throw new Error("XML parsing error:" + errors[0].textContent);
					console.error('XML parsing error:' + errors[0].textContent);
					return null;
				}
			}
			else {
				//throw new Error("No XML parser available.");
				console.error('No XML parser available');
				return null;
			}

			return xmldom;
		},
		xsltTransform = function (context, xslt) {
			if (typeof XSLTProcessor != "undefined") {
				var processor = new XSLTProcessor();
				processor.importStylesheet(xslt);

				var result = processor.transformToDocument(context);
				//return (new XMLSerializer()).serializeToString(result);
				return result;

			} else if (typeof context.transformNodeToObject != "undefined") {
				return context.transformNodeToObject(xslt);
			} else {
				//throw new Error("No XSLT processor available.");
				console.error('No XSLT processor available');
				return 'Не удалось применить стиль к КПТ';
			}
		},
		selectSingleNode = function (context, expression, namespaces) {
			var doc = (context.nodeType != 9 ? context.ownerDocument : context);

			if (typeof doc.evaluate != "undefined") {
				var nsresolver = null;
				if (namespaces instanceof Object) {
					nsresolver = function (prefix) {
						return namespaces[prefix];
					};
				}

				var result = doc.evaluate(expression, context, nsresolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				return (result !== null ? result.singleNodeValue : null);

			} else if (typeof context.selectSingleNode != "undefined") {

				//create namespace string
				if (namespaces instanceof Object) {
					var ns = "";
					for (var prefix in namespaces) {
						if (namespaces.hasOwnProperty(prefix)) {
							ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
						}
					}
					doc.setProperty("SelectionNamespaces", ns);
				}
				return context.selectSingleNode(expression);
			} else {
				//throw new Error("No XPath engine found.");
				console.error('No XPath engine found');
				return null;
			}
		},
		selectNodes = function (context, expression, namespaces) {
			var doc = (context.nodeType != 9 ? context.ownerDocument : context);

			if (typeof doc.evaluate != "undefined") {
				var nsresolver = null;
				if (namespaces instanceof Object) {
					nsresolver = function (prefix) {
						return namespaces[prefix];
					};
				}

				var result = doc.evaluate(expression, context, nsresolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var nodes = new Array();

				if (result !== null) {
					for (var i = 0, len = result.snapshotLength; i < len; i++) {
						nodes.push(result.snapshotItem(i));
					}
				}

				return nodes;
			} else if (typeof context.selectNodes != "undefined") {

				//create namespace string
				if (namespaces instanceof Object) {
					var ns = "";
					for (var prefix in namespaces) {
						if (namespaces.hasOwnProperty(prefix)) {
							ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
						}
					}
					doc.setProperty("SelectionNamespaces", ns);
				}
				var result = context.selectNodes(expression);
				var nodes = new Array();

				for (var i = 0, len = result.length; i < len; i++) {
					nodes.push(result[i]);
				}

				return nodes;
			} else {
				//throw new Error("No XPath engine found.");
				console.error('No XPath engine found');
				return [];
			}
		},
		extend = angular.extend,
		getResponse = function (e) {
			var response = e.jQueryEvent.currentTarget.response;

			switch (typeof response) {
				case 'string':
					try {
						response = angular.fromJson(response);
						if (angular.isString(response)) {
							response = {
								message: response
							}
						}
					}
					catch (exception) {
						response = {
							message: 'Ответ в формате отличном от JSON'/*,
							 data: [
							 {
							 "ID":1,
							 "OrderNumber":35703,
							 "OrderDate":"2014/04/10",
							 "SaleAmount":11800,
							 "Terms":"15 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"Los Angeles",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":4,
							 "OrderNumber":35711,
							 "OrderDate":"2014/01/12",
							 "SaleAmount":16050,
							 "Terms":"15 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"San Jose",
							 "Employee":"Jim Packard"
							 },
							 {
							 "ID":5,
							 "OrderNumber":35714,
							 "OrderDate":"2014/01/22",
							 "SaleAmount":14750,
							 "Terms":"15 Days",
							 "CustomerStoreState":"Nevada",
							 "CustomerStoreCity":"Las Vegas",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":7,
							 "OrderNumber":35983,
							 "OrderDate":"2014/02/07",
							 "SaleAmount":3725,
							 "Terms":"15 Days",
							 "CustomerStoreState":"Colorado",
							 "CustomerStoreCity":"Denver",
							 "Employee":"Todd Hoffman"
							 },
							 {
							 "ID":9,
							 "OrderNumber":36987,
							 "OrderDate":"2014/03/11",
							 "SaleAmount":14200,
							 "Terms":"15 Days",
							 "CustomerStoreState":"Utah",
							 "CustomerStoreCity":"Salt Lake City",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":11,
							 "OrderNumber":38466,
							 "OrderDate":"2014/03/01",
							 "SaleAmount":7800,
							 "Terms":"15 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"Los Angeles",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":14,
							 "OrderNumber":39420,
							 "OrderDate":"2014/02/15",
							 "SaleAmount":20500,
							 "Terms":"15 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"San Jose",
							 "Employee":"Jim Packard"
							 },
							 {
							 "ID":15,
							 "OrderNumber":39874,
							 "OrderDate":"2014/02/04",
							 "SaleAmount":9050,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Nevada",
							 "CustomerStoreCity":"Las Vegas",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":18,
							 "OrderNumber":42847,
							 "OrderDate":"2014/02/15",
							 "SaleAmount":20400,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Wyoming",
							 "CustomerStoreCity":"Casper",
							 "Employee":"Todd Hoffman"
							 },
							 {
							 "ID":19,
							 "OrderNumber":43982,
							 "OrderDate":"2014/05/29",
							 "SaleAmount":6050,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Utah",
							 "CustomerStoreCity":"Salt Lake City",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":29,
							 "OrderNumber":56272,
							 "OrderDate":"2014/02/06",
							 "SaleAmount":15850,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Utah",
							 "CustomerStoreCity":"Salt Lake City",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":30,
							 "OrderNumber":57429,
							 "OrderDate":"2014/05/16",
							 "SaleAmount":11050,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Arizona",
							 "CustomerStoreCity":"Phoenix",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":32,
							 "OrderNumber":58292,
							 "OrderDate":"2014/05/13",
							 "SaleAmount":13500,
							 "Terms":"15 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"Los Angeles",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":36,
							 "OrderNumber":62427,
							 "OrderDate":"2014/01/27",
							 "SaleAmount":23500,
							 "Terms":"15 Days",
							 "CustomerStoreState":"Nevada",
							 "CustomerStoreCity":"Las Vegas",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":39,
							 "OrderNumber":65977,
							 "OrderDate":"2014/02/05",
							 "SaleAmount":2550,
							 "Terms":"15 Days",
							 "CustomerStoreState":"Wyoming",
							 "CustomerStoreCity":"Casper",
							 "Employee":"Todd Hoffman"
							 },
							 {
							 "ID":40,
							 "OrderNumber":66947,
							 "OrderDate":"2014/03/23",
							 "SaleAmount":3500,
							 "Terms":"15 Days",
							 "CustomerStoreState":"Utah",
							 "CustomerStoreCity":"Salt Lake City",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":42,
							 "OrderNumber":68428,
							 "OrderDate":"2014/04/10",
							 "SaleAmount":10500,
							 "Terms":"15 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"Los Angeles",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":43,
							 "OrderNumber":69477,
							 "OrderDate":"2014/03/09",
							 "SaleAmount":14200,
							 "Terms":"15 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"Anaheim",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":46,
							 "OrderNumber":72947,
							 "OrderDate":"2014/01/14",
							 "SaleAmount":13350,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Nevada",
							 "CustomerStoreCity":"Las Vegas",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":47,
							 "OrderNumber":73088,
							 "OrderDate":"2014/03/25",
							 "SaleAmount":8600,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Nevada",
							 "CustomerStoreCity":"Reno",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":50,
							 "OrderNumber":76927,
							 "OrderDate":"2014/04/27",
							 "SaleAmount":9800,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Utah",
							 "CustomerStoreCity":"Salt Lake City",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":51,
							 "OrderNumber":77297,
							 "OrderDate":"2014/04/30",
							 "SaleAmount":10850,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Arizona",
							 "CustomerStoreCity":"Phoenix",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":56,
							 "OrderNumber":84744,
							 "OrderDate":"2014/02/10",
							 "SaleAmount":4650,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Nevada",
							 "CustomerStoreCity":"Las Vegas",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":57,
							 "OrderNumber":85028,
							 "OrderDate":"2014/05/17",
							 "SaleAmount":2575,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Nevada",
							 "CustomerStoreCity":"Reno",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":59,
							 "OrderNumber":87297,
							 "OrderDate":"2014/04/21",
							 "SaleAmount":14200,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Wyoming",
							 "CustomerStoreCity":"Casper",
							 "Employee":"Todd Hoffman"
							 },
							 {
							 "ID":60,
							 "OrderNumber":88027,
							 "OrderDate":"2014/02/14",
							 "SaleAmount":13650,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Utah",
							 "CustomerStoreCity":"Salt Lake City",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":65,
							 "OrderNumber":94726,
							 "OrderDate":"2014/05/22",
							 "SaleAmount":20500,
							 "Terms":"15 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"San Jose",
							 "Employee":"Jim Packard"
							 },
							 {
							 "ID":66,
							 "OrderNumber":95266,
							 "OrderDate":"2014/03/10",
							 "SaleAmount":9050,
							 "Terms":"15 Days",
							 "CustomerStoreState":"Nevada",
							 "CustomerStoreCity":"Las Vegas",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":69,
							 "OrderNumber":98477,
							 "OrderDate":"2014/01/01",
							 "SaleAmount":23500,
							 "Terms":"15 Days",
							 "CustomerStoreState":"Wyoming",
							 "CustomerStoreCity":"Casper",
							 "Employee":"Todd Hoffman"
							 },
							 {
							 "ID":70,
							 "OrderNumber":99247,
							 "OrderDate":"2014/02/08",
							 "SaleAmount":2100,
							 "Terms":"15 Days",
							 "CustomerStoreState":"Utah",
							 "CustomerStoreCity":"Salt Lake City",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":78,
							 "OrderNumber":174884,
							 "OrderDate":"2014/04/10",
							 "SaleAmount":7200,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Colorado",
							 "CustomerStoreCity":"Denver",
							 "Employee":"Todd Hoffman"
							 },
							 {
							 "ID":81,
							 "OrderNumber":188877,
							 "OrderDate":"2014/02/11",
							 "SaleAmount":8750,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Arizona",
							 "CustomerStoreCity":"Phoenix",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":82,
							 "OrderNumber":191883,
							 "OrderDate":"2014/02/05",
							 "SaleAmount":9900,
							 "Terms":"30 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"Los Angeles",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":83,
							 "OrderNumber":192474,
							 "OrderDate":"2014/01/21",
							 "SaleAmount":12800,
							 "Terms":"30 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"Anaheim",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":84,
							 "OrderNumber":193847,
							 "OrderDate":"2014/03/21",
							 "SaleAmount":14100,
							 "Terms":"30 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"San Diego",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":85,
							 "OrderNumber":194877,
							 "OrderDate":"2014/03/06",
							 "SaleAmount":4750,
							 "Terms":"30 Days",
							 "CustomerStoreState":"California",
							 "CustomerStoreCity":"San Jose",
							 "Employee":"Jim Packard"
							 },
							 {
							 "ID":86,
							 "OrderNumber":195746,
							 "OrderDate":"2014/05/26",
							 "SaleAmount":9050,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Nevada",
							 "CustomerStoreCity":"Las Vegas",
							 "Employee":"Harv Mudd"
							 },
							 {
							 "ID":87,
							 "OrderNumber":197474,
							 "OrderDate":"2014/03/02",
							 "SaleAmount":6400,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Nevada",
							 "CustomerStoreCity":"Reno",
							 "Employee":"Clark Morgan"
							 },
							 {
							 "ID":88,
							 "OrderNumber":198746,
							 "OrderDate":"2014/05/09",
							 "SaleAmount":15700,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Colorado",
							 "CustomerStoreCity":"Denver",
							 "Employee":"Todd Hoffman"
							 },
							 {
							 "ID":91,
							 "OrderNumber":214222,
							 "OrderDate":"2014/02/08",
							 "SaleAmount":11050,
							 "Terms":"30 Days",
							 "CustomerStoreState":"Arizona",
							 "CustomerStoreCity":"Phoenix",
							 "Employee":"Clark Morgan"
							 }
							 ]*/
						}
					}

					break;
			}

			return response;
		},
	//--- Загрузка КПТ-файла ---
		loadKptFile = function (file, $scope, $http) {
			var reader = new FileReader();

			reader.readAsText(file);
			reader.onload = function () {
				var xmlDocument = parseXml(reader.result);

				if (xmlDocument !== null) {
					onLoadKpt(xmlDocument, $scope, $http);
				}
			};
		},
	//--- Загрузка XSLT ---
		onLoadKpt = function (xmlDocument, $scope, $http) {
			var url = selectSingleNode(xmlDocument, "/processing-instruction('xml-stylesheet')"),
				href;

			if (url === null) {
				return;
			}

			href = url.data.match(/href="(\w+:\/\/\S+)"/i);
			if (href === null || href[1] === undefined) {
				return;
			}

			/*loadAsync('proxy?url=' + href[1], function (xmlDocument) {
			 if (xmlDocument === null){
			 return;
			 }

			 //--- Характеристики КПТ-файла ---
			 createKptDescriptor($scope, xmlDocument, xmlDocument);
			 });*/

			$http({
				method: 'GET',
				url: 'proxy?url=' + href[1],
				responseType: 'document'
			}).then(function (response) {
				/*var xmlDocument = parseXml(response.data);

				 if (xmlDocument === null){
				 return;
				 }  */

				//--- Характеристики КПТ-файла ---
				createKptDescriptor($scope, xmlDocument, response.data);
			}, function (response) {
			});
		},
		newDocument = function (rootTagName, namespaceURL) {
			if (!rootTagName) rootTagName = "";
			if (!namespaceURL) namespaceURL = "";

			if (window.ActiveXObject !== undefined) { // This is the IE way to do it
				// Create an empty document as an ActiveX object
				// If there is no root element, this is all we have to do
				var doc = createXmlDocumentForIE();

				// If there is a root tag, initialize the document
				if (rootTagName) {
					// Look for a namespace prefix
					var prefix = "";
					var tagname = rootTagName;
					var p = rootTagName.indexOf(':');
					if (p != -1) {
						prefix = rootTagName.substring(0, p);
						tagname = rootTagName.substring(p + 1);
					}

					// If we have a namespace, we must have a namespace prefix
					// If we don't have a namespace, we discard any prefix
					if (namespaceURL) {
						if (!prefix) prefix = "a0"; // What Firefox uses
					}
					else prefix = "";

					// Create the root element (with optional namespace) as a
					// string of text
					var text = "<" + (prefix ? (prefix + ":") : "") + tagname +
						(namespaceURL
							? (" xmlns:" + prefix + '="' + namespaceURL + '"')
							: "") +
						"/>";
					// And parse that text into the empty document
					doc.loadXML(text);
				}
				return doc;
			}
			else if (document.implementation && document.implementation.createDocument) {
				// This is the W3C standard way to do it
				return document.implementation.createDocument(namespaceURL,
					rootTagName, null);
			}
		},
		loadAsync = function (url, callback) {
			var xmldoc = newDocument();

			// If we created the XML document using createDocument, use
			// onload to determine when it is loaded
			//if (document.implementation && document.implementation.createDocument) {
			if (xmldoc.onload !== undefined) {
				xmldoc.onload = function () {
					callback(xmldoc);
				};
			}
			// Otherwise, use onreadystatechange as with XMLHttpRequest
			else {
				xmldoc.onreadystatechange = function () {
					if (xmldoc.readyState == 4) callback(xmldoc);
				};
			}

			// Now go start the download and parsing
			xmldoc.load(url);
		},
	//--- Характеристики КПТ-файла ---
		createKptDescriptor = function ($scope, xmlDocument, xsltDocument) {
			$scope.kpt = {
				xml: xmlDocument,
				xslt: xsltDocument
			};
		},
	//--- Применение стиля к КПТ-файлу ---
		applyXslt = function (xmlDocument, xsltDocument) {
			return xsltTransform(xmlDocument, xsltDocument);
		};

	angular.module('uploadFile', ['dx'])
		.component('grUploadFile', {
			transclude: false,
			templateUrl: 'liferay-upload-portlet/html/uploadFile.html',
			require: {
				interfaceConnector: '^grInterfaceConnector'
			},
			controller: ['$scope', '$element', '$http', function ($scope, $element, $http) {
				var iFileUpload,
					fileCount = 0,
					form = null;

				this.$postLink = function () {
					var name,
						formController,
						isObject = angular.isObject;

					if (settings.uploader.uploadMode !== 'useForm') {
						return;
					}

					for (name in $scope) {
						if ($scope.hasOwnProperty(name)) {

							formController = $scope[name];
							if (isObject(formController) &&
								formController.constructor.name === 'FormController') {

								form = $element.find('form[name="' + formController.$name + '"]').get(0) || null;
								break;
							}
						}
					}
				};

				//--- Контекст ---
				extend($scope, {
					settings: settings,
					uploadUrl: '/',
					kpt: null
				});

				//--- Настройка кнопки "Показать" ---
				extend(settings.showFile, {
					bindingOptions: {
						visible: 'kpt !== null'
					},
					onClick: function (e) {
						var win,
							kptDescriptor = $scope.kpt;

						if (kptDescriptor === null) {
							return;
						}

						win = window.open('', 'KPT View' + Math.random());
						win.document.write('');
						win.document.write(applyXslt(kptDescriptor.xml, kptDescriptor.xslt).documentElement.outerHTML);
						win.document.close();
					}
				});

				//--- Настройка загрузчика ---
				extend(settings.uploader, {
					uploadMode: settings.uploader.uploadMode || 'instantly',
					bindingOptions: {
						uploadUrl: 'uploadUrl'
					},
					onProgress: function (e) {
						var fileInfo = e.file,
							ratio = e.bytesLoaded / fileInfo.size;

						iFileUpload.onProgress(fileInfo, ratio > 1 ? 1 : ratio);
						/*console.log('size=' + fileInfo.size +
						 ' segmentSize=' + e.segmentSize +
						 ' bytesLoaded=' + e.bytesLoaded);*/
					},
					onUploaded: function (e) {
						iFileUpload.onUploaded(e.file, getResponse(e), true);

						fileCount--;
						if (fileCount === 0) {
							e.file && loadKptFile(e.file, $scope, $http);
							iFileUpload.onFinish();
						}
					},
					onUploadError: function (e) {
						iFileUpload.onUploaded(e.file, getResponse(e), false);

						fileCount--;
						(fileCount === 0) && iFileUpload.onFinish();
					},
					onValueChanged: function (e) {
						fileCount = e.values.length;

						$scope.kpt = null;

						switch (settings.uploader.uploadMode) {
							case 'instantly':
								iFileUpload.onStart();
								break;

							case 'useForm':
								if (form !== null) {
									form.submit();
									iFileUpload.onStart();
								}

								break;
						}
					}
				});

				//--- Инициализация интерфейсов ---
				this.$onInit = function () {
					var interfaceConnector = this.interfaceConnector;

					//--- Загрузка файлов на сервер ---
					iFileUpload = interfaceConnector.exportInterface('iFileUpload',
						{
							//--- Установить URL для загрузки ---
							setUrl: function (uploadUrl) {
								$scope.uploadUrl = uploadUrl;
							},

							//--- Начало загрузки ---
							onStart: function () {
							},
							//--- Завершение загрузки всех файлов ---
							onFinish: function () {
							},
							//--- Файл загружается ---
							onProgress: function (fileInfo, ratio) {
							},
							//--- Файл загружен ---
							onUploaded: function (fileInfo, response, isSuccess) {
							}
						}
					);
				};
			}]
		});
})();