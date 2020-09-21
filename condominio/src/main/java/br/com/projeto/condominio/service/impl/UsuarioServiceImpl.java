package br.com.projeto.condominio.service.impl;

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
	public void pesquisar(Long id) {
		usuarioRepository.findById(id);
		
	}

	@Override
	public void deletar(Long id) {
		usuarioRepository.deleteById(id);
	}
}
