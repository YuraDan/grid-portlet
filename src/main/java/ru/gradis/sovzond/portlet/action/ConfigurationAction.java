package ru.gradis.sovzond.portlet.action;

import com.liferay.portal.kernel.portlet.DefaultConfigurationAction;
import com.liferay.portal.kernel.util.ParamUtil;

import com.liferay.portlet.PortletPreferencesFactoryUtil;

import javax.portlet.*;
import javax.portlet.PortletPreferences;

/**
 * Created by donchenko-y on 7/26/16.
 */

public class ConfigurationAction extends DefaultConfigurationAction {


	@Override
	public void processAction(
			PortletConfig portletConfig, ActionRequest actionRequest,
			ActionResponse actionResponse) throws Exception {

		super.processAction(portletConfig, actionRequest, actionResponse);

		PortletPreferences prefs = actionRequest.getPreferences();

		String gridIdKey = prefs.getValue("gridIdKey", "NOT_DEFINE");
		String comp = prefs.getValue("components", "NULL");

		// Add any preference processing here.
	}


	@Override
	public String render(PortletConfig portletConfig, RenderRequest renderRequest,
	                     RenderResponse renderResponse) throws Exception {

//		CacheRegistryUtil.clear();
		String portletResource = ParamUtil.getString(renderRequest, "portletResource");
		PortletPreferences prefs = PortletPreferencesFactoryUtil.getPortletSetup(renderRequest, portletResource);
		String res = super.render(portletConfig, renderRequest, renderResponse);
		return res;
	}

}
