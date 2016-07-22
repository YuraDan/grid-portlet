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

		<link href="<%=request.getContextPath()%>/css/prototype.css" rel="stylesheet" />

		<!-- Modules -->
		<script src="<%=request.getContextPath()%>/js/modules/dataView.js"></script>

		<!-- Main app file -->
		<script src="<%=request.getContextPath()%>/js/app.js"></script>

		<style>
			.detailInfo {
				text-align: center;
				overflow: hidden;
				background-color: white;
			}
			
			.wrapper {
				position: relative;
				min-height: 100%;
				margin: 0 auto;
				max-width: 4000px;
				background-color: #f4f7f4;
			}
		</style>
	</head>

	<body class="prototype">
		<div class="wrapper">
			<div id="detailInfo" class="detailInfo">
				<gr-data-view class="dataTable"></gr-data-view>
				<div style="margin-top: 50px; height: 20px;">
				</div>
			</div>
		</div>
	</body>
<script>
	$(document).ready(function() {
		var portletElement = document.getElementById('portlet_<%=portletId%>');
		angular.bootstrap(portletElement, ['gradisDynamicGridTest']);
	});  
</script>