package br.com.projeto.condominio.service.impl;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.Usuario;
import br.com.projeto.condominio.repository.UsuarioRepository;
import br.com.projeto.condominio.service.UsuarioService;
import br.com.projeto.condominio.utils.UtilsMail;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	

	@Override
	public Usuario salvar(Usuario usuario) {
		
		usuario.setSenha(criptografiaBase64Encoder(usuario.getSenha()));
		
		usuario.setBloco(usuario.getApto().trim());
		usuario.setTipo("Morador");
		
		if (validaSeEmailJaExiste(usuario.getEmail())) {
			return null;
		}
				
		return usuarioRepository.save(usuario);
	}
	

	private String criptografiaBase64Encoder(String pValor) {
	    return new String(Base64.getEncoder().encode(pValor.getBytes()));
	}
	

	public static String descriptografiaBase64Decode(String pValor) {
	    return new String(Base64.getDecoder().decode(pValor.getBytes()));
	}

	@Override
	public Usuario atualizar(Usuario usuario) {
		usuarioRepository.save(usuario);
		return null;
	}


	@Override
	public void deletar(Long id) {
		usuarioRepository.deleteById(id);
	}

	@Override
	public List<Usuario> pesquisar() {
		
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario consultar(Long id) {
		return usuarioRepository.findById(id).get();
	}
	
	public Usuario autenticar(String email, String password) {
		
		password = criptografiaBase64Encoder(password.trim());
		
		 Usuario user = usuarioRepository.findByemail(email, password);
		
		 return user;
		 
	}
	
	public boolean validaSeEmailJaExiste(String email) {
		Usuario usuario = usuarioRepository.findByEmail(email);
		
		return usuario != null;
	}
	
	@Override
	public boolean validaSeUsuarioJaCadastrado(String apto) {
		Usuario usuario = null;
		
		usuario = usuarioRepository.findByApto(apto.trim());
		
		return (usuario != null);
	}
	
	@Override
	public String esqueciSenha(String email) throws Exception  {
		
		Usuario usuario = usuarioRepository.findByEmail(email);
		
		if (usuario == null) {
			return "Email não cadastrado!";
		}
		
		if ("".equals(usuario.getSenha())) { 
			return "Houve um problema com sua requisição, favor entrar em contato com o administrador do sistema";
		}
		
		enviarSenha(email, descriptografiaBase64Decode(usuario.getSenha()));
		
		return "Um e-mail de recuperação de senha foi enviado para o endereço "+email;
		
		
	}
	
	private void enviarSenha(String emailDestinatario, String senha) throws Exception {
		
		UtilsMail mail = new UtilsMail();
		
		String assunto = "Recuperação de senha - Sistema de controle de condominio";
		String msgCorpoEmail = "Foi feito uma requisição de recuperação da senha pelo usuario " + emailDestinatario
				+". \nSe você não fez essa requisição entre em contato com o administrador do sistema."
				+ "\nSua senha é: "+senha;
		
		mail.enviarEmail(assunto, msgCorpoEmail, emailDestinatario);
		
	}
}

