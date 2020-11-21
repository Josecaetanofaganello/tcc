package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.projeto.condominio.model.Usuario;
import br.com.projeto.condominio.service.impl.UsuarioServiceImpl;
//import br.com.projeto.condominio.utils.JavaMailApp;
//import br.com.projeto.condominio.utils.JavaMailApp;
import br.com.projeto.condominio.utils.JavaMailApp;

@RestController()
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioServiceImpl usuarioServiceImpl;

	@GetMapping("/pesquisar")
	public @ResponseBody List<Usuario> buscarUsuario() {

		List<Usuario> usuarios = usuarioServiceImpl.pesquisar();
		

		return usuarios;
	}
	
	@PostMapping("/autenticar")
	public @ResponseBody Usuario autenticar(@RequestBody Usuario usuario) {

		Usuario isValid = usuarioServiceImpl.autenticar(usuario.getEmail(),usuario.getSenha());
		
		if(isValid!= null) {
			isValid.setSenha("");
			return isValid;
		}else {
		 throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Senha ou Usuario Incorretos!");
		}
		
	}
	
//	@PostMapping("/register")
//	public void cadastrar(@RequestBody Usuario usuario) {
//		usuarioServiceImpl.salvar(usuario);
//		
//	}
	
	@GetMapping("/consultar/{id}")
	  public @ResponseBody Usuario consultar(@PathVariable Long id) {
	    return usuarioServiceImpl.consultar(id);
	  }

	@PostMapping("/salvar")
	public @ResponseBody Usuario salvar(@RequestBody Usuario usuario) {
		Usuario usuarioRetorno = usuarioServiceImpl.salvar(usuario);
		
		if (usuarioRetorno == null) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email já cadastrado!");
		}
		usuarioRetorno.setSenha("");
		return usuarioRetorno;
	}
	
	@PostMapping("/atualizar")
	public void atualizar(@RequestBody Usuario usuario) {
		usuarioServiceImpl.atualizar(usuario);
	}
	
	
	@DeleteMapping("/deletar/{id}")
	public void deletar(@PathVariable Long id) {
		usuarioServiceImpl.deletar(id);
	}
	
	@GetMapping("/envia")
	public void forgot() {
		JavaMailApp mail = new JavaMailApp();
		
		mail.enviarEmail();
	}

}
