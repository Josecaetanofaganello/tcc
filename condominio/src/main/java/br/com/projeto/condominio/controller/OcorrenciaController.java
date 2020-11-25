package br.com.projeto.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@PutMapping("/atualizar")
	private @ResponseBody List<Ocorrencia> atualizar(@RequestBody List<Ocorrencia> ocorrencias) {

		List<Ocorrencia> ocorrenciaRetornos = ocorrenciaService.atualizar(ocorrencias);

		if (ocorrenciaRetornos == null || ocorrenciaRetornos.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Não foi possível cadastrar a ocorrência.");
		}

		return ocorrenciaRetornos;
	}
	

	@GetMapping("/listar/{idUsuarioLogado}/{tipoUsuarioLogado}")
	public @ResponseBody List<Ocorrencia> listar(@PathVariable Long idUsuarioLogado, @PathVariable String tipoUsuarioLogado) {

		List<Ocorrencia> ocorrencias = ocorrenciaService.pesquisar(idUsuarioLogado, tipoUsuarioLogado);
		
		return ocorrencias;
	}

	@GetMapping("/consultar/{id}")
	public @ResponseBody List<Ocorrencia> consultar(@PathVariable Long idUsuario) {
		
		List<Ocorrencia> ocorrenciasRetorno = ocorrenciaService.consultar(idUsuario);
		
		return ocorrenciasRetorno;

	}
	
	@DeleteMapping("/deletar/{id}")
	public void delete(@PathVariable Long id) {
		ocorrenciaService.deletar(id);
	}

}
