package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.condominio.model.ManterCaixa;
import br.com.projeto.condominio.service.ManterCaixaService;

@RestController()
@RequestMapping(value = "/caixa")
public class ManterCaixaController {

	@Autowired
	private ManterCaixaService manterCaixaService;
	
	
	@GetMapping("/pesquisar")
	public @ResponseBody List<ManterCaixa> buscarCaixa() {

		List<ManterCaixa> caixas = manterCaixaService.pesquisar();

		return caixas;
	}
	
	@GetMapping("/consultar/{id}")
	  public @ResponseBody ManterCaixa consultar(@PathVariable Long id) {
	    return manterCaixaService.consultar(id);
	  }

	@PostMapping("/salvar")
	public @ResponseBody String salvar(@RequestBody ManterCaixa manterCaixa) {
		ManterCaixa caixa = manterCaixaService.salvar(manterCaixa);
		return "Sucesso";
	}
	
	@PostMapping("/atualizar")
	public void atualizar(@RequestBody ManterCaixa manterCaixa) {
		manterCaixaService.atualizar(manterCaixa);
	}
	
	
	@DeleteMapping("/deletar/{id}")
	public void deletar(@PathVariable Long id) {
		manterCaixaService.deletar(id);
	}
}
