package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projeto.condominio.model.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long>{

}
