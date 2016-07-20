package ru.gradis.sovzond.model.dao.impl;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import ru.gradis.sovzond.model.dao.GridConfigDAO;
import ru.gradis.sovzond.model.domain.FileVO;
import ru.gradis.sovzond.model.entity.PortletParam;
import ru.gradis.sovzond.portlet.controller.HomeController;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by donchenko-y on 7/13/16.
 */

public class GridConfigDAOImpl implements GridConfigDAO {

	@SuppressWarnings("SpringJavaAutowiringInspection")
	@Autowired
	public PortletParam portletParam;


	private static final Log log = LogFactoryUtil.getLog(GridConfigDAOImpl.class);

	private SimpleJdbcCall simpleJdbcCall;

	public GridConfigDAOImpl(DataSource dataSource) {
		this.simpleJdbcCall = new SimpleJdbcCall(dataSource).withSchemaName("config").
				withProcedureName("pr_get_json_portlet").
				declareParameters(
						new SqlParameter("i_layout_id", Types.CLOB),
						new SqlParameter("i_portlet_id", Types.CLOB),
						new SqlParameter("i_user_id", Types.BIGINT)
				);
	}

	@Override
	public String getGridConfig(Integer componentID) {
		Map<String, Object> inParamMap = new HashMap<String, Object>();
		inParamMap.put("i_layout_id", portletParam.getLAYOUT_ID());
		inParamMap.put("i_portlet_id", portletParam.getPORTLET_ID());
		inParamMap.put("i_user_id", portletParam.getCURRENT_PORTAL_USER_ID());
		MapSqlParameterSource in = new MapSqlParameterSource().addValues(inParamMap);
		Map<String, Object> simpleJdbcCallResult = simpleJdbcCall.execute(in);
		log.info(simpleJdbcCallResult);
		String result = simpleJdbcCallResult.get("r_json").toString();
		return result;

	}

}
