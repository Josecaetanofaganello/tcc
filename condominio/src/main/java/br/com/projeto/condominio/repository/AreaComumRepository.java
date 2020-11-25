package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projeto.condominio.model.AreaComum;

public interface AreaComumRepository extends JpaRepository<AreaComum, Long> {

	
}
