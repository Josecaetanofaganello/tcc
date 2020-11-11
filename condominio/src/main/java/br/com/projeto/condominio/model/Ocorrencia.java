package br.com.projeto.condominio.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "ocorrencias")
public class Ocorrencia implements Serializable {

	private static final long serialVersionUID = -7105268778905261354L;
	
	@Id
	private Long id;
	
	@Column(name = "data_ini")
	private Date dataInicial;
	
	@Column(name = "data_fim")
	private Date dataFinal;
	
	@Column
	private String status;
	
	@ManyToOne
	private Usuario usuario;
	
	@Column
	private String notificacao;
	
	@Column
	private String tratamento;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDataInicial() {
		return dataInicial;
	}

	public void setDataInicial(Date dataInicial) {
		this.dataInicial = dataInicial;
	}

	public Date getDataFinal() {
		return dataFinal;
	}

	public void setDataFinal(Date dataFinal) {
		this.dataFinal = dataFinal;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getNotificacao() {
		return notificacao;
	}

	public void setNotificacao(String notificacao) {
		this.notificacao = notificacao;
	}

	public String getTratamento() {
		return tratamento;
	}

	public void setTratamento(String tratamento) {
		this.tratamento = tratamento;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
