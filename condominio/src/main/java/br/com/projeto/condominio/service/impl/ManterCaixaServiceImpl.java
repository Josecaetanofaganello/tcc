package br.com.projeto.condominio.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.Enquete;
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
	public List<ManterCaixa> atualizar(List<ManterCaixa>  manterCaixa) {
		Long id;
		List<ManterCaixa> retornoLista = new ArrayList<ManterCaixa>();
		for (ManterCaixa item : manterCaixa ){
			if(item.getId() > 0) {
				manterCaixaRepository.saveAndFlush(item);
				retornoLista.add(item);
			}else {
				id = manterCaixaRepository.buscarUltimoId();
				item.setId( (id == null ? 1 : id + 1));	
				manterCaixaRepository.save(item);
				retornoLista.add(item);
			}							
		}
		if(manterCaixa.size()== retornoLista.size()) {			
			return retornoLista;
		}else {
			

			return null;	
		}
		
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
