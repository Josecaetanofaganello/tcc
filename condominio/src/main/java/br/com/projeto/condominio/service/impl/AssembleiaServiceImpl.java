package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.Enquete;
import br.com.projeto.condominio.model.EnqueteUsuario;
import br.com.projeto.condominio.model.EnqueteUsuarioPK;
import br.com.projeto.condominio.model.Usuario;
import br.com.projeto.condominio.repository.AssembleiaRepository;
import br.com.projeto.condominio.repository.EnqueteRepository;
import br.com.projeto.condominio.repository.UsuarioRepository;

@Service
public class AssembleiaServiceImpl {
	
	@Autowired
	private AssembleiaRepository assembleiaRepository;
	
	@Autowired
	private EnqueteRepository enqueteRepository;
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	public EnqueteUsuario votar(EnqueteUsuario enqueteUsuario) {
		
		Enquete enquete = this.enqueteRepository.findById(enqueteUsuario.getEnquete()).get();
		Usuario usuario = this.usuarioRepository.findById(enqueteUsuario.getUsuario()).get();
		
		EnqueteUsuarioPK enqueteUsuarioPK = new EnqueteUsuarioPK();
		
		enqueteUsuarioPK.setEnquete(enquete);
		enqueteUsuarioPK.setUsuario(usuario);
		
		enqueteUsuario.setPrimaryKey(enqueteUsuarioPK);
		
		if(this.isInserir(enqueteUsuario)) {
			return assembleiaRepository.save(enqueteUsuario);
		}
	
		return null;
	}
	
	public List<EnqueteUsuario> pesquisar(){
		return this.assembleiaRepository.findAll();
	}
	
	private boolean isInserir(EnqueteUsuario enqueteUsuario) {
//		List<EnqueteUsuario> enqueteUsuarios = assembleiaRepository.findByIds(enqueteUsuario.getEnquete(), enqueteUsuario.getUsuario());
//		if(enqueteUsuarios == null || enqueteUsuarios.isEmpty()) {
//			return true;
//		}
		return false;
	}
	
	
	
	
}
