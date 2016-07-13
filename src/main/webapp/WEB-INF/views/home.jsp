<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<head>
	<title>Динамическая настройка таблицы</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<!-- Theme -->
	<link href="<%=request.getContextPath()%>/css/dx.common.css" rel="stylesheet"/>
	<link rel="dx-theme" data-theme="generic.light" href="<%=request.getContextPath()%>/css/light.gradis.css" data-active="true"/>

	<link href="<%=request.getContextPath()%>/css/prototype.css" rel="stylesheet"/>

	<!--[if lt IE 9]>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.11.3.min.js"></script>
	<![endif]-->
	<!--[if gte IE 9]><!-->
	<script src="<%=request.getContextPath()%>/js/jquery-2.1.4.min.js"></script>
	<!--<![endif]-->
	<script src="<%=request.getContextPath()%>/js/globalize.min.js"></script>
	<script src="<%=request.getContextPath()%>/js/angular.js"></script>
	<script src="<%=request.getContextPath()%>/js/angular-sanitize.min.js"></script>
	<script src="<%=request.getContextPath()%>/js/dx.webappjs.js"></script>
	<script src="<%=request.getContextPath()%>/js/jszip.min.js"></script>

	<script src="<%=request.getContextPath()%>/js/dx.chartjs.js"></script>
	<script src="<%=request.getContextPath()%>/js/angular-resource.min.js"></script>

	<!-- Локализация -->
	<script src="<%=request.getContextPath()%>/js/dx.webappjs.ru.js"></script>

	<!-- Форматирование чисел -->
	<script src="<%=request.getContextPath()%>/js/accounting.min.js"></script>

	<script src="<%=request.getContextPath()%>/js/dataView.js"></script>
	<script src="<%=request.getContextPath()%>/js/app.js"></script>


	<style>
		.detailInfo{
			text-align: center;
			overflow:hidden;
			background-color: white;
		}
		.detailInfo:before{
			content: '';
			display: block;
			width: 0;
			height: 0;
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			border-top: 20px solid #f4f7f4;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: -20px;
			position: relative;
			z-index: 1;
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