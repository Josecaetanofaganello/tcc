package br.com.projeto.condominio.model;

import java.io.Serializable;
import java.math.BigDecimal;
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
@Table(name = "caixa")
@JsonDeserialize
public class ManterCaixa implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7840017833127524353L;

	@Id
	private Long id;
	
	@Column
	private String descricao;
	
	@Column
	private BigDecimal entrada;
	
	@Column
	private BigDecimal saida;
	
	@Column
	private BigDecimal saldo;
	
	@Column
	private Date data;
	
	@Column(name = "datainsercao")
	private Date dataInsercao;
	
}
