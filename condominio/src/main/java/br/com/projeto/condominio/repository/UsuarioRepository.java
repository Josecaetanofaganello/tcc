package br.com.projeto.condominio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.projeto.condominio.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	
	//Personalizando a query para buscar os produtos por id.
		@Query("SELECT u FROM Usuario u")
		public List<Usuario> buscarUsuario();
}
