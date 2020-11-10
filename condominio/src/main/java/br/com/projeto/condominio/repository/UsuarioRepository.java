package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.projeto.condominio.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	@Query("Select c from Usuario c where c.email = :email and c.senha = :password")
	Usuario findByemail(String email, String password);
	
	
	@Query("Select c from Usuario c where c.email = :email")
	Usuario findByEmail(String email);
}
