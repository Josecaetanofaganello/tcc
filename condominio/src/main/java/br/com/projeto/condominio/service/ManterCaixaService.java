package br.com.projeto.condominio.service;

import java.util.List;

import br.com.projeto.condominio.model.ManterCaixa;

public interface ManterCaixaService {
	ManterCaixa salvar(ManterCaixa manterCaixa);
	List<ManterCaixa> atualizar(List<ManterCaixa> manterCaixa);
    List<ManterCaixa> pesquisar();
    ManterCaixa consultar(Long id);
    void deletar(Long id);
}
