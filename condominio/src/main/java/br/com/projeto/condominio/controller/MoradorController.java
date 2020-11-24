package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.projeto.condominio.model.Morador;
import br.com.projeto.condominio.service.MoradorService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/morador")
public class MoradorController {

	@Autowired
	private MoradorService moradorService;
	
	@PostMapping("/salvar")
	private @ResponseBody Morador salvar(@RequestBody Morador morador) {

		Morador moradorRetorno = moradorService.salvar(morador);

		if (moradorRetorno == null) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Não foi possível cadastrar a ocorrência.");
		}

		return moradorRetorno;
	}
	
	@PutMapping("/atualizar")
	private @ResponseBody List<Morador> atualizar(@RequestBody List<Morador> moradores) {

		List<Morador>moradoresRetorno = moradorService.atualizar(moradores);

		if (moradoresRetorno == null || moradoresRetorno.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Não foi possível cadastrar a ocorrência.");
		}

		return moradoresRetorno;
	}
	

	@GetMapping("/listar")
	public @ResponseBody List<Morador> listar() {

		List<Morador> moradores = moradorService.pesquisar();

		return moradores;
	}

	@GetMapping("/consultar/{id}")
	public @ResponseBody Morador consultar(@PathVariable Long id) {
		return moradorService.consultar(id);

	}
	
	@DeleteMapping("/deletar")
	public void delete(Long id) {
		moradorService.deletar(id);
	}
}
