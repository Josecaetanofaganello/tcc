package br.com.projeto.condominio.service;

import java.util.List;

import br.com.projeto.condominio.model.Usuario;

public interface UsuarioService {

		Usuario salvar(Usuario Usuario);
	    Usuario atualizar(Usuario usuario);
	    List<Usuario> pesquisar();
	    Usuario consultar(Long id);
	    void deletar(Long id);
	   
}
