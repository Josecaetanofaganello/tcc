package br.com.projeto.condominio.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name  = "unidade")
public class Unidade implements Serializable{
	
	private static final long serialVersionUID = 4497780012978226548L;

	@Id
	private Long id;
	@Column
	private String identificacao;
	@Column
	private String bloco;
	@Column
	private String garagem;
	@Column
	private String veiculo;
	@Column
	private Long id_usuario;
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIdentificacao() {
		return identificacao;
	}

	public void setIdentificacao(String identificacao) {
		this.identificacao = identificacao;
	}

	public String getBloco() {
		return bloco;
	}

	public void setBloco(String bloco) {
		this.bloco = bloco;
	}

	public String getGaragem() {
		return garagem;
	}

	public void setGaragem(String garagem) {
		this.garagem = garagem;
	}

	public String getVeiculo() {
		return veiculo;
	}

	public void setVeiculo(String veiculo) {
		this.veiculo = veiculo;
	}

	public Long getProprietario() {
		return id_usuario;
	}

	public void setProprietario(Long id_usuario) {
		this.id_usuario = id_usuario;
	}
	
}