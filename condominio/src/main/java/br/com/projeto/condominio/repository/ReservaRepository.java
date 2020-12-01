package br.com.projeto.condominio.repository;


import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.projeto.condominio.model.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
	
	
	@Query("select r from Reserva r where r.areaId = :areaId and r.dataInicial between :dataInicial and :dataFinal ")
	public Reserva findReserva(@Param("areaId") Long areaId, @Param("dataInicial") Date dataInicial,
			@Param("dataFinal") Date dataFinal);
	
	
	@Query("select r from Reserva r where r.idUsuario = :idUsuario")
	public List<Reserva> findByIdUser(@Param("idUsuario") Long idUsuario);


}
