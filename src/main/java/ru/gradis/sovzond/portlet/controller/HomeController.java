
package ru.gradis.sovzond.portlet.controller;

import java.io.IOException;
import java.util.Locale;

import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.model.User;
import com.liferay.portal.theme.PortletDisplay;
import com.liferay.portal.theme.ThemeDisplay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;


import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import org.springframework.web.servlet.ModelAndView;
import ru.gradis.sovzond.model.domain.FileVO;
import ru.gradis.sovzond.model.entity.PortletParam;

import javax.portlet.RenderRequest;

/**
 * Handles requests for the view mode.
 */
@Controller
public class HomeController {

	@SuppressWarnings("SpringJavaAutowiringInspection")
	@Autowired
	public PortletParam portletParam;

	private static final Log log = LogFactoryUtil.getLog(HomeController.class);

	@RequestMapping("VIEW")
	public ModelAndView home(Locale locale, ModelAndView model, RenderRequest request, @ModelAttribute FileVO fileVO) throws IOException {

//		this.portletParam = new PortletParam();

		ThemeDisplay themeDisplay = (ThemeDisplay) request.getAttribute(WebKeys.THEME_DISPLAY);
		PortletDisplay portletDisplay = themeDisplay.getPortletDisplay();
		System.out.println(themeDisplay.getPlid());
		System.out.println(portletDisplay.getId());
		fileVO.setMessage(portletDisplay.getId());
		portletParam.setLAYOUT_ID(String.valueOf(themeDisplay.getPlid()));
		portletParam.setPORTLET_ID(portletDisplay.getId());
		User user = themeDisplay.getUser();
		portletParam.setCURRENT_PORTAL_USER_ID(user.getUserId());
		System.out.println("ID FROM HOME = " + portletParam.getPORTLET_ID());
		System.out.println("ID FROM VO = " + fileVO.getMessage());
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
