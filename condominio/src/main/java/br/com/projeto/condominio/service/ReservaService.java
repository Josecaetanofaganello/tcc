package br.com.projeto.condominio.service;

import java.util.List;

import br.com.projeto.condominio.model.Reserva;

public interface ReservaService {

	void salvar(Reserva reserva);
	List<Reserva> atualizar(List<Reserva>  reserva);
    List<Reserva> pesquisar();
    Reserva consultar(Long id);
    void deletar(Long id);
}
