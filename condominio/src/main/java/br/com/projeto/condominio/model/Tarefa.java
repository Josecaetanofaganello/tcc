package br.com.projeto.condominio.model;

import java.io.Serializable;
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
@Table(name = "tarefas")
@JsonDeserialize
public class Tarefa implements Serializable{

	private static final long serialVersionUID = 4992671923581164455L;

	@Id
	private Long id;
	
	@Column
	private String descricao;
	
	@Column(name = "data_ini")
	private Date dataInicial;
	
	@Column(name = "data_fim")
	private Date dataFinal;
	
	@Column(name = "data_atualizacao")
	private Date dataAtualizacao;
	
	@Column(name = "status")
	private String statusTarefa;
	
	@Column(name = "responsavel")
	private String nomeResponsavel;
	
}
