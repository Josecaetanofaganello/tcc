package br.com.projeto.condominio.service;

import java.util.List;

import br.com.projeto.condominio.model.Usuario;

public interface UsuarioService {

		Usuario salvar(Usuario Usuario);
	    Usuario atualizar(Usuario usuario);
	    List<Usuario> pesquisar();
	    Usuario consultar(Long id);
	    Usuario autenticar(String username,String password);
	    void deletar(Long id);
	    Usuario autenticar(String username,String password);
	   
}
