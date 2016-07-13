package ru.gradis.sovzond.model.entity;


import ru.gradis.sovzond.model.domain.DomainObject;

/**
 * Created by donchenko-y on 6/1/16.
 */
public class Reference implements DomainObject {

	private int id;
	private String name;
	private String a2;
	private String a3;
	private String number;

	public Reference() {
	}

	public Reference(String name, String a2, String a3, String number) {
		this.name = name;
		this.a2 = a2;
		this.a3 = a3;
		this.number = number;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String geta2() {
		return a2;
	}

	public void seta2(String a2) {
		this.a2 = a2;
	}

	public String geta3() {
		return a3;
	}

	public void seta3(String a3) {
		this.a3 = a3;
	}

	public String getnumber() {
		return number;
	}

	public void setnumber(String number) {
		this.number = number;
	}
}
