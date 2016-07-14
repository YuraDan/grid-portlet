<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>

	<head>
		<title>Динамическая настройка таблицы</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<!-- Theme -->
		<link href="<%=request.getContextPath()%>/css/dx.common.css" rel="stylesheet" />
		<link rel="dx-theme" data-theme="generic.light" href="<%=request.getContextPath()%>/css/light.gradis.css" data-active="true"
		/>

		<link href="<%=request.getContextPath()%>/css/prototype.css" rel="stylesheet" />

		<!--[if lt IE 9]>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/vendor/jquery/jquery-1.11.3.min.js"></script>
		<![endif]-->
		<!--[if gte IE 9]><!-->
		<script src="<%=request.getContextPath()%>/js/vendor/jquery/jquery-2.1.4.min.js"></script>
		<!--<![endif]-->

		<!-- Globalize -->
		<script src="<%=request.getContextPath()%>/js/vendor/globalize/globalize.min.js"></script>

		<!-- Angular -->
		<script src="<%=request.getContextPath()%>/js/vendor/angular/angular.min.js"></script>
		<script src="<%=request.getContextPath()%>/js/vendor/angular/angular-sanitize.min.js"></script>

		<!-- Devexpress -->
		<script src="<%=request.getContextPath()%>/js/vendor/devexpress/dx.webappjs.js"></script>
		<!-- Devexpress localization -->
		<script src="<%=request.getContextPath()%>/js/vendor/devexpress/localization/dx.webappjs.ru.js"></script>

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

	<body ng-app="gradisDynamicGridTest" class="prototype">
		<div class="wrapper">
			<div id="detailInfo" class="detailInfo">
				<gr-data-view class="dataTable"></gr-data-view>
				<div style="margin-top: 50px; height: 20px;">
				</div>
			</div>
		</div>
	</body>