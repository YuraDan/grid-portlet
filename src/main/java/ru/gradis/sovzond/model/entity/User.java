package ru.gradis.sovzond.model.entity;

import ru.gradis.sovzond.model.domain.DomainObject;

/**
 * Created by donchenko-y on 7/6/16.
 */

public class User implements DomainObject {

	private String email;
	private boolean isHot;
	private String name;
	private String organization;
	private Integer pageId;
	private String telephone;
	private Integer clientId;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean getIsHot() {
		return isHot;
	}

	public void setIsHot(boolean hot) {
		isHot = hot;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public Integer getPageId() {
		return pageId;
	}

	public void setPageId(Integer pageId) {
		this.pageId = pageId;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Integer getClientId() {
		return clientId;
	}

	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}
}
