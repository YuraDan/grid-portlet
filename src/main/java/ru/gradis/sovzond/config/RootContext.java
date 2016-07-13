package ru.gradis.sovzond.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import ru.gradis.sovzond.geoserver.Geoserver;
import ru.gradis.sovzond.model.dao.ParcelDAO;
import ru.gradis.sovzond.model.dao.UserRegistrDAO;
import ru.gradis.sovzond.model.dao.XmlAnalysisDAO;
import ru.gradis.sovzond.model.dao.impl.ParcelDAOImpl;
import ru.gradis.sovzond.model.dao.ReferenceDAO;
import ru.gradis.sovzond.model.dao.impl.ReferenceDAOImpl;
import ru.gradis.sovzond.model.dao.impl.UserRegistrDAOImpl;
import ru.gradis.sovzond.model.dao.impl.XmlAnalysisDAOImpl;

import javax.sql.DataSource;

/**
 * Created by donchenko-y on 6/1/16.
 */

@Configuration
@ComponentScan(basePackages = "ru.gradis.sovzond")
@EnableWebMvc
public class RootContext extends WebMvcConfigurerAdapter {


	@Bean
	public DataSource getDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("org.postgresql.Driver");
		dataSource.setUrl("jdbc:postgresql://192.168.42.21:5432/mo");
		dataSource.setUsername("rc7postgres");
		dataSource.setPassword("9PmAPWXHefUn");

		return dataSource;
	}

//	@Bean
//	public ReferenceDAO getReferenceDAO() {
//		return new ReferenceDAOImpl(getDataSource());
//	}

	@Bean
	public ParcelDAO getParcelDAO() {
		return new ParcelDAOImpl(getDataSource());
	}

	@Bean
	public XmlAnalysisDAO getXmlAnalysisDAO() {
		return new XmlAnalysisDAOImpl(getDataSource());
	}

	@Bean
	public UserRegistrDAO getUserRegistrDAO() {
		return new UserRegistrDAOImpl(getDataSource());
	}

	@Bean
	public Geoserver getGeoserver() {
		return new Geoserver();
	}


}
