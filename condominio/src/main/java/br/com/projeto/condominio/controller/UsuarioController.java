package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.condominio.model.Usuario;
import br.com.projeto.condominio.service.impl.UsuarioServiceImpl;

@RestController()
@RequestMapping(value = "/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioServiceImpl usuarioServiceImpl;

	@GetMapping("/pesquisar")
	public @ResponseBody List<Usuario> buscarUsuario() {

		List<Usuario> usuarios = usuarioServiceImpl.pesquisar();

		return usuarios;
	}
	
	@GetMapping("/consultar/{id}")
	  public @ResponseBody Usuario consultar(@PathVariable Long id) {
	    return usuarioServiceImpl.consultar(id);
	  }

	@PostMapping("/salvar")
	public @ResponseBody String salvar(@RequestBody Usuario usuario) {
		usuarioServiceImpl.salvar(usuario);
		return "Sucesso";
	}
	
	@PostMapping("/atualizar")
	public void atualizar(@RequestBody Usuario usuario) {
		usuarioServiceImpl.atualizar(usuario);
	}
	
	
	@DeleteMapping("/deletar/{id}")
	public void deletar(@PathVariable Long id) {
		usuarioServiceImpl.deletar(id);
	}

}
