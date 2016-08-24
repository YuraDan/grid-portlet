package ru.gradis.sovzond.portlet.controller;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.gradis.sovzond.model.dao.GridDataDAO;

/**
 * Created by donchenko-y on 7/13/16.
 */

@RestController
public class GridDataController {


	@SuppressWarnings("SpringJavaAutowiringInspection")
	@Autowired
	private GridDataDAO gridDataDAO;

	private static final Log log = LogFactoryUtil.getLog(GridConfigController.class);


	@RequestMapping(value = "/GridServices/gridData", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public
	@ResponseBody
	ResponseEntity<String> getGridData(@RequestParam("dataSetName") String dataSetName,
	                                   @RequestParam("userId") Integer userId,
	                                   @RequestParam(value = "param", required = false) String param) {
		String json = "";

		if (dataSetName != null && userId != null) {
			json = (String) gridDataDAO.getGridData(dataSetName, userId, param);
			return new ResponseEntity<String>(json, HttpStatus.OK);
		}

		return new ResponseEntity<String>("Требуется передать userId и название набора данных", HttpStatus.BAD_REQUEST);

	}

	@RequestMapping(value = "/GridServices/delete", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public
	@ResponseBody
	ResponseEntity<String> deleteFromGrid(@RequestParam("dataSetName") String dataSetName,
	                                      @RequestParam("userId") Integer userId,
	                                      @RequestParam(value = "param", required = false) String param) {
		String json = "";

		if (dataSetName != null && userId != null) {
			gridDataDAO.deleteGridData(dataSetName, userId, param);
			return new ResponseEntity<String>("Удалено", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Требуется передать userId, название набора данных и управляющие параметры!", HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/GridServices/updateRow", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public
	@ResponseBody
	ResponseEntity<String> updateGridRow(@RequestParam("dataSetName") String dataSetName,
	                                     @RequestParam("userId") Integer userId,
	                                     @RequestParam(value = "param", required = false) String param) {
		String json = "";

		if (dataSetName != null && userId != null) {
			gridDataDAO.updateGridData(dataSetName, userId, param);
			return new ResponseEntity<String>("Обновлено", HttpStatus.OK);
		}

		return new ResponseEntity<String>("Требуется передать userId, название набора данных и управляющие параметры!", HttpStatus.BAD_REQUEST);

	}
}
