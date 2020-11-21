package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.projeto.condominio.model.Enquete;

public interface EnqueteRepository extends JpaRepository<Enquete, Long>{

	
	@Query("select max(t.id) from Enquete t")
	public Long buscarUltimoId();
}
