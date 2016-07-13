package ru.gradis.sovzond.portlet.controller;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.log.SanitizerLogWrapper;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.gradis.sovzond.model.dao.UserRegistrDAO;
import ru.gradis.sovzond.model.entity.User;
import ru.gradis.sovzond.util.ErrorToResponse;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.security.InvalidParameterException;

/**
 * Created by donchenko-y on 7/6/16.
 */

@RestController
public class UserRegistrationController {

	private static final Log log = LogFactoryUtil.getLog(UserRegistrationController.class);

	@SuppressWarnings("SpringJavaAutowiringInspection")
	@Autowired
	private UserRegistrDAO userRegistrDAO;

	@RequestMapping(value = "/services/registration", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public
	@ResponseBody
	ResponseEntity<String> registrUser(@RequestParam(value = "email", required = false) String email,
	                                   @RequestParam("isHot") String isHot,
	                                   @RequestParam(value = "name", required = false) String name,
	                                   @RequestParam(value = "organization", required = false) String organization,
	                                   @RequestParam("pageId") String pageId,
	                                   @RequestParam(value = "telephone", required = false) String telephone,
	                                   @ModelAttribute User user) {

		if (email != null && name != null && telephone != null) {

			setUser(email, isHot, name, organization, pageId, telephone, user);
			return new ResponseEntity<String>(userRegistrDAO.registrUser(user), HttpStatus.OK);
//			String result = checkUser(user);
//			if (!result.equals("true")) return result;
		} else {
			return new ResponseEntity<String>(ErrorToResponse.getJsonError("Укажите, пожалуйста, электронную почту, имя и телефон"), HttpStatus.BAD_REQUEST);
//			throw new InvalidParameterException();
		}
//		return userRegistrDAO.registrUser(user);
	}

//	@ExceptionHandler(InvalidParameterException.class)
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	public
//	@ResponseBody
//	String invalidRegistration() {
//		System.out.println(ErrorToResponse.getJsonError("Укажите, пожалуйста, электронную почту или телефон"));
//		return ErrorToResponse.getJsonError("Укажите, пожалуйста, электронную почту или телефон");
//	}

	@ModelAttribute("user")
	public User getCommandObject() {
		System.out.println("SpringFileController -> getCommandObject -> Building User");
		return new User();
	}

	private String checkUser(User user) {
		String result = "true";

		if (user.getEmail().isEmpty() && user.getTelephone().isEmpty())
			return ErrorToResponse.getJsonError("Укажите, пожалуйста, электронную почту или телефон");

		if (user.getPageId() < 0) return ErrorToResponse.getJsonError("Не указан идентификатор КПТ-файла");

		return result;
	}

	private User setUser(String email, String isHot, String name, String organization,
	                     String pageId, String telephone, User user) {
		user.setName(name);
		user.setEmail(email);
		user.setOrganization(organization);
		user.setTelephone(telephone);
		user.setIsHot(Boolean.valueOf(isHot));
		if (!pageId.isEmpty()) {
			user.setPageId(Integer.valueOf(pageId));
		} else {
			user.setPageId(-1);
		}

		return user;
	}

}
