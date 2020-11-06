package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.condominio.model.EnqueteUsuario;
import br.com.projeto.condominio.service.impl.AssembleiaServiceImpl;

@RestController
@RequestMapping(value = "/assembleia")
public class AssembleiaController {

	@Autowired
	AssembleiaServiceImpl assembleiaServiceImpl;
	
	
	@PostMapping("/votar")
	public @ResponseBody String votar(@RequestBody EnqueteUsuario voto){
		
		EnqueteUsuario votacao = assembleiaServiceImpl.votar(voto);
		
		return "Sucesso";
	}
	
	@PostMapping("/pesquisar-votos")
	public @ResponseBody List<EnqueteUsuario> pesquisarVotos(){
		return assembleiaServiceImpl.pesquisar();
	}
	
	
	
}
