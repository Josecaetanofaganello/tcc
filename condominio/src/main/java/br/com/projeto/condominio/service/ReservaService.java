package br.com.projeto.condominio.service;

import java.util.List;

import br.com.projeto.condominio.model.Reserva;

public interface ReservaService {

	void salvar(Reserva reserva);
	Reserva atualizar(Reserva reserva);
    List<Reserva> pesquisar(Long idUsuarioLogado, String tipoUsuarioLogado);
    Reserva consultar(Long id);
    void deletar(Long id);	
}
