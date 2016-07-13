package ru.gradis.sovzond.model.dao.impl;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import ru.gradis.sovzond.model.dao.ParcelDAO;
import ru.gradis.sovzond.jdbc.mapper.ParcelRowMapper;
import ru.gradis.sovzond.jdbc.sql.SqlStorage;
import ru.gradis.sovzond.model.entity.Parcel;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

/**
 * Created by donchenko-y on 6/6/16.
 */

public class ParcelDAOImpl implements ParcelDAO {


	private JdbcOperations jdbcTemplate;

	public ParcelDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public Parcel get(int Id) {
		return null;
	}

	@Override
	public List<Parcel> list() {
		ObjectMapper mapper = new ObjectMapper();

		String sql = SqlStorage.GET_ALL_PARCEL;

		List<Parcel> parcelList = jdbcTemplate.query(sql, new ParcelRowMapper());

		return parcelList;
	}

	@Override
	public List<Map<String, Object>> selectAll() {
		return null;
	}
}
