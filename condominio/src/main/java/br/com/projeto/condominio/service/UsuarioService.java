package br.com.projeto.condominio.service;

import br.com.projeto.condominio.model.Usuario;

public interface UsuarioService {

		Usuario salvar(Usuario Usuario);
	    Usuario atualizar(Usuario usuario);
	    void pesquisar(Long id);
	    void deletar(Long id);
	   
}
