package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.projeto.condominio.model.Tarefa;
import br.com.projeto.condominio.repository.TarefaRepository;
import br.com.projeto.condominio.service.TarefaService;

public class TarefaServiceImpl implements TarefaService{

	@Autowired
	private TarefaRepository tarefaRepository;
	
	@Override
	public void salvar(Tarefa tarefa) {
		tarefaRepository.save(tarefa);
	}

	@Override
	public Tarefa atualizar(Tarefa usuario) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Tarefa> pesquisar() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Tarefa consultar(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deletar(Long id) {
		// TODO Auto-generated method stub
		
	}

}
