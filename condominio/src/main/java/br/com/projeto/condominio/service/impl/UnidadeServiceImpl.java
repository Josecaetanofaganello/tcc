package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.Unidade;
import br.com.projeto.condominio.repository.UnidadeRepository;

@Service
public class UnidadeServiceImpl {
	
	@Autowired
	private UnidadeRepository unidadeRepository;
		
	public List<Unidade> listar(){
		return unidadeRepository.findAll();
	}
}
