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
	public List<Tarefa> atualizar(List<Tarefa> tarefa) {
		
		int contador = 0;
		for	(Tarefa item : tarefa) {
			
			if(item.getId() > 0) {
			   tarefaRepository.saveAndFlush(item);	
			   contador ++;
			}else {
				tarefaRepository.save(item);
			   contador ++;
			}		
		}
		if(contador== tarefa.size()) {
			return tarefa;
		}
		return null;
		
		
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
