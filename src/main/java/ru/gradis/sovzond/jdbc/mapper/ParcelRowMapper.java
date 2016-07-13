package ru.gradis.sovzond.jdbc.mapper;

import ru.gradis.sovzond.jdbc.extractor.ParcelExtactor;
import ru.gradis.sovzond.model.entity.Parcel;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by donchenko-y on 6/8/16.
 */
public class ParcelRowMapper implements RowMapper<Parcel> {

	@Override
	public Parcel mapRow(ResultSet rs, int rowNum) throws SQLException {
		ParcelExtactor parcelExtactor = new ParcelExtactor();
		return parcelExtactor.extractData(rs);
	}
}
