package ru.gradis.sovzond.model.dao;

import ru.gradis.sovzond.model.entity.Parcel;

import java.util.List;
import java.util.Map;

/**
 * Created by donchenko-y on 6/6/16.
 */

public interface ParcelDAO {
	public Parcel get(int Id);

	public List<Parcel> list();

	public List<Map<String, Object>> selectAll();
}
