

const rangeLabel = document.querySelector('.km-input');
const rangeInput = rangeLabel.children[0];

const gasLabel = document.querySelector('.gasolina-range');
const gasInput = gasLabel.children[0];


const thumbWidth = 22;
let timeValue = 0;

rangeLabel.insertAdjacentHTML(
	'beforeend',
	`<span class="bubble"></span>${rangeInput.value}</span>`
);

gasLabel.insertAdjacentHTML(
		'beforeend',
		`<span class="bubble"></span>${gasInput.value}</span>`
);

const rangeBubble = rangeLabel.children[1];
const gasBubble = gasLabel.children[1];

function positionBubble() {
	const { min, max, value } = rangeInput;
	const total = Number(max) - Number(min);
	const perc = (Number(value) - Number(min)) / total;
	const offset = (thumbWidth/2) - (thumbWidth * perc);

	rangeBubble.style.left = `calc(${perc * 100}% + ${offset}px)`;
	rangeBubble.textContent = value;
	
	//rangeBubble.style.transform = `translate(-${perc * 100}%)`
	}

function positionGasBubble() {
	const { min, max, value } = gasInput;
	const total = Number(max) - Number(min);
	const perc = (Number(value) - Number(min)) / total;
	const offset = (thumbWidth/2) - (thumbWidth * perc);

	gasBubble.style.left = `calc(${perc * 100}% + ${offset}px)`;
	gasBubble.textContent = value;
		//rangeBubble.style.transform = `translate(-${perc * 100}%)`
}

positionBubble()
positionGasBubble();


rangeInput.addEventListener('input', positionBubble)
gasInput.addEventListener('input', positionGasBubble)


	const timeList = document.querySelectorAll('.tempo-button');
	timeList.forEach((e) => {
			e.addEventListener('click', (e) => {
			timeKm = document.querySelector('.tempo');
			timeKm.innerText = e.target.innerText.toLowerCase();
			timeValue = Number(e.target.id);

		})
		})

		const Carro = {
			nome: this.nome,
			manutencaoE: this.manutencaoE,
			manutencaoG: this.manutencaoG,
			consumoE: this.consumoE,
			consumoG: this.consumoG,
		}


const consumoEl = [10.03, 7.64, 8.04];
const consumoGas = [9.00, 7.80, 8.00]
const manutencaoEl = [0.045, 0.050, 0.049]
const manutencaoGas = [0.19, 0.22, 0.21]
const precoEnergia = 0.85;

const carrosTipo = document.querySelectorAll('.nome-carro');
	carrosTipo.forEach((e) => {
	e.addEventListener('click', (e) => {
		nomeCarro =  (e.target.alt || e.target.innerText).trim();
		
		if (nomeCarro.toLowerCase() =='hatch') {
			Carro.nome = nomeCarro;
			Carro.manutencaoE = Number(manutencaoEl[0]);
			Carro.consumoE = Number(consumoEl[0]);
			Carro.manutencaoG = Number(manutencaoGas[0]);
			Carro.consumoG = Number(consumoGas[0]);
		}
		if (nomeCarro.toLowerCase() == 'sedan') {
			Carro.nome = nomeCarro;
			Carro.manutencaoE = Number(manutencaoEl[2]); 
			Carro.consumoE = Number(consumoEl[2]);
			Carro.manutencaoG = Number(manutencaoGas[2]);
			Carro.consumoG = Number(consumoGas[2]);
		}
		if (nomeCarro.toLowerCase() == 'suv') {
			Carro.nome = nomeCarro;
			Carro.manutencaoE = Number(manutencaoEl[1]);
			Carro.consumoE = Number(consumoEl[1]);
			Carro.manutencaoG = Number(manutencaoGas[1]);
			Carro.consumoG = Number(consumoGas[1]);
		}
	})
})



const gasValue = Number(gasBubble.textContent);
const rangeValue = Number(rangeBubble.textContent);
const gastoTotalEl = [];
const gastoTotalGas = []


const calcGastoEl = (carro) => {

	const { consumoE, manutencaoE } = Carro;
	const consuEl = ((rangeValue * precoEnergia) * consumoE) * timeValue; 
	const manuTotal = (rangeValue * manutencaoE) * timeValue;
	const consumoTotal = consuEl + manuTotal;
	gastoTotalEl.push(consuEl,  manuTotal, consumoTotal);
	console.log(consumoTotal)
	return consumoTotal;
}




const calcGastoGas = (consumoG, manutencaoG) => {
	
	const consuGas = ((rangeValue * gasValue) * consumoG) * timeValue; 
	const manuTotal = (rangeValue * manutencaoG) * timeValue;
	const consumoTotal = (consuGas + manuTotal);
	const gastoTotal = [consuGas, manuTotal, consumoTotal];
	
	console.log(consumoTotal);
	return ;
}

setTimeout(calcGastoEl(Carro.consumoE,Carro.manutencaoE), 500)
setInterval(calcGastoGas(Carro.consumoG, Carro.manutencaoG),500)
