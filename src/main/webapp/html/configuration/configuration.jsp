<%@ taglib prefix="liferay-portlet" uri="http://liferay.com/tld/portlet" %>
<%@ taglib prefix="portlet" uri="http://java.sun.com/portlet" %>
<%@ taglib prefix="aui" uri="http://alloy.liferay.com/tld/aui" %>
<%@ page import="com.liferay.portal.kernel.util.GetterUtil" %>
<%@ page import="com.liferay.portal.kernel.util.StringPool" %>
<%@ page import="com.liferay.portal.kernel.util.Constants" %>
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

<liferay-portlet:actionURL portletConfiguration="true" var="configurationURL"/>
<portlet:defineObjects/>

	<!-- Services -->

	<!-- Modules -->
	<script src="<%=themePath%>/js/modules/configurationEditor.js"></script>

	<!-- Main app file -->
	<script src="<%=themePath%>/js/configuration.js"></script>

    <!-- Редактор конфигурации -->
    <gr-configuration-editor id="configurationEditor"></gr-configuration-editor>
    <script>
        angular.element(document).ready(function () {
            angular.bootstrap(document.getElementById('configurationEditor'), ['configuration']);
        });
    </script>

    <aui:form action="<%= configurationURL %>" method="post" name="fm">
		<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.UPDATE %>"/>

		<!-- Preference control goes here -->

		<aui:button-row>
			<aui:button type="submit"/>
		</aui:button-row>
	</aui:form>

