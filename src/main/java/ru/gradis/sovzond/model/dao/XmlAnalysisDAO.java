package ru.gradis.sovzond.model.dao;


/**
 * Created by donchenko-y on 7/1/16.
 */
public interface XmlAnalysisDAO {

	public Object executeAnalysis(byte[] file, String name, String extension);

}
