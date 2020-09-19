package br.com.projeto.condominio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "usuarios")
@Getter @Setter @NoArgsConstructor
public class Usuario {

	@Id
	private Long id;
	
	@Column
	private String nome;
}
