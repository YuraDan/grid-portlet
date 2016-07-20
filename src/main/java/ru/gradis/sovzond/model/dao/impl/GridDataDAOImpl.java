package ru.gradis.sovzond.model.dao.impl;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import ru.gradis.sovzond.model.dao.GridDataDAO;
import ru.gradis.sovzond.model.entity.PortletParam;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by donchenko-y on 7/13/16.
 */

public class GridDataDAOImpl implements GridDataDAO {

	private static final Log log = LogFactoryUtil.getLog(GridDataDAOImpl.class);

	private SimpleJdbcCall simpleJdbcCall;

	public GridDataDAOImpl(DataSource dataSource) {
		this.simpleJdbcCall = new SimpleJdbcCall(dataSource).withSchemaName("config").
				withProcedureName("pr_get_json_data").
				declareParameters(
						new SqlParameter("i_dataset_name", Types.CLOB),
						new SqlParameter("i_dataset_id", Types.BIGINT),
						new SqlParameter("i_user_id", Types.BIGINT),
						new SqlParameter("i_params", Types.NULL)
				);
	}

	@Override
	public String getGridData(String dataSetName, Integer userId) {

		Map<String, Object> inParamMap = new HashMap<String, Object>();
		inParamMap.put("i_dataset_name", dataSetName);
		inParamMap.put("i_dataset_id", null);
		inParamMap.put("i_params", null);
		inParamMap.put("i_user_id", userId);
		MapSqlParameterSource in = new MapSqlParameterSource().addValues(inParamMap);
		Map<String, Object> simpleJdbcCallResult = simpleJdbcCall.execute(in);
		log.info(simpleJdbcCallResult);
		String result = simpleJdbcCallResult.get("r_json").toString();
		return result;

	}
}

