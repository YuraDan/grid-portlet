package ru.gradis.sovzond.model.dao;

import ru.gradis.sovzond.model.entity.Reference;

import java.util.List;
import java.util.Map;

/**
 * Created by donchenko-y on 6/1/16.
 */
public interface ReferenceDAO {

	public Reference get(int Id);

	public List<Reference> list();

	public List<Map<String, Object>> selectAll();
}
