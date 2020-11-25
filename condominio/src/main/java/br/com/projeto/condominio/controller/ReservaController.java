package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.condominio.model.Reserva;
import br.com.projeto.condominio.service.ReservaService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(name = "/vaga")
public class ReservaController {

	@Autowired
	private ReservaService reservaService;
	
	@GetMapping("/listar")
	public @ResponseBody List<Reserva> listar(){
		return reservaService.pesquisar();
		
	}
	
	@PutMapping("/atualizar")
	public @ResponseBody List<Reserva> atualizar(@RequestBody List<Reserva> reservas){
		return reservaService.atualizar(reservas);
	}
	
	@DeleteMapping("/deleta/{id}")
	public void deletar(@PathVariable Long id) {
		reservaService.deletar(id);
	}
	
}
