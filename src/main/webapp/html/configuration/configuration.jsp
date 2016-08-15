<%@ taglib prefix="liferay-portlet" uri="http://liferay.com/tld/portlet" %>
<%@ taglib prefix="portlet" uri="http://java.sun.com/portlet" %>
<%@ taglib prefix="aui" uri="http://alloy.liferay.com/tld/aui" %>
<%@ page import="com.liferay.portal.kernel.util.GetterUtil" %>
<%@ page import="com.liferay.portal.kernel.util.StringPool" %>
<%@ page import="com.liferay.portal.kernel.cache.CacheRegistryUtil" %>
<%@ page import="com.liferay.portal.kernel.dao.orm.EntityCacheUtil" %>

<%@ page import="com.liferay.portal.theme.ThemeDisplay" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
    <% ThemeDisplay themeDisplay = (ThemeDisplay) request.getAttribute(WebKeys.THEME_DISPLAY);
	String themePath = themeDisplay.getPathThemeRoot();
%>

<%--
  Created by IntelliJ IDEA.
  User: donchenko-y
  Date: 7/26/16
  Time: 5:27 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<portlet:defineObjects/>
    <!-- Css -->
    <link href="<%=themePath%>/css/modules/configurationEditor.css" rel="stylesheet"/>

    <!-- Services -->

	<!-- Modules -->
    <script src="<%=themePath%>/js/tools/deferredInitialization.js"></script>
    <script src="<%=themePath%>/js/components/configurationEditor.js"></script>

	<!-- Main app file -->
	<script src="<%=themePath%>/js/configuration.js"></script>

    <!-- Редактор конфигурации -->
    <gr-configuration-editor id="configurationEditor"></gr-configuration-editor>
    <script>
        Liferay.on('localizationLoaded', function() {
            angular.bootstrap(document.getElementById('configurationEditor'), ['configuration']);
        });
    </script>

