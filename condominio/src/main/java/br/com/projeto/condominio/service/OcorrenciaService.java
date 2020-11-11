package br.com.projeto.condominio.service;

import java.util.List;

import br.com.projeto.condominio.model.Ocorrencia;

public interface OcorrenciaService {

	Ocorrencia salvar(Ocorrencia ocorrencia);
	Ocorrencia atualizar(Ocorrencia ocorrencia);
    List<Ocorrencia> pesquisar();
    Ocorrencia consultar(Long id);
    void deletar(Long id);
    
}
