package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.Usuario;
import br.com.projeto.condominio.repository.UsuarioRepository;
import br.com.projeto.condominio.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public Usuario salvar(Usuario usuario) {
		usuarioRepository.save(usuario);
		return null;
	}

	@Override
	public Usuario atualizar(Usuario usuario) {
		usuarioRepository.save(usuario);
		return null;
	}


	@Override
	public void deletar(Long id) {
		usuarioRepository.deleteById(id);
	}

	@Override
	public List<Usuario> pesquisar() {
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario consultar(Long id) {
		return usuarioRepository.findById(id).get();
	}
	
	public Usuario autenticar(String email, String password) {
		
		
		 Usuario user = usuarioRepository.findByemail(email,password);
		
		 return user;
		 
	}
}

