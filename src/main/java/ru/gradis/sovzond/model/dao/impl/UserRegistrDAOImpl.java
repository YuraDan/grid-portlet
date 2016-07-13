package ru.gradis.sovzond.model.dao.impl;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import ru.gradis.sovzond.model.dao.UserRegistrDAO;
import ru.gradis.sovzond.model.entity.User;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by donchenko-y on 7/6/16.
 */
public class UserRegistrDAOImpl implements UserRegistrDAO {

	private static final Log log = LogFactoryUtil.getLog(UserRegistrDAOImpl.class);

	private SimpleJdbcCall simpleJdbcCall;

	public UserRegistrDAOImpl(DataSource dataSource) {
		this.simpleJdbcCall = new SimpleJdbcCall(dataSource).withSchemaName("public").
				withProcedureName("pr_upsert_client").
				declareParameters(
						new SqlParameter("i_name", Types.CLOB),
						new SqlParameter("i_organization", Types.CLOB),
						new SqlParameter("i_email", Types.CLOB),
						new SqlParameter("i_telephone", Types.CLOB),
						new SqlParameter("i_page_id", Types.INTEGER),
						new SqlParameter("i_client_id", Types.INTEGER),
						new SqlParameter("i_is_hot", Types.BOOLEAN)
				);
	}

	@Override
	public String registrUser(User user) {
		String result = "ERROR";
		Map<String, Object> inParamMap = new HashMap<String, Object>();
		inParamMap.put("i_name", user.getName());
		inParamMap.put("i_organization", user.getOrganization());
		inParamMap.put("i_email", user.getEmail());
		inParamMap.put("i_telephone", user.getTelephone());
		inParamMap.put("i_page_id", user.getPageId());
		inParamMap.put("i_is_hot", user.getIsHot());
		inParamMap.put("i_client_id", null);
		MapSqlParameterSource in = new MapSqlParameterSource().addValues(inParamMap);
		Map<String, Object> simpleJdbcCallResult = simpleJdbcCall.execute(in);
		System.out.println(simpleJdbcCallResult);
		result = simpleJdbcCallResult.get("result_json").toString();
		return result;
	}


}
