package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.condominio.model.Tarefa;
import br.com.projeto.condominio.service.TarefaService;

@RestController()
@RequestMapping(value = "/tarefa")
@CrossOrigin
public class TarefaController {
	
	@Autowired
	private TarefaService tarefaService;

	@GetMapping("/pesquisar")
	public @ResponseBody List<Tarefa> buscarUsuario() {

		List<Tarefa> tarefas = tarefaService.pesquisar();

		return tarefas;
	}
	
	@GetMapping("/consultar/{id}")
	  public @ResponseBody Tarefa consultar(@PathVariable Long id) {
	    return tarefaService.consultar(id);
	  }

	@PostMapping("/salvar")
	public @ResponseBody String salvar(@RequestBody Tarefa tarefa) {
		tarefaService.salvar(tarefa);
		return "Sucesso";
	}
	
	@PostMapping("/atualizar")
	public void atualizar(@RequestBody Tarefa tarefa) {
		tarefaService.atualizar(tarefa);
	}
	
	
	@DeleteMapping("/deletar/{id}")
	public void deletar(@PathVariable Long id) {
		tarefaService.deletar(id);
	}
}
