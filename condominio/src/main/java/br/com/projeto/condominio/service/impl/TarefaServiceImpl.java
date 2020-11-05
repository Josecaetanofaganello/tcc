package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.Tarefa;
import br.com.projeto.condominio.repository.TarefaRepository;
import br.com.projeto.condominio.service.TarefaService;

@Service
public class TarefaServiceImpl implements TarefaService{

	@Autowired
	private TarefaRepository tarefaRepository;
	
	@Override
	public void salvar(Tarefa tarefa) {
		tarefaRepository.save(tarefa);
	}

	@Override
	public Tarefa atualizar(Tarefa tarefa) {
		return tarefaRepository.saveAndFlush(tarefa);
	}

	@Override
	public List<Tarefa> pesquisar() {
		return tarefaRepository.findAll();
	}

	@Override
	public Tarefa consultar(Long id) {
		return tarefaRepository.findById(id).get();
	}

	@Override
	public void deletar(Long id) {
		tarefaRepository.deleteById(id);
		
	}

}
