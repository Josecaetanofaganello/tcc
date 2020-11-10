package br.com.projeto.condominio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projeto.condominio.model.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {

}
