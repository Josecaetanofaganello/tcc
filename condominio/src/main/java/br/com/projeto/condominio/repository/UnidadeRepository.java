package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projeto.condominio.model.Unidade;

public interface UnidadeRepository extends JpaRepository<Unidade, Long> {

	
}
