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

	private DataSource dataSource;

	public GridDataDAOImpl(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	public String getGridData(String dataSetName, Integer userId, String param) {

//		this.simpleJdbcCall = new SimpleJdbcCall(dataSource).withSchemaName("config").
//				withProcedureName("pr_get_json_data").
//				declareParameters(
//						new SqlParameter("i_dataset_name", Types.CLOB),
//						new SqlParameter("i_dataset_id", Types.BIGINT),
//						new SqlParameter("i_user_id", Types.BIGINT),
//						new SqlParameter("i_params", Types.CLOB)
//				);
		SimpleJdbcCall simpleJdbcCall = initGridCrudProc(dataSource, "config", "pr_get_json_data");

		Map<String, Object> inParamMap = new HashMap<String, Object>();
		inParamMap.put("i_dataset_name", dataSetName);
		inParamMap.put("i_dataset_id", null);
		inParamMap.put("i_params", param);
		inParamMap.put("i_user_id", userId);
		MapSqlParameterSource in = new MapSqlParameterSource().addValues(inParamMap);

		Map<String, Object> simpleJdbcCallResult = simpleJdbcCall.execute(in);
		log.info(simpleJdbcCallResult);
		String result = simpleJdbcCallResult.get("r_json").toString();
		return result;

	}

	@Override
	public void updateGridData(String dataSetName, Integer userId, String param) {

		SimpleJdbcCall simpleJdbcCall = initGridCrudProc(dataSource, "config", "pr_update_json_data");

		Map<String, Object> inParamMap = new HashMap<String, Object>();
		inParamMap.put("i_dataset_name", dataSetName);
		inParamMap.put("i_dataset_id", null);
		inParamMap.put("i_params", param);
		inParamMap.put("i_user_id", userId);

		MapSqlParameterSource in = new MapSqlParameterSource().addValues(inParamMap);
		simpleJdbcCall.execute(in);
	}

	@Override
	public void deleteGridData(String dataSetName, Integer userId, String param) {

		SimpleJdbcCall simpleJdbcCall = initGridCrudProc(dataSource, "config", "pr_delete_json_data");

		Map<String, Object> inParamMap = new HashMap<String, Object>();
		inParamMap.put("i_dataset_name", dataSetName);
		inParamMap.put("i_dataset_id", null);
		inParamMap.put("i_params", param);
		inParamMap.put("i_user_id", userId);

		MapSqlParameterSource in = new MapSqlParameterSource().addValues(inParamMap);
		simpleJdbcCall.execute(in);
	}

	@Override
	public Map<String, Object> createGridData(String dataSetName, Integer userId, String param) {

		SimpleJdbcCall simpleJdbcCall = initGridCrudProc(dataSource, "config", "pr_insert_json_data");

		Map<String, Object> inParamMap = new HashMap<String, Object>();
		inParamMap.put("i_dataset_name", dataSetName);
		inParamMap.put("i_dataset_id", null);
		inParamMap.put("i_params", param);
		inParamMap.put("i_user_id", userId);
		MapSqlParameterSource in = new MapSqlParameterSource().addValues(inParamMap);

		Map<String, Object> simpleJdbcCallResult = simpleJdbcCall.execute(in);
		log.info(simpleJdbcCallResult);
		return simpleJdbcCallResult;

	}

	private SimpleJdbcCall initGridCrudProc(DataSource dataSource, String schema, String procName) {
		return new SimpleJdbcCall(dataSource).withSchemaName(schema).
				withProcedureName(procName).
				declareParameters(
						new SqlParameter("i_dataset_name", Types.CLOB),
						new SqlParameter("i_dataset_id", Types.BIGINT),
						new SqlParameter("i_user_id", Types.BIGINT),
						new SqlParameter("i_params", Types.CLOB)
				);
	}
}

