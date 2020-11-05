package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.projeto.condominio.model.Enquete;
import br.com.projeto.condominio.repository.EnqueteRepository;
import br.com.projeto.condominio.service.EnqueteService;

public class EnquenteServiceImpl implements EnqueteService{

	@Autowired
	private EnqueteRepository enqueteRepository;

	@Override
	public void salvar(Enquete enquete) {
		enqueteRepository.save(enquete);
		
	}

	@Override
	public Enquete atualizar(Enquete enquete) {
		return enqueteRepository.saveAndFlush(enquete);
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
