package br.com.projeto.condominio.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

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

	@Transactional
	@Override
	public List<Tarefa> atualizar(List<Tarefa> tarefa) {
		
		Long id = 0L;
		
		int contador = 0;
		Tarefa tarefaRetorno;
		List<Tarefa> listaRetorno = new ArrayList<Tarefa>();
		for	(Tarefa item : tarefa) {
			tarefaRetorno = new Tarefa();
			
			if(item.getId() > 0) {
			  tarefaRetorno = tarefaRepository.saveAndFlush(item);	
			   contador ++;
			}else {
				id = tarefaRepository.buscarUltimoId();
				id = (id == null ? 1 : id + 1);
				item.setId(id);
				tarefaRetorno = tarefaRepository.save(item);
//				tarefaRepository.flush();
			long teste =	item.getId();
			   contador ++;
			}
			
			listaRetorno.add(tarefaRetorno);
		}
		
		return listaRetorno;
		
		
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
