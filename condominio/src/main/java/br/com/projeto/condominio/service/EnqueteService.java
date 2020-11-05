package br.com.projeto.condominio.service;

import java.util.List;

import br.com.projeto.condominio.model.Enquete;

public interface EnqueteService {
	Enquete salvar(Enquete enquete);
	Enquete atualizar(Enquete enquete);
    List<Enquete> pesquisar();
    Enquete consultar(Long id);
    void deletar(Long id);
}
