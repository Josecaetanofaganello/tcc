package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.ManterCaixa;
import br.com.projeto.condominio.repository.ManterCaixaRepository;
import br.com.projeto.condominio.service.ManterCaixaService;

@Service
public class ManterCaixaServiceImpl implements ManterCaixaService {
	
	@Autowired
	private ManterCaixaRepository manterCaixaRepository;

	@Override
	public ManterCaixa salvar(ManterCaixa manterCaixa) {
		return manterCaixaRepository.save(manterCaixa);
	}

	@Override
	public ManterCaixa atualizar(ManterCaixa manterCaixa) {
		manterCaixaRepository.saveAndFlush(manterCaixa);
		return null;
	}

	@Override
	public List<ManterCaixa> pesquisar() {
		return manterCaixaRepository.findAll();
	}

	@Override
	public ManterCaixa consultar(Long id) {
		return manterCaixaRepository.findById(id).get();
	}

	@Override
	public void deletar(Long id) {
		manterCaixaRepository.deleteById(id);
		
	}

}
