<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<head>
	<title>Градис, анализ КПТ</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<!-- Theme -->
	<link href="<%=request.getContextPath()%>/css/dx.common.css" rel="stylesheet"/>
	<link rel="dx-theme" data-theme="generic.light" href="<%=request.getContextPath()%>/css/light.gradis.css"
		  data-active="true"/>

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

	<script src="<%=request.getContextPath()%>/js/upload.js"></script>
	<script src="<%=request.getContextPath()%>/js/analyzerXml.js"></script>
	<script src="<%=request.getContextPath()%>/js/uploadFile.js"></script>
	<script src="<%=request.getContextPath()%>/js/dataView.js"></script>
	<script src="<%=request.getContextPath()%>/js/frame.js"></script>
	<script src="<%=request.getContextPath()%>/js/chart.js"></script>
	<script src="<%=request.getContextPath()%>/js/dataForm.js"></script>
	<style>
		body {
			/*font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;*/
			font-family: Verdana, sans-serif;
			background-color: white;
			color: #414b4c;
			position: relative;
		}

		h1 {
			color: rgb(51, 51, 51);
			font-size: 38.5px;
			font-weight: 200;
			margin-bottom: 30px;
			margin-top: 26px;
			padding-top: 38px;
			margin-left: 0;
			margin-right: 0;
			text-rendering: optimizelegibility;

			width: 240px;
			margin-left: auto;
			margin-right: auto;

			width: 100%;
			text-align: center;
			padding-top: 64px;
			margin-top: 0;
			margin-bottom: 0;
			padding-bottom: 30px;
			background-color: white;
		}

		h2 {
			/*color: #767676;*/
			color: #414b4c;
			font-weight: normal;
			font-size: 18px;
			margin-top: 0;
			margin-bottom: 30px;
		}

		h1 img {
			vertical-align: middle;
			margin-right: 11px;
		}

		.dx-fileuploader {
			width: 519px;
			margin-left: auto;
			margin-right: auto;
		}

		.dx-fileuploader-button {
			background-color: #9bc53d;
			text-transform: uppercase;
			color: white;
			font-size: 17px;
			padding-left: 0px;
			padding-right: 0px;
			border-radius: 10px;
			padding-top: 29px;
			padding-bottom: 29px;
		}

		.dx-fileuploader-button.dx-state-hover {
			background-color: #9bc53d;
		}

		.dx-fileuploader-button.dx-state-active {
			background-color: #9bc53d;
		}

		.dx-fileuploader-button.dx-state-focused {
			background-color: #9bc53d;
		}

		.dx-fileuploader-button .dx-button-text {
			white-space: pre-wrap;
		}

		.dx-fileuploader-input-label {
			padding-top: 28px;
			white-space: normal;
		}

		.messages {
			color: rgb(35, 35, 35);
			padding: 10px;
			font-size: 24px;
			font-weight: bold;
			color: #fa7921;
			font-weight: bold;
			text-transform: uppercase;
			margin-top: 44px;
		}

		.messages p {
			text-align: center;
			white-space: pre;
			line-height: 35px;
		}

		.detailButton {
			/*margin-left: 10px;
			margin-bottom: 10px;

			margin-left: 34%;
			position: relative;
			left: 10px;*/
			display: block;
			width: 225px;
			margin-left: auto;
			margin-right: auto;

			background-color: white;
			text-transform: uppercase;
			font-size: 18px;
			color: #414b4c;
			width: 384px;
			border-color: #f0f0f0;
			border-radius: 8px;
			/* font-weight: bold; */
			padding-top: 11px;
			padding-bottom: 14px;
			margin-top: 36px;
		}

		.detailButton.dx-state-hover {
			background-color: white;
		}

		.detailButton.dx-state-active {
			background-color: white;
		}

		.detailButton.dx-state-focused {
			background-color: white;
		}

		.gis {

		}

		.frame {
			display: block;
			width: 90%;
			margin-top: 40px;
			margin-left: auto;
			margin-right: auto;
			border: 1px solid #dcdcdc;
		}

		.container {
			display: block;
			/*padding-bottom: 85px;*/
		}

		.dx-fileuploader-input-container {
			/*height: 100px;*/
		}

		.dx-progressbar-status:before {
			display: inline-block;
			height: 100%;
			content: 'Загрузка';
			padding-right: 10px;
			vertical-align: middle;
		}

		.analyse-progress {
			margin-top: -11px;
			padding-left: 10px;
			padding-right: 10px;
			width: 519px;
			margin-left: auto;
			margin-right: auto;
		}

		.progressHide .dx-progressbar {
			display: none;
		}

		.analyse-progress .dx-progressbar-range-container {
			float: none !important;
			display: table-cell;
			width: 100%;
		}

		.analyse-progress .dx-progressbar-status {
			float: none !important;
			display: table-cell;
			width: 87px;
			padding-left: 8px;
			white-space: pre;
			padding-right: 9px;
		}

		.analyse-progress .dx-progressbar-status:before {
			content: 'Анализ';
		}

		.topBlock {
			display: inline-block;
			float: left;
			width: 42%;
			margin-left: 4%;
			min-height: 100px;
			vertical-align: top;
			line-height: 30px;
			text-align: justify;
			margin-top: 74px;
			/*margin-bottom: 32px; */
			margin-bottom: 49px;
		}

		.topBlock h2 {
			text-align: left;
			text-decoration: underline;
			text-transform: uppercase;
			margin-bottom: 13px;
		}

		.secondBlock {
			float: right;
			margin-right: 4%;
		}

		.secondBlock h2 {
			padding-left: 11px;
		}

		/*.firstTopBlock{
			margin-left: 0;
		}*/
		.centerTopBlock {
			margin-top: 50px;
			border: none;
		}

		.registration {
			display: block;
			width: 800px;
			margin-left: auto;
			margin-right: auto;
			/* margin-top: 87px; */
			padding-top: 57px;
			text-align: center;
			padding-bottom: 47px;
			margin-bottom: 85px;
			margin-top: -54px;
		}

		.registration:before {
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
			top: -57px;
		}

		.registration h2 {
			text-transform: uppercase;
			margin-bottom: 50px;
		}

		.registration .dx-button {
			margin-right: 10px;
		}

		.errorMessage {
			color: red;
			display: block;
			width: 800px;
			margin-left: auto;
			margin-right: auto;
			text-align: center;
			padding-bottom: 47px;
			margin-top: -115px;
			margin-bottom: 85px;
		}

		.chart {
			display: block;
			width: 50%;
			margin-left: auto;
			margin-right: auto;
			margin-top: 30px;
			height: auto;
		}

		.detailInfo {
			text-align: center;
			overflow: hidden;
			background-color: white;
		}

		.detailInfo:before {
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

		.order {
			display: inline-block;
			font-size: 20px;
			margin-top: 30px;
			margin-bottom: 25px;
		}

		.order.first > p {
			display: none;
		}

		.order > p {
			margin: 0;
			text-transform: uppercase;
			margin-top: 5px;
		}

		.order.second > span {
			visibility: hidden;
		}

		.gradisHide svg {
			margin-top: -480px;
			position: relative;
			z-index: -1;
		}

		.gradisHide svg g {
			visibility: hidden !important;
		}

		.gradisHide iframe {
			visibility: hidden;
			height: 10px;
			border: none;
		}

		.gradisHide:before {
			z-index: -1;
		}

		footer {
			/*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFW…sJogQCkNlMDDgAE1AvUCHcaDgbaMf/z1++INnxhVw7AAIMABg6G9uePo3zAAAAAElFTkSuQmCC) repeat 0 0 #d4d7da;*/
			/*box-shadow: 0 0 10px #767676;
			color: #434343;*/
			font-size: 12px;
			font-weight: normal;
			overflow: hidden;
			padding-top: 20px;
			padding-bottom: 19px;
			position: absolute;
			bottom: 0;
			width: 100%;
			z-index: 0;
			/*margin-left: -70px;*/
			/* margin-right: -170px; */
			text-align: center;
			/* padding-left: 70px; */
			/* padding-right: 70px; */
			background-color: #485152;
			color: #f4f7f4;
		}

		footer:before {
			content: '';
			display: inline-block;
			width: 28px;
		}

		footer address {
			display: inline-block;
			font-style: normal;
		}

		.wrapper {
			position: relative;
			min-height: 100%;
			margin: 0 auto;
			max-width: 4000px;
			background-color: #f4f7f4;
		}

		.wrapper:before {
			content: '';
			display: block;
			height: 29px;
			background-color: #485152;
		}

		.gisColor span {
			display: inline-block;
			width: 100%;
			height: 19px;
		}

		.current-row {
			background-color: transparent;
		}

		.banner {
			position: relative;
			overflow: hidden;
			background-color: white;
		}

		.banner:before {
			content: '';
			display: block;
			width: 0;
			height: 0;
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			border-top: 20px solid rgba(255, 255, 255, 1);
			margin-left: auto;
			margin-right: auto;
			margin-bottom: -20px;
			position: relative;
			z-index: 1;
		}

		.photoBackground {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			opacity: 0.15;
		}

		ol {
			padding-left: 0;
		}

		ol ul {
			list-style-type: none;
		}

		ol ul:before {
			content: '';
			display: inline-block;
			width: 0;
			height: 0;
			border-top: 7px solid transparent;
			border-bottom: 7px solid transparent;
			border-left: 7px solid #9bc53d;
			margin-left: -7px;
			position: relative;
			left: -20px;
			top: 1px;
		}

		.uploadBlock {
			background-color: #f4f7f4;
			padding-top: 42px;
		}

		.dx-fileuploader-file-name {
			color: #414b4c;
		}

		.dx-fileuploader-show-file-list .dx-fileuploader-files-container {
			padding-top: 7px;
		}

		.dx-fileuploader-file {
			display: inline;
		}

		.dx-fileuploader-file-status-message {
			float: right;
		}

		.dx-fileuploader-file-info {
			margin-right: -100px;
		}

		.dx-form {
			text-align: left;
			width: 800px;
			display: inline-block;
			margin-bottom: 48px;
		}

		.dx-form:after {
			content: '';
			display: block;
		}

		.registrationBlock {
			width: 100%;
			background-color: white;
		}

		.saveButton {
			background-color: #9bc53d;
			text-transform: uppercase;
			color: white;
			font-size: 17px;
			padding-left: 0px;
			padding-right: 0px;
			border-radius: 10px;
			padding-top: 7px;
			padding-bottom: 6px;
		}

		.saveButton.dx-state-hover {
			background-color: #9bc53d;
		}

		.saveButton.dx-state-active {
			background-color: #9bc53d;
		}

		.saveButton.dx-state-focused {
			background-color: #9bc53d;
		}

		.cancelButton {
			background-color: white;
			text-transform: uppercase;
			color: #9bc53d;
			font-size: 17px;
			padding-left: 0px;
			padding-right: 0px;
			border-radius: 10px;
			padding-top: 7px;
			padding-bottom: 6px;
			border-color: #9bc53d;
			width: 220px;
		}

		.cancelButton.dx-state-hover {
			background-color: white;
			border-color: #9bc53d;
		}

		.cancelButton.dx-state-active {
			background-color: white;
			border-color: #9bc53d;
		}

		.cancelButton.dx-state-focused {
			background-color: white;
			border-color: #9bc53d;
		}

		.dataTable {
			margin-top: 47px;
			display: block;
			margin-left: 5%;
			margin-right: 5%;
		}

		.order .dx-button {
			display: block;
			margin-left: auto;
			margin-right: auto;
			margin-top: 20px;

			background-color: #fa7921;
			text-transform: uppercase;
			color: white;
			font-size: 18px;
			padding-left: 0px;
			padding-right: 0px;
			border-radius: 10px;
			padding-top: 7px;
			padding-bottom: 6px;
			margin-bottom: 54px;
		}

		.order .dx-button.dx-state-hover {
			background-color: #fa7921;
		}

		.order .dx-button.dx-state-active {
			background-color: #fa7921;
		}

		.order .dx-button.dx-state-focused {
			background-color: #fa7921;
		}

		.is-show-data {
			padding-bottom: 85px;
		}

		.is-hide-data {
			padding-bottom: 139px;
		}

		footer a {
			color: #f4f7f4;
		}

		footer a:hover {
			color: #f4f7f4;
		}

		footer a:visited {
			color: #f4f7f4;
		}

		.dx-header-row td {
			text-align: center !important;
		}

		.dx-fileuploader-dragover .dx-fileuploader-input-wrapper {
			border: none;
			padding: 0;
		}

		.dx-fileuploader-dragover .dx-fileuploader-input-wrapper .dx-fileuploader-button {
			display: none;
		}

		.dx-fileuploader-dragover .dx-fileuploader-input-label {
			text-align: center;
		}

		.dx-fileuploader-dragover .dx-fileuploader-input-container {
			display: block;
			border: 3px dashed #9bc53d;
			width: 100%;
			padding-top: 50px;
			padding-bottom: 30px;
		}

		.dx-fileuploader-dragover .dx-fileuploader-input {
			display: block;
			width: 100%;
			padding: 14px 3px;
			margin: -3px;
			-webkit-box-sizing: content-box;
			-moz-box-sizing: content-box;
			box-sizing: content-box;
		}

		.dx-fileuploader-dragover .dx-fileuploader-input-label {
			padding: 14px 9px;
		}
	</style>
</head>
<body ng-app="gradis" class="prototype">
<div class="wrapper">
	<h1 class="site-title">
		<img alt="ГРАДИС" width="72" height="72" src="<%=request.getContextPath()%>/images/company_logo.png">ГРАДИС
	</h1>
	<div class="banner">
		<img src="<%=request.getContextPath()%>/images/picjumbo.com_HNCK8991.jpg" alt="" class="photoBackground">
		<!-- Баннер 1 -->
		<div class="topBlock">
			<h2>О системе</h2>
			ГРАДИС – это программно-аналитический комплекс, предназначенный для управления недвижимостью, выявления
			ошибок, приводящих к недоначислению земельного и имущественного налога, выдачи градостроительной
			документации, автоматизированного обмена информацией
		</div>
		<!-- Баннер 2 -->
		<div class="topBlock secondBlock">
			<h2>Задачи, решаемые системой</h2>
			<ol>
				<ul>Учет и анализ данных реестров объектов недвижимости</ul>
				<ul>Учет и анализ данных об адресах и субъектах права</ul>
				<ul>Ведение и использование данных ИСОГД</ul>
				<ul>Работа с пространственными данными</ul>
				<ul>Отображение полного жизненного цикла объекта недвижимости</ul>
				<ul>Учет и анализ сведений по налогам</ul>
				<ul>Подготовка и печать отчетов, схем и других документов</ul>
			</ol>
		</div>
	</div>
	<gr-analyzer-xml gr-interface-connector class="container"></gr-analyzer-xml>
	<footer>© Компания «Совзонд», 2016. Все права защищены.
		<address>115563, Москва, Шипиловская, 28а</address>
		+7(495) 988-7511
		<a href="mailto:sovzond@sovzond.ru">sovzond@sovzond.ru</a></footer>
</div>
</body>


<%--<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>--%>
<%--<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>--%>
<%--<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>--%>
<%--<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>--%>
<%--<portlet:defineObjects/>--%>

<%--<portlet:actionURL name="upload" var="uploadFileURL"></portlet:actionURL>--%>

<%--<aui:form action="<%= uploadFileURL %>" commandName="fileVO" enctype="multipart/form-data" method="post">--%>

<%--<c:out value="${fileVO.message}"/>--%>

<%--<aui:input type="file" name="fileupload"/>--%>

<%--<aui:button name="Save" value="Analysis" type="submit"/>--%>

<%--</aui:form>--%>


