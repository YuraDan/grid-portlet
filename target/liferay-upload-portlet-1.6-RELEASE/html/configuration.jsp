<%--
  Created by IntelliJ IDEA.
  User: donchenko-y
  Date: 6/10/16
  Time: 12:53 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="liferay-portlet" uri="http://liferay.com/tld/portlet" %>
<%@ taglib prefix="aui" uri="http://liferay.com/tld/aui" %>
<%@ page import="com.liferay.portal.kernel.util.GetterUtil" %>
<%@ page import="com.liferay.portal.kernel.util.StringPool" %>
<%@ page import="com.liferay.portal.kernel.util.Constants" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<liferay-portlet:actionURL var="configurationURL"/>

<portlet:defineObjects/>
<%
	boolean somePreferenceKey_cfg = GetterUtil.getBoolean(portletPreferences.getValue("somePreferenceKey", StringPool.TRUE));
%>

<aui:input name="portletPreferencesBool" type="checkbox" value="<%= somePreferenceKey_cfg %>"/>

<%--<aui:form action="<%= configurationURL %>" method="post" name="fm">--%>
<%--<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.UPDATE %>"/>--%>

<%--<!-- Preference control goes here -->--%>
<%--<aui:button-row>--%>
<%--<aui:button type="submit"/>--%>
<%--</aui:button-row>--%>
<%--</aui:form>--%>