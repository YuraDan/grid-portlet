package ru.gradis.sovzond.model.entity;

import ru.gradis.sovzond.model.domain.DomainObject;

/**
 * Created by donchenko-y on 6/6/16.
 */
public class Parcel implements DomainObject {
	private int id;
	private String cnum;
	private String area;
	private String dateCreated;
	private String addressNote;
	private String category;
	private String utilizationByDoc;
	private String cost;


	public Parcel() {
	}

	public Parcel(String cnum, String area, String dateCreated, String addressNote, String category, String utilizationByDoc, String cost) {
		this.cnum = cnum;
		this.area = area;
		this.dateCreated = dateCreated;
		this.addressNote = addressNote;
		this.category = category;
		this.utilizationByDoc = utilizationByDoc;
		this.cost = cost;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCnum() {
		return cnum;
	}

	public void setCnum(String cnum) {
		this.cnum = cnum;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(String dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getAddressNote() {
		return addressNote;
	}

	public void setAddressNote(String addressNote) {
		this.addressNote = addressNote;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getUtilizationByDoc() {
		return utilizationByDoc;
	}

	public void setUtilizationByDoc(String utilizationByDoc) {
		this.utilizationByDoc = utilizationByDoc;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}
}
