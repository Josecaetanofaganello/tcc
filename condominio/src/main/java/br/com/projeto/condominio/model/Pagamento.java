package br.com.projeto.condominio.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "pagamentos")
public class Pagamento {

	
	@Id
	private Long id;
	
	@ManyToOne()
	@JoinColumn(name = "id_usuario")
	private Usuario idUsuario;
	
	@Column
	private String status;
	
	@Column
	private Date peridoReferencia;
	
	@Column
	private BigDecimal valor;
	
	@Column(name = "data_atualizacao")
	private Date datAtualizacao;
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Usuario idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getPeridoReferencia() {
		return peridoReferencia;
	}

	public void setPeridoReferencia(Date peridoReferencia) {
		this.peridoReferencia = peridoReferencia;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public Date getDatAtualizacao() {
		return datAtualizacao;
	}

	public void setDatAtualizacao(Date datAtualizacao) {
		this.datAtualizacao = datAtualizacao;
	}

	
}
