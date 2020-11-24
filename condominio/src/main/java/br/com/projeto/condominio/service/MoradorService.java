package br.com.projeto.condominio.service;

import java.util.List;

import br.com.projeto.condominio.model.Morador;

public interface MoradorService {

	Morador salvar(Morador morador);
	List<Morador> atualizar(List<Morador> moradores);
    List<Morador> pesquisar();
    Morador consultar(Long id);
    void deletar(Long id);
}
