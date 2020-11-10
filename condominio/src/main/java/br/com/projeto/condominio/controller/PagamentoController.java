package br.com.projeto.condominio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.projeto.condominio.model.Pagamento;
import br.com.projeto.condominio.service.impl.PagamentoServiceImpl;

@RestController
@RequestMapping("/pagamento")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PagamentoController {

	@Autowired
	private PagamentoServiceImpl pagamentoServiceImpl;

	@PostMapping("/registrar")
	public @ResponseBody Pagamento registrarPagamento(@RequestBody Pagamento pagamento) {
		Pagamento pagamentoRetorno = pagamentoServiceImpl.registrarPagamento(pagamento);
		
		if(pagamentoRetorno == null) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Não foi possível registrar o pagamento!");
		}
		
		return  pagamentoRetorno;
	}
	
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable Long id) {
		
	}

}
