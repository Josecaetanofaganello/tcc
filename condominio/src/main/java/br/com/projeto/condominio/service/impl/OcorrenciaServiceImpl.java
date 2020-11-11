package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.Ocorrencia;
import br.com.projeto.condominio.repository.OcorrenciaRepository;
import br.com.projeto.condominio.service.OcorrenciaService;

@Service
public class OcorrenciaServiceImpl implements OcorrenciaService {

	@Autowired
	private OcorrenciaRepository ocorrenciaRepository;
	
	@Override
	public Ocorrencia salvar(Ocorrencia ocorrencia) {
		return ocorrenciaRepository.save(ocorrencia);
	}

	@Override
	public Ocorrencia atualizar(Ocorrencia ocorrencia) {
		return ocorrenciaRepository.saveAndFlush(ocorrencia);
	}

	@Override
	public List<Ocorrencia> pesquisar() {
		return ocorrenciaRepository.findAll();
	}

	@Override
	public Ocorrencia consultar(Long id) {
		return ocorrenciaRepository.findById(id).get();
	}

	@Override
	public void deletar(Long id) {
		ocorrenciaRepository.deleteById(id);
	}

}
