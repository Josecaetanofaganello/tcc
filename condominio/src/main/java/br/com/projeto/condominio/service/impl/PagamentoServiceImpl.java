package br.com.projeto.condominio.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.projeto.condominio.model.Pagamento;
import br.com.projeto.condominio.repository.PagamentoRepository;

public class PagamentoServiceImpl {

	@Autowired
	private PagamentoRepository pagamentoRepository;
	
	
	public Pagamento registrarPagamento(Pagamento pagamento) {
		return pagamentoRepository.save(pagamento);
	}
	
	public void delete(Long id) {
		pagamentoRepository.deleteById(id);
	}
}
