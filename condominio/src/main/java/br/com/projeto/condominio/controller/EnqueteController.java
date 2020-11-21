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

import br.com.projeto.condominio.model.Enquete;
import br.com.projeto.condominio.service.EnqueteService;

@RestController
@RequestMapping("/enquete")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EnqueteController {

	@Autowired
	private EnqueteService enqueteService;
	
	@GetMapping("/pesquisar")
	public @ResponseBody List<Enquete> buscarCaixa() {

		List<Enquete> caixas = enqueteService.pesquisar();

		return caixas;
	}
	
	@GetMapping("/consultar/{id}")
	  public @ResponseBody Enquete consultar(@PathVariable Long id) {
	    return enqueteService.consultar(id);
	  }

	@PostMapping("/salvar")
	public @ResponseBody String salvar(@RequestBody Enquete enquete) {
		enqueteService.salvar(enquete);
		return "Sucesso";
	}
	
	@PostMapping("/atualizar")
	public @ResponseBody List<Enquete> atualizar(@RequestBody List<Enquete> manterEnquete) {
		List<Enquete> result = enqueteService.atualizar(manterEnquete);
		if(result!= null) {
			
		 return result;	
		}else {
			
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Falha ao gravar algum dos registros!");
		}
		
		
	}
	
	
	@DeleteMapping("/deletar/{id}")
	public void deletar(@PathVariable Long id) {
		enqueteService.deletar(id);
	}
}
