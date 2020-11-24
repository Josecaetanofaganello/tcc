package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.Morador;
import br.com.projeto.condominio.repository.MoradorRepository;
import br.com.projeto.condominio.service.MoradorService;

@Service
public class MoradorServiceImpl implements MoradorService {
	
	@Autowired
	private MoradorRepository moradorRepository;

	@Override
	public Morador salvar(Morador morador) {
		return moradorRepository.save(morador);
	}

	@Override
	public List<Morador> atualizar(List<Morador> moradores) {
		return moradorRepository.saveAll(moradores);
	}

	@Override
	public List<Morador> pesquisar() {
		return moradorRepository.findAll();
	}

	@Override
	public Morador consultar(Long id) {
		return moradorRepository.findById(id).get();
	}

	@Override
	public void deletar(Long id) {
		moradorRepository.deleteById(id);
	}

}
