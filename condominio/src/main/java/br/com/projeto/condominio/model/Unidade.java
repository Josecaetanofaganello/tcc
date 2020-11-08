package br.com.projeto.condominio.model;

public class Unidade {
	
	private Long id;
	
	private String identificacao;
	
	private String bloco;
	
	private String garagem;
	
	private String veiculo;
	
	private String proprietario;
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIdentificacao() {
		return identificacao;
	}

	public void setIdentificacao(String identificacao) {
		this.identificacao = identificacao;
	}

	public String getBloco() {
		return bloco;
	}

	public void setBloco(String bloco) {
		this.bloco = bloco;
	}

	public String getGaragem() {
		return garagem;
	}

	public void setGaragem(String garagem) {
		this.garagem = garagem;
	}

	public String getVeiculo() {
		return veiculo;
	}

	public void setVeiculo(String veiculo) {
		this.veiculo = veiculo;
	}

	public String getProprietario() {
		return proprietario;
	}

	public void setProprietario(String proprietario) {
		this.proprietario = proprietario;
	}
	
}