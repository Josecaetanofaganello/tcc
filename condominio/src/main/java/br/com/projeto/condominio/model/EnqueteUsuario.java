package br.com.projeto.condominio.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name = "enquete_votos")
public class EnqueteUsuario implements Serializable{

	private static final long serialVersionUID = 5621154642449122113L;

	@Id
	private EnqueteUsuarioPK primaryKey = new EnqueteUsuarioPK();
	
	@Column(name = "id_enquete", insertable = false, updatable = false )
	private Long enquete;
	
	@Column(name="id_usuario", insertable = false, updatable = false) 
	private Long usuario;
	
	@Column(name = "tipo_voto", updatable = false)
	private int tipoVoto;

	public EnqueteUsuarioPK getPrimaryKey() {
		return primaryKey;
	}

	public void setPrimaryKey(EnqueteUsuarioPK primaryKey) {
		this.primaryKey = primaryKey;
	}

	public Long getEnquete() {
		return enquete;
	}

	public void setEnquete(Long enquete) {
		this.enquete = enquete;
	}

	public Long getUsuario() {
		return usuario;
	}

	public void setUsuario(Long usuario) {
		this.usuario = usuario;
	}

	public int getTipoVoto() {
		return tipoVoto;
	}

	public void setTipoVoto(int tipoVoto) {
		this.tipoVoto = tipoVoto;
	}
	
	
}
