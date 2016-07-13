package ru.gradis.sovzond.portlet.controller;

import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.StringBundler;
import it.geosolutions.geoserver.rest.decoder.RESTLayer;
import it.geosolutions.geoserver.rest.decoder.RESTResource;
import it.geosolutions.geoserver.rest.encoder.GSLayerEncoder;
import it.geosolutions.geoserver.rest.encoder.feature.GSFeatureTypeEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.gradis.sovzond.geoserver.Geoserver;
import ru.gradis.sovzond.geoserver.GeoserverParam;
import ru.gradis.sovzond.util.ErrorToResponse;
import ru.gradis.sovzond.util.JsonBuilder;

/**
 * Created by donchenko-y on 7/7/16.
 */

@RestController
public class GeoserverLayerController {
	private static final Log log = LogFactoryUtil.getLog(GeoserverLayerController.class);

	@SuppressWarnings("SpringJavaAutowiringInspection")
	@Autowired
	private Geoserver geoserver;


	@RequestMapping(value = "/services/geoserverLayerView", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public
	@ResponseBody
	ResponseEntity<String> getLayerView(@RequestParam(value = "name") String layerName) {

		if (layerName != null && isLayerExist(layerName)) {

			RESTResource resourceFromLayer = geoserver.getReader().getResource(geoserver.getReader().getLayer(GeoserverParam.GEOSERVER_WORKSPACE, layerName));

			System.out.println(geoserver.getReader().getFeatureType(geoserver.getReader().getLayer(GeoserverParam.GEOSERVER_WORKSPACE, layerName)).getMaxY());

			return new ResponseEntity<String>(getLayerResToJson(resourceFromLayer, layerName), HttpStatus.OK);

		} else if (layerName != null) {
			if (publicLayer(layerName)) {

				RESTResource resourceFromLayer = geoserver.getReader().getResource(geoserver.getReader().getLayer(GeoserverParam.GEOSERVER_WORKSPACE, layerName));

				return new ResponseEntity<String>(getLayerResToJson(resourceFromLayer, layerName), HttpStatus.OK);

			} else {
				return new ResponseEntity<String>("Ошибка публикации слоя", HttpStatus.BAD_REQUEST);
			}
		} else {
			return new ResponseEntity<String>(ErrorToResponse.getJsonError("Не указано название слоя"), HttpStatus.BAD_REQUEST);
		}
	}

	public boolean isLayerExist(String layerName) {
		boolean result = false;
		result = geoserver.getReader().getLayer(GeoserverParam.GEOSERVER_WORKSPACE, layerName) == null ? false : true;
		return result;
	}

	public boolean publicLayer(String layerName) {
		GSFeatureTypeEncoder fte = new GSFeatureTypeEncoder();
		fte.setName(layerName);
		fte.setTitle(layerName);
		GSLayerEncoder layerEncoder = new GSLayerEncoder();
		layerEncoder.setEnabled(true);
		return geoserver.getPublisher().publishDBLayer(GeoserverParam.GEOSERVER_WORKSPACE, GeoserverParam.GEOSERVER_DATASTORE, fte, layerEncoder);
	}

	public String getLayerResToJson(RESTResource resourceFromLayer, String layerName) {

		JSONObject jsonObject = JsonBuilder.getJsonObj();
		JSONObject jsonObject2 = JsonBuilder.getJsonObj();


		StringBundler stringBundler = new StringBundler("{");
		stringBundler
				.append("\"maxy\":").append("\"")
				.append(resourceFromLayer.getNativeBoundingBox().getMaxY())
				.append("\"")
				.append(",")
				.append("\"miny\":").append("\"")
				.append(resourceFromLayer.getNativeBoundingBox().getMinY())
				.append("\"")
				.append(",")
				.append("\"maxx\":").append("\"")
				.append(resourceFromLayer.getNativeBoundingBox().getMaxX())
				.append("\"")
				.append(",")
				.append("\"minx\":").append("\"")
				.append(resourceFromLayer.getNativeBoundingBox().getMinX())
				.append("\"").append("}");

		jsonObject.put("url", "delegate/services/htmlLayerView/?geoserverUrl=" + GeoserverParam.GEOSERVER_URL + "&name=" +
				layerName.toLowerCase() + "&workspace=" + GeoserverParam.GEOSERVER_WORKSPACE);

		jsonObject2.put("maxy", String.valueOf(resourceFromLayer.getNativeBoundingBox().getMaxY()));
		jsonObject2.put("miny", String.valueOf(resourceFromLayer.getNativeBoundingBox().getMinY()));
		jsonObject2.put("maxx", String.valueOf(resourceFromLayer.getNativeBoundingBox().getMaxX()));
		jsonObject2.put("minx", String.valueOf(resourceFromLayer.getNativeBoundingBox().getMinX()));

		System.out.println(stringBundler.toString());
		System.out.println(jsonObject2.toString());

//		jsonObject.put("bbox", jsonObject2.toString());
		jsonObject.put("bbox", stringBundler.toString());


		return jsonObject.toString();
	}

}


