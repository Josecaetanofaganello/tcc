package br.com.projeto.condominio.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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

import br.com.projeto.condominio.model.Tarefa;
import br.com.projeto.condominio.service.impl.TarefaServiceImpl;

@RestController()
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/tarefa")
public class TarefaController {
	
	@Autowired
	private TarefaServiceImpl tarefaServiceImpl;

	@GetMapping("/pesquisar")
	public @ResponseBody List<Tarefa> buscarTarefa() {

		List<Tarefa> tarefas = tarefaServiceImpl.pesquisar();
					
		
		
		
		return tarefas;
	}
	
	@GetMapping("/consultar/{id}")
	  public @ResponseBody Tarefa consultar(@PathVariable Long id) {
	    return tarefaServiceImpl.consultar(id);
	  }

	@PostMapping("/salvar")
	public @ResponseBody String salvar(@RequestBody Tarefa tarefa) {
		tarefaServiceImpl.salvar(tarefa);
		return "Sucesso";
	}
	
	@PostMapping("/atualizar")
	public @ResponseBody String atualizar(@RequestBody List<Tarefa> tarefa) {
		List<Tarefa> tarefas =tarefaServiceImpl.atualizar(tarefa);
		if(tarefas != null) {
			
			return "sucesso";
		}else
		  throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Falha ao persistir algum dos elementos");
		
		
	}
	
	
	@DeleteMapping("/deletar/{id}")
	public void deletar(@PathVariable Long id) {
		tarefaServiceImpl.deletar(id);
	}
}
