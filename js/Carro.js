const Carro = {
	nome: this.nome,
	manutencaoE: this.manutencaoE,
	manutencaoG: this.manutencaoG,
	consumoE: this.consumoE,
	consumoG: this.consumoG,
	gastoEL: calcGastoEl(),
	gastoGas: calcGastoGas()
}

export default Carro;