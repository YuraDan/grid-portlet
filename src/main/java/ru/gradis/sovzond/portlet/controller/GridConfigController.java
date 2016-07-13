package ru.gradis.sovzond.portlet.controller;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.gradis.sovzond.model.dao.GridConfigDAO;

import java.io.IOException;

/**
 * Created by donchenko-y on 7/13/16.
 */

@RestController
public class GridConfigController {

	@SuppressWarnings("SpringJavaAutowiringInspection")
	@Autowired
	private GridConfigDAO gridConfigDAO;

	private static final Log log = LogFactoryUtil.getLog(GridConfigController.class);

	@RequestMapping(value = "/services/gridConfig", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public
	@ResponseBody
	ResponseEntity<String> getGridConfig(@RequestParam("componentId") Integer componentId) {
		String json = "";

		if (componentId != null) {
			json = (String) gridConfigDAO.getGridConfig(componentId);
			return new ResponseEntity<String>(json, HttpStatus.OK);
		}

		return new ResponseEntity<String>("Требуется передать идентификатор компонента", HttpStatus.BAD_REQUEST);

	}


}
