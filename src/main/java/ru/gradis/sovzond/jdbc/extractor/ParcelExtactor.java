package ru.gradis.sovzond.jdbc.extractor;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import ru.gradis.sovzond.model.entity.Parcel;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by donchenko-y on 6/8/16.
 */
public class ParcelExtactor implements ResultSetExtractor<Parcel> {

	@Override
	public Parcel extractData(ResultSet rs) throws SQLException, DataAccessException {
		Parcel parcel = new Parcel();

		parcel.setId(rs.getInt("id"));
		parcel.setAddressNote(rs.getString("addressnote"));
		parcel.setArea(rs.getString("area"));
		parcel.setCategory(rs.getString("category"));
		parcel.setCnum(rs.getString("cnum"));
		parcel.setDateCreated(rs.getString("datecreated"));
		parcel.setUtilizationByDoc(rs.getString("utilizationbydoc"));
		parcel.setCost(rs.getString("cost"));

		return parcel;
	}
}
