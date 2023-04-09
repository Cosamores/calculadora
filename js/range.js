

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
	bubbleLeft = rangeBubble.textContent;
	bubbleLeft = value
	const bubbleNumber = Number(value);
	console.log(bubbleLeft);
	//return bubbleNumber;

	//rangeBubble.style.transform = `translate(-${perc * 100}%)`
	}

function positionGasBubble() {
	const { min, max, value } = gasInput;
	const total = Number(max) - Number(min);
	const perc = (Number(value) - Number(min)) / total;
	const offset = (thumbWidth/2) - (thumbWidth * perc);


	gasBubble.style.left = `calc(${perc * 100}% + ${offset}px)`;
	bubbleLeft = gasBubble.textContent 
	bubbleLeft = value;
   console.log(bubbleLeft)
	return bubbleLeft;
	//rangeBubble.style.transform = `translate(-${perc * 100}%)`
}

document.addEventListener('DOMContentLoaded', () => {
rangeInput.addEventListener('input', () => {
    positionBubble();
    rangeValue = Number(rangeBubble.textContent); 
    })
gasInput.addEventListener('input', () => {
    positionGasBubble();
    gasValue = Number(gasBubble.textContent);   
})
})

	const timeList = document.querySelectorAll('.tempo-button');
	timeList.forEach((e) => {
			e.addEventListener('click', (e) => {
			timeKm = document.querySelector('.tempo');
			timeKm.innerText = e.target.innerText.toLowerCase();
			timeValue = Number(e.target.id);
			//console.log(timeValue)
			return timeValue;
		})
		})

		const Carro = {
			nome: '',
			manutencaoE: 0,
			manutencaoG: 0,
			consumoE: 0,
			consumoG: 0,
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
		
		if (nomeCarro.toLowerCase() =='hatch' || nomeCarro.toLowerCase() == '') {
			Carro.nome = nomeCarro;
			Carro.manutencaoE = Number(manutencaoEl[0]);
			Carro.manutencaoG = Number(manutencaoGas[0]);
			Carro.consumoG = Number(consumoGas[0]);
			return Carro;
			
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

// const gasValue = gasBubble.textContent;


const gasValue = Number(gasValue.textContent);
const rangeValue =Number(rangeBubble.textContent);
const gastoTotalEl = [];
const gastoTotalGas = []

console.log(gasValue);

	  function calcGastoTotal(carro) {
		const { consumoE, manutencaoE, consumoG, manutencaoG } = carro;
		const gastoTotalEl = (rangeValue * precoEnergia * consumoE + rangeValue * manutencaoE) * timeValue;
		const gastoTotalGas = (rangeValue * gasValue * consumoG + rangeValue * manutencaoG) * timeValue;
	  
		console.log(gastoTotalEl, gastoTotalGas );
		return { gastoTotalEl, gastoTotalGas };
	  }
	  
	  function calcEconomia(carro) {
		const { gastoTotalEl, gastoTotalGas } = calcGastoTotal(carro);
		const economia = gastoTotalGas - gastoTotalEl;
	  
		console.log(economia);
		return economia;
	  }
	  
/* 	  calcGastoTotal(Carro);
	  calcEconomia(Carro) */
	
	  // Calcular a economia e exibir no console ou em algum elemento do DOM
	  const economia = calcEconomia(Carro);
	  console.log(`Economia para o carro ${Carro.nome}: ${economia.toFixed(2)}`);



const calcGastoEl = (carro) => {

	const { consumoE, manutencaoE } = Carro;
	const consuEl = ((Number(rangeValue) * Number(precoEnergia)) * consumoE) * timeValue; 
	const manuTotal = (Number(rangeValue) * Number(manutencaoE)) * Number(timeValue);
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
