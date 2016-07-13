package ru.gradis.sovzond.geoserver;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import it.geosolutions.geoserver.rest.GeoServerRESTPublisher;
import it.geosolutions.geoserver.rest.GeoServerRESTReader;

import java.net.MalformedURLException;

/**
 * Created by donchenko-y on 7/7/16.
 */
public class Geoserver {

	private static final Log log = LogFactoryUtil.getLog(Geoserver.class);

	private GeoServerRESTReader reader;
	private GeoServerRESTPublisher publisher;

	public Geoserver() {
		System.out.println("OLOLOL I AM IN GEOSERVER!!!!!!!!!!!!!!!!");
		try {
			this.reader = new GeoServerRESTReader(GeoserverParam.GEOSERVER_URL, GeoserverParam.GEOSERVER_USER, GeoserverParam.GEOSERVER_PASS);
			log.info(reader.toString());
		} catch (MalformedURLException e) {
			log.error(e);
		}
		this.publisher = new GeoServerRESTPublisher(GeoserverParam.GEOSERVER_URL, GeoserverParam.GEOSERVER_USER, GeoserverParam.GEOSERVER_PASS);

	}

	public GeoServerRESTReader getReader() {
		return reader;
	}

	public GeoServerRESTPublisher getPublisher() {
		return publisher;
	}

}
