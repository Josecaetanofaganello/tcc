package br.com.projeto.condominio.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Embeddable
@JsonIgnoreProperties(ignoreUnknown = true)
public class EnqueteUsuarioPK implements Serializable {

	private static final long serialVersionUID = -6629752973776040273L;
	
	@ManyToOne
	@JoinColumn(name = "id_enquete", insertable = false, updatable = false )
	private Enquete enquete;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario", insertable = false, updatable = false )
	private Usuario usuario;

	public Enquete getEnquete() {
		return enquete;
	}

	public void setEnquete(Enquete enquete) {
		this.enquete = enquete;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	

}
