package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projeto.condominio.model.Morador;

public interface MoradorRepository extends JpaRepository<Morador, Long> {

}
