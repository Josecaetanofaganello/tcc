package br.com.projeto.condominio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.projeto.condominio.model.EnqueteUsuario;

public interface AssembleiaRepository extends JpaRepository<EnqueteUsuario, Long>{

	
	@Query(" EnqueteUsuario eu where eu.enquete = :idEnquete and eu.usuario = :idUsuario")
	public List<EnqueteUsuario> findByIds(@Param("idEnquete") Long idEnquete, @Param("idUsuario") Long idUsuario);
		
}
