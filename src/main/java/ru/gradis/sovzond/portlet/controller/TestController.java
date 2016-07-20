package ru.gradis.sovzond.portlet.controller;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by donchenko-y on 7/20/16.
 */


@RestController
public class TestController {


	private static final Log log = LogFactoryUtil.getLog(GridConfigController.class);

	@RequestMapping(value = "/services/testIdTransfer", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public
	@ResponseBody
	ResponseEntity<String> getTest(
			@RequestParam(value = "portletId", required = false) Integer portletId,
			@RequestParam(value = "userId", required = false) Integer userId,
			@RequestParam(value = "layoutId", required = false) Integer layoutId) {
		String json = "";


		json = "PortletID: " + portletId + " UserID: " + userId + " LayoutID: " + layoutId;
		return new ResponseEntity<String>(json, HttpStatus.OK);

	}


}
