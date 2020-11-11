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

import br.com.projeto.condominio.model.Ocorrencia;
import br.com.projeto.condominio.service.OcorrenciaService;

@RestController
@RequestMapping("/ocorrencia")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OcorrenciaController {

	@Autowired
	private OcorrenciaService ocorrenciaService;

	@PostMapping("/salvar")
	private @ResponseBody Ocorrencia salvar(@RequestBody Ocorrencia ocorrencia) {

		Ocorrencia ocorrenciaRetorno = ocorrenciaService.salvar(ocorrencia);

		if (ocorrenciaRetorno == null) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Não foi possível cadastrar a ocorrência.");
		}

		return ocorrenciaRetorno;
	}

	@GetMapping("/pesquisar")
	public @ResponseBody List<Ocorrencia> pesquisar() {

		List<Ocorrencia> ocorrencias = ocorrenciaService.pesquisar();

		return ocorrencias;
	}

	@GetMapping("/consultar/{id}")
	public @ResponseBody Ocorrencia consultar(@PathVariable Long id) {
		return ocorrenciaService.consultar(id);

	}
	
	@DeleteMapping("/delete")
	public void delete(Long id) {
		ocorrenciaService.deletar(id);
	}

}
