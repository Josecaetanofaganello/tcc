package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import br.com.projeto.condominio.model.Ocorrencia;
import br.com.projeto.condominio.repository.OcorrenciaRepository;
import br.com.projeto.condominio.service.OcorrenciaService;

@Service
public class OcorrenciaServiceImpl implements OcorrenciaService {
	
	public static final String SINDICO = "Sindico";
	public static final String MORADOR = "Morador";

	@Autowired
	private OcorrenciaRepository ocorrenciaRepository;
	
	@Override
	public Ocorrencia salvar(Ocorrencia ocorrencia) {
		return ocorrenciaRepository.save(ocorrencia);
	}

	@Override
	public List<Ocorrencia> atualizar(List<Ocorrencia> ocorrencias) {
		return ocorrenciaRepository.saveAll(ocorrencias);
	}

	@Override
	public List<Ocorrencia> pesquisar(Long idUsuarioLogado, String tipoUsuarioLogado) {
		
		if (tipoUsuarioLogado.equals(SINDICO)) {
			return ocorrenciaRepository.findAll();	
		
		}else if(tipoUsuarioLogado.equals(MORADOR)) {
			return ocorrenciaRepository.findByIdUser(idUsuarioLogado);
		}
		
		return null;
		
	}

	@Override
	public List<Ocorrencia> consultar(Long idUsuario) {
		return ocorrenciaRepository.findByIdUser(idUsuario);
	}

	@Override
	public void deletar(Long id) {
		ocorrenciaRepository.deleteById(id);
	}

}
