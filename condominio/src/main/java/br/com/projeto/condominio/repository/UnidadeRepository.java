package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.projeto.condominio.model.Unidade;

public interface UnidadeRepository extends JpaRepository<Unidade, Long> {
	
	
//	@Query("select u from Unidade u where u.bloco :bloco and u.identificacao :apto")
//	public Unidade findByBlocoApto(@Param("bloco") String bloco, @Param("apto") String apto);

	
}
