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

	@RequestMapping(value = "/services/gridData", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public
	@ResponseBody
	ResponseEntity<String> getGridConfig(@RequestParam("dataSetName") String dataSetName,
	                                     @RequestParam("userID") Integer userID,
	                                     @RequestParam(value = "param", required = false) String param) {
		String json = "";

		if (dataSetName != null && userID != null) {
			json = (String) gridDataDAO.getGridData(dataSetName, userID);
			return new ResponseEntity<String>(json, HttpStatus.OK);
		}

		return new ResponseEntity<String>("Требуется передать userId и название набора данных", HttpStatus.BAD_REQUEST);

	}

}
