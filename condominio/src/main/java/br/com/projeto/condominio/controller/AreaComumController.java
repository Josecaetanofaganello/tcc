package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.condominio.model.AreaComum;
import br.com.projeto.condominio.service.AreaComumService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/area-comum")
public class AreaComumController {

	@Autowired
	private AreaComumService areaComumService;
	
	
	@GetMapping("/listar")
	public @ResponseBody List<AreaComum> listar(){
		return areaComumService.listar();
	}
}
