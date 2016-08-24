
package ru.gradis.sovzond.portlet.controller;

import java.io.IOException;
import java.util.Locale;

import com.liferay.portal.kernel.cache.CacheRegistryUtil;
import com.liferay.portal.kernel.dao.orm.EntityCacheUtil;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.exception.SystemException;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.model.PortletPreferences;
import com.liferay.portal.model.User;
import com.liferay.portal.model.UserConstants;
import com.liferay.portal.service.UserLocalServiceUtil;
import com.liferay.portal.service.persistence.UserFinder;
import com.liferay.portal.service.persistence.UserFinderUtil;
import com.liferay.portal.service.persistence.UserUtil;
import com.liferay.portal.theme.PortletDisplay;
import com.liferay.portal.theme.ThemeDisplay;
import com.liferay.portal.util.PortalUtil;
import com.liferay.portlet.UserAttributes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;


import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import org.springframework.web.servlet.ModelAndView;
import ru.gradis.sovzond.model.domain.FileVO;

import javax.portlet.RenderRequest;

/**
 * Handles requests for the view mode.
 */
@Controller
public class HomeController {


	private static final Log log = LogFactoryUtil.getLog(HomeController.class);

	@RequestMapping("VIEW")
	public ModelAndView home(Locale locale, ModelAndView model, RenderRequest request, @ModelAttribute FileVO fileVO) throws IOException {
		CacheRegistryUtil.clear();
//		this.portletParam = new PortletParam();
//		ThemeDisplay themeDisplay = (ThemeDisplay) request.getAttribute(WebKeys.THEME_DISPLAY);
//		PortletDisplay portletDisplay = themeDisplay.getPortletDisplay();
//		User user = themeDisplay.getUser();
//
		log.info("Welcome home from portlet MVC! the client locale is " + locale.toString());
		model.setViewName("home");
		return model;
	}

	@ModelAttribute("fileVO")
	public FileVO getCommandObject() {
		System.out.println("SpringFileController -> getCommandObject -> Building VO ");
		return new FileVO();
	}


}
