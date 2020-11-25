package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.AreaComum;
import br.com.projeto.condominio.repository.AreaComumRepository;
import br.com.projeto.condominio.service.AreaComumService;

@Service
public class AreaComumServiceImpl implements AreaComumService {

	@Autowired
	private AreaComumRepository areaComumRepository;
	
	@Override
	public List<AreaComum> listar() {
		return areaComumRepository.findAll();
	}

}
