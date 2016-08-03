<%@ taglib prefix="liferay-portlet" uri="http://liferay.com/tld/portlet" %>
<%@ taglib prefix="portlet" uri="http://java.sun.com/portlet" %>
<%@ taglib prefix="aui" uri="http://alloy.liferay.com/tld/aui" %>
<%@ page import="com.liferay.portal.kernel.util.GetterUtil" %>
<%@ page import="com.liferay.portal.kernel.util.StringPool" %>
<%@ page import="com.liferay.portal.kernel.util.Constants" %>
<%@ page import="com.liferay.portal.kernel.cache.CacheRegistryUtil" %>
<%@ page import="com.liferay.portal.kernel.dao.orm.EntityCacheUtil" %>

<%--
  Created by IntelliJ IDEA.
  User: donchenko-y
  Date: 7/26/16
  Time: 5:27 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<liferay-portlet:actionURL portletConfiguration="true" var="configurationURL"/>
<portlet:defineObjects/>

<html>
<head>
	<title>Настройки</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<link href="<%=request.getContextPath()%>/css/prototype.css" rel="stylesheet"/>
	<link href="<%=request.getContextPath()%>/css/main.css" rel="stylesheet"/>

	<!-- Services -->

	<!-- Modules -->
	<script src="<%=request.getContextPath()%>/js/modules/configurationEditor.js"></script>

	<!-- Main app file -->
	<script src="<%=request.getContextPath()%>/js/configuration.js"></script>
</head>
<body>
	<!-- Редактор конфигурации -->
    <gr-configuration-editor></gr-configuration-editor>

	<aui:form action="<%= configurationURL %>" method="post" name="fm">
		<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.UPDATE %>"/>

		<!-- Preference control goes here -->

		<aui:button-row>
			<aui:button type="submit"/>
		</aui:button-row>
	</aui:form>

	<script>
		$(document).ready(function () {
			angular.bootstrap(document.body, ['configuration']);
		});
	</script>
</body>
</html>
