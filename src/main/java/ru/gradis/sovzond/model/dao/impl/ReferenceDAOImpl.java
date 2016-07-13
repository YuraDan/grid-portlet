package ru.gradis.sovzond.model.dao.impl;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import ru.gradis.sovzond.model.dao.ReferenceDAO;
import ru.gradis.sovzond.jdbc.sql.SqlStorage;
import ru.gradis.sovzond.model.entity.Reference;

import org.codehaus.jackson.map.ObjectMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;


/**
 * Created by donchenko-y on 6/1/16.
 */
public class ReferenceDAOImpl implements ReferenceDAO {

	private JdbcTemplate jdbcTemplate;

	public ReferenceDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public Reference get(int Id) {
		return null;
	}

	@Override
	public List<Reference> list() {

		ObjectMapper mapper = new ObjectMapper();

		String sql = SqlStorage.GET_ALL_COUNTRY;

		List<Reference> listRef = jdbcTemplate.query(sql, new RowMapper<Reference>() {

			@Override
			public Reference mapRow(ResultSet rs, int rowNum) throws SQLException {
				Reference ref = new Reference();

				ref.setId(rs.getInt("countryid"));
				ref.setName(rs.getString("name"));
				ref.seta2(rs.getString("a2"));
				ref.seta3(rs.getString("a3"));
				ref.setnumber(rs.getString("number_"));

				return ref;
			}

		});
		return listRef;
	}

	@Override
	public List<Map<String, Object>> selectAll() {
		String sql = "SELECT * FROM country";
		List<Map<String, Object>> listRefAll = jdbcTemplate.queryForList(sql);
		return listRefAll;
	}
}
