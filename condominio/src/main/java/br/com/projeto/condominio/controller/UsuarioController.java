package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.condominio.model.Usuario;
import br.com.projeto.condominio.repository.UsuarioRepository;

@RestController()
@RequestMapping(value = "/usuario", 
	produces = MediaType.APPLICATION_JSON_VALUE, 
	consumes = MediaType.APPLICATION_JSON_VALUE)
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@GetMapping("/buscarUsuario")
	public @ResponseBody List<Usuario> buscarUsuario() {

		List<Usuario> usuario = usuarioRepository.findAll();

		return usuario;
	}

	@PostMapping("/salvar")
	public void salvar(@RequestBody Usuario usuario) {
		
	}

}
