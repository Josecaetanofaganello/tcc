package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.condominio.model.Unidade;
import br.com.projeto.condominio.service.impl.UnidadeServiceImpl;

@RestController
@RequestMapping("/unidade")
public class UnidadeController {
	
	@Autowired
	private UnidadeServiceImpl unidadeServiceImpl;
	
	@PostMapping("/listar")
	public @ResponseBody List<Unidade> listar() {
		return unidadeServiceImpl.listar();
	}
}
