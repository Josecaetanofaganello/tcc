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

import br.com.projeto.condominio.model.Reserva;
import br.com.projeto.condominio.service.ReservaService;

@RestController()
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/reserva")
public class ReservaController {

	@Autowired
	private ReservaService reservaService;
	
	@GetMapping("/listar/{idUsuarioLogado}/{tipoUsuarioLogado}")
	public @ResponseBody List<Reserva> listar(@PathVariable Long idUsuarioLogado, @PathVariable String tipoUsuarioLogado){
		return reservaService.pesquisar(idUsuarioLogado, tipoUsuarioLogado);
		
	}
	
	@PostMapping("/atualizar")
	public @ResponseBody Reserva atualizar(@RequestBody Reserva reserva){
		
		if (reserva.getDataInicial().compareTo(reserva.getDataFinal()) > 0) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Data inicial maior que data final!");
		}
		
		Reserva retorno = reservaService.atualizar(reserva);
		
		return retorno;
		
	}
	
	@DeleteMapping("/deletar/{id}")
	public void deletar(@PathVariable Long id) {
		reservaService.deletar(id);
	}
	
	
}
