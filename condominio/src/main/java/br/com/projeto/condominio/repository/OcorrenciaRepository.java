package br.com.projeto.condominio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.projeto.condominio.model.Ocorrencia;

public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {
	
	
	@Query("select o from Ocorrencia o where o.idUsuario = :idUsuario")
	public List<Ocorrencia> findByIdUser(@Param("idUsuario") Long idUsuario);
	
}
