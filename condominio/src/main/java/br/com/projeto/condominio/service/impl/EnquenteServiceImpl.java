package br.com.projeto.condominio.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.Enquete;
import br.com.projeto.condominio.model.Tarefa;
import br.com.projeto.condominio.repository.EnqueteRepository;
import br.com.projeto.condominio.service.EnqueteService;

@Service
public class EnquenteServiceImpl implements EnqueteService{

	@Autowired
	private EnqueteRepository enqueteRepository;

	@Override
	public Enquete salvar(Enquete enquete) {
		return enqueteRepository.save(enquete);
		
	}

	@Override
	public List<Enquete> atualizar(List<Enquete> enquete) {
		
		Long id;
		List<Enquete> retornoLista = new ArrayList<Enquete>();
		for (Enquete item : enquete ){
			if(item.getId() > 0) {
				enqueteRepository.saveAndFlush(item);
				retornoLista.add(item);
			}else {
				id = enqueteRepository.buscarUltimoId();
				item.setId( (id == null ? 1 : id + 1));	
				enqueteRepository.save(item);
				retornoLista.add(item);
			}							
		}
		if(enquete.size()== retornoLista.size()) {			
			return retornoLista;
		}else {
			

			return null;	
		}
		
		
	}

	@Override
	public List<Enquete> pesquisar() {
		return enqueteRepository.findAll();
	}

	@Override
	public Enquete consultar(Long id) {
		return enqueteRepository.findById(id).get();
	}

	@Override
	public void deletar(Long id) {
		enqueteRepository.deleteById(id);;
	}


}
