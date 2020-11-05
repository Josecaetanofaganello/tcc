package br.com.projeto.condominio.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name = "enquete")
@JsonDeserialize
public class Enquete {

	@Id
	private Long id;
	
	@Column(name ="data_ini" )
	private Date dataInicial;
	
	@Column(name = "data_fim")
	private Date dataFinal;
	
	@Column
	private String assunto;
	
	@Column(name = "status")
	private String statusEnquete;
	
	@Column(name = "data_criacao")
	private Date dataCriacao;
}
