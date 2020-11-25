package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projeto.condominio.model.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

}
