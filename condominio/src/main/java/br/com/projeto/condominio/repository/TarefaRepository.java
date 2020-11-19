package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.projeto.condominio.model.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long>{

	Tarefa findById(long id);
	
	@Query("select max(t.id) from Tarefa t")
	public Long buscarUltimoId();
}
