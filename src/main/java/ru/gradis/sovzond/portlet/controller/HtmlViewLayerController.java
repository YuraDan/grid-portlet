package ru.gradis.sovzond.portlet.controller;

import com.liferay.portal.kernel.util.File;
import it.geosolutions.geoserver.rest.decoder.RESTResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.gradis.sovzond.geoserver.GeoserverParam;
import ru.gradis.sovzond.util.CommonUtil;
import ru.gradis.sovzond.util.ErrorToResponse;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * Created by donchenko-y on 7/8/16.
 */

@RestController
public class HtmlViewLayerController {

	@RequestMapping(value = "/services/htmlLayerView", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public
	@ResponseBody
	ResponseEntity<String> getHtmlLayerView(@RequestParam(value = "geoserverUrl") String geoserverUrl,
	                                        @RequestParam(value = "name") String name,
	                                        @RequestParam(value = "workspace") String workspace,
	                                        @RequestParam(value = "bbox") String bbox
	) {
		String templateFilePath = GeoserverParam.HTML_LAYER_VIEW_TEMPLATE;

		String html = "";
		try {
			html = CommonUtil.readFile(templateFilePath, StandardCharsets.UTF_8).
					replace("{0}", "%1$s").
					replace("{1}", "%2$s").
					replace("{2}", "%3$s").
					replace("{3}", "%4$s");
		} catch (IOException e) {
			return new ResponseEntity<String>(ErrorToResponse.getJsonError("Отсутствует шаблон для показа карты"), HttpStatus.BAD_REQUEST);
		}
		System.out.println(html);
		System.out.println(String.format(html, geoserverUrl, workspace, name, bbox));
		return new ResponseEntity<String>(String.format(html, geoserverUrl, workspace, name, bbox), HttpStatus.OK);
	}

}
