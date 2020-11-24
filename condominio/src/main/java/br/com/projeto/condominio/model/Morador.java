package br.com.projeto.condominio.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "moradores")
public class Morador implements Serializable{

	private static final long serialVersionUID = -5900425731586827300L;
	

	@Id
	private Long id;
	@Column
	private String nome;
	@Column
	private String contato;
	@Column
	private String email;
	@Column(name = "id_unidade")
	private Long idUnidade;
	@Column
	private String tipo;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getContato() {
		return contato;
	}
	public void setContato(String contato) {
		this.contato = contato;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getIdUnidade() {
		return idUnidade;
	}
	public void setIdUnidade(Long idUnidade) {
		this.idUnidade = idUnidade;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	
}
