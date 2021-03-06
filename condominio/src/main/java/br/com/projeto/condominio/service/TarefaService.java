package br.com.projeto.condominio.service;

import java.util.List;

import br.com.projeto.condominio.model.Tarefa;

public interface TarefaService {
	void salvar(Tarefa tarefa);
	List<Tarefa> atualizar(List<Tarefa>  tarefa);
    List<Tarefa> pesquisar();
    Tarefa consultar(Long id);
    void deletar(Long id);
}
