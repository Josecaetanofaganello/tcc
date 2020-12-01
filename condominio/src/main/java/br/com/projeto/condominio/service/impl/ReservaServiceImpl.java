package br.com.projeto.condominio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.condominio.model.Reserva;
import br.com.projeto.condominio.repository.ReservaRepository;
import br.com.projeto.condominio.service.ReservaService;

@Service
public class ReservaServiceImpl implements ReservaService {
	
	public static final String SINDICO = "Sindico";
	public static final String MORADOR = "Morador";
	
	@Autowired
	private ReservaRepository reservaRepository;

	@Override
	public void salvar(Reserva reserva) {

	}

	@Override
	public Reserva atualizar(Reserva reserva) {
		
		Reserva reservaRetorno = reservaRepository.findReserva(reserva.getAreaId(), reserva.getDataInicial(), reserva.getDataFinal());
		
		if (reservaRetorno != null) {
			reservaRetorno.setStatus("Reservada");
			return reservaRetorno;
		}
		reservaRetorno.setStatus("");
		return reservaRepository.save(reserva);
	}

	@Override
	public List<Reserva> pesquisar(Long idUsuarioLogado, String tipoUsuarioLogado) {
		
		if (tipoUsuarioLogado.equals(SINDICO)) {
			return reservaRepository.findAll();	
		
		}else if(tipoUsuarioLogado.equals(MORADOR)) {
			return reservaRepository.findByIdUser(idUsuarioLogado);
		}
		
		
		
		return reservaRepository.findAll();
	}

	@Override
	public Reserva consultar(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deletar(Long id) {
		reservaRepository.deleteById(id);
	}

}
