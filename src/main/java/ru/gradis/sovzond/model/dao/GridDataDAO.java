package ru.gradis.sovzond.model.dao;

import java.util.Map;

/**
 * Created by donchenko-y on 7/13/16.
 */


public interface GridDataDAO {

	public String getGridData(String dataSetName, Integer userId, String param);

	public void updateGridData(String dataSetName, Integer userId, String param);

	public void deleteGridData(String dataSetName, Integer userId, String param);

	public Map<String, Object> createGridData(String dataSetName, Integer userId, String param);

}
