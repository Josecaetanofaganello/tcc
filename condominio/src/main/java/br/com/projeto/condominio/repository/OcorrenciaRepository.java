package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projeto.condominio.model.Ocorrencia;

public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {

}
