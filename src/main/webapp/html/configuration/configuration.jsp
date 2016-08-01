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

<%
	String gridIdKey_cfg = GetterUtil.getString(portletPreferences.getValue("gridIdKey", StringPool.NULL));
	String componentJson = GetterUtil.getString(portletPreferences.getValue("components", StringPool.NULL));
%>

<html>
<head>
	<title>Grid_Configuration</title>
</head>
<body>

<h1> value = <%=componentJson%>
</h1>
<aui:form action="<%= configurationURL %>" method="post" name="fm">
	<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.UPDATE %>"/>

	<aui:input name="preferences--gridIdKey--" type="text" value="<%= gridIdKey_cfg %>"/>

	<!-- Preference control goes here -->

	<aui:button-row>
		<aui:button type="submit"/>
	</aui:button-row>
</aui:form>


</body>
</html>
