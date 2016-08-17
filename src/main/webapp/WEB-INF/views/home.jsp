<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ page import="com.liferay.portal.theme.ThemeDisplay" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<% ThemeDisplay themeDisplay = (ThemeDisplay) request.getAttribute(WebKeys.THEME_DISPLAY);
	String portletId = themeDisplay.getPortletDisplay().getId();
%>

<head>
	<title>Динамическая настройка таблицы</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<!-- Css -->
	<link href="<%=request.getContextPath()%>/css/main.css" rel="stylesheet"/>

	<!-- Main app file -->
	<script src="<%=request.getContextPath()%>/js/app.js"></script>
</head>
<body class="prototype">
<div class="wrapper">
	<div class="detailInfo">
		<div class="dataTable" ng-controller="singleDxController">
			<div dx-data-grid="settings.dxComponent">    
			</div>
		</div>
		<div style="margin-top: 50px; height: 20px;">
		</div>
	</div>
</div>
</body>
<script>

	Liferay.on('localizationLoaded', function() {
		var portletElement = document.getElementById('portlet_<%=portletId%>');
		angular.bootstrap(portletElement, ['gradisGrid']);
	});

</script>