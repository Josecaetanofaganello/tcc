package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import br.com.projeto.condominio.model.Unidade;
import br.com.projeto.condominio.service.impl.UnidadeServiceImpl;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/unidade")
public class UnidadeController {
	
	@Autowired
	private UnidadeServiceImpl unidadeServiceImpl;
	
	@GetMapping("/listar")
	public @ResponseBody List<Unidade> listar() {
		return unidadeServiceImpl.listar();
	}
	
	@PostMapping("/salvar")
	public @ResponseBody Unidade salvar(@RequestBody Unidade unidade) {
		return unidadeServiceImpl.salvar(unidade);
	}
	
	@PutMapping("/atualizar")
	public @ResponseBody Unidade atualizar(@RequestBody Unidade unidade) {
		
		return unidadeServiceImpl.atualizar(unidade);
	}
	
	@DeleteMapping("/deletar/{id}")
	public void deletar(@PathVariable Long id) {
		unidadeServiceImpl.deletar(id);
	}
	
}
