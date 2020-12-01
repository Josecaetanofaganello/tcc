package br.com.projeto.condominio.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "area_comum")
public class AreaComum implements Serializable {


	private static final long serialVersionUID = 3478480746837458153L;
	
	@Id
	private Long id;
	
	@Column(name = "descricao")
	private String descricao;

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

}
