package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.projeto.condominio.model.ManterCaixa;

public interface ManterCaixaRepository extends JpaRepository<ManterCaixa, Long>{
	
	@Query("select max(t.id) from ManterCaixa t")
	public Long buscarUltimoId();

}
