const rangeLabel = document.querySelector('.km-input');
const rangeInput = rangeLabel.children[0];

const gasLabel = document.querySelector('.gasolina-range');
const gasInput = gasLabel.children[0];

const thumbWidth = 22;
const thumbWidthG = 22;

let timeValue;
let defaultTimeValue = 30
timeValue = defaultTimeValue;

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

  const bubbleWidth = rangeBubble.clientWidth;
  const rangeWidth = rangeInput.clientWidth;
  const offset = (perc * rangeWidth) - (bubbleWidth * perc);

  rangeBubble.style.left = `${offset + 10}px`;
  rangeBubble.textContent = value;

  // Update the range input's background
  rangeInput.style.setProperty('--perc', `${perc * 100}%`);
}

function positionGasBubble() {
  const { min, max, value } = gasInput;
  const total = Number(max) - Number(min);
  const perc = (Number(value) - Number(min)) / total;

  const bubbleWidth = gasBubble.clientWidth;
  const rangeWidth = gasInput.clientWidth;
  const offset = (perc * rangeWidth) - (bubbleWidth * perc);

  gasBubble.style.left = `${offset + 100}px`;
  gasBubble.textContent = value;

  gasInput.style.setProperty('--perc', `${perc * 100}%`);
}


positionBubble();
positionGasBubble();

const timeList = document.querySelectorAll('.tempo-button');
const tempoEconomia = document.querySelector('.tempo-economia');
const kmInput = document.querySelector('#km');

timeList.forEach((e) => {
  e.addEventListener('click', (event) => {
    timeKm = document.querySelector('.tempo');
/*     timeKm.innerText = event.target.innerText.toLowerCase();
 */ timeValue = Number(event.target.id);
    tempoEconomia.textContent = ` POR ${timeKm.innerText}`.toUpperCase();
 
    let newMax;
    let newDefaultValue;

    if (timeValue === 1) {
      newMax = Math.round(5000 / 30);
      newDefaultValue = Math.round(2000 / 30);    
      rangeValue = newDefaultValue
  
    } else if (timeValue === 365) {
      newMax = 5000 * 12;
      newDefaultValue = 2000 * 12;
      rangeValue = newDefaultValue
    } else {
      newMax = 5000;
      newDefaultValue = 2000;
      rangeValue = newDefaultValue

    }

    kmInput.setAttribute('max', newMax);
    kmInput.style.setProperty('--max', newMax);
    kmInput.value = newDefaultValue;
    gasBubble.textContent = newDefaultValue;

    positionBubble();
    positionGasBubble();

    // Toggle active class for tempo buttons
    timeList.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
    calculateResults();

  });
});



const carNames = document.querySelectorAll('.nome-carro');
function toggleActiveClass(event) {
  carNames.forEach(span => span.classList.remove('active'));
  event.target.classList.add('active');
}

carNames.forEach(span => span.addEventListener('click', toggleActiveClass));

rangeInput.addEventListener('input', () => {
  positionBubble();
  rangeValue = Number(rangeBubble.textContent);
  calculateResults();
});

gasInput.addEventListener('input', () => {
  positionGasBubble();
  gasValue = Number(gasBubble.textContent);
  calculateResults();
});
let defaultRangeValue = Number(rangeBubble.textContent);
let defaultGasValue = Number(gasBubble.textContent);


const consumoEl = [10.03, 7.64, 8.04];
const consumoGas = [9.00, 7.80, 8.00];
const manutencaoEl = [0.045, 0.050, 0.049];
const manutencaoGas = [0.19, 0.22, 0.21];
const precoEnergia = 0.85;

const Carro = {
};

Carro.nome = 'E-JS1'
Carro.modelo = 'hatch';
Carro.manutencaoE = Number(manutencaoEl[0]);
Carro.manutencaoG = Number(manutencaoGas[0]);
Carro.consumoE = Number(consumoEl[0]);
Carro.consumoG = Number(consumoGas[0]);
Carro.defaultSelection =  function() {
    document.querySelector('.nome-carro.hatch').classList.add('active');
    document.querySelector('.nome-carro.suv').classList.remove('active');
    document.querySelector('.nome-carro.sedan').classList.remove('active');

};

const carros = document.querySelectorAll('.nome-carro');
carros.forEach((e) => {
  e.addEventListener('click', (e) => {
    const carro =  (e.target.alt || e.target.innerText || e.target.value || e.textContent).trim().toUpperCase();
    if (carro =='HATCH' || carro == 'E-JS1') {
        Carro.nome = 'E-JS1'
        Carro.modelo = 'HATCH';
        Carro.manutencaoE = Number(manutencaoEl[0]);
        Carro.manutencaoG = Number(manutencaoGas[0]);
        Carro.consumoE = Number(consumoEl[0]);
        Carro.consumoG = Number(consumoGas[0]);

      changeCarName(carroNome);
      changeCarModel(carroTipo);    
      calculateResults();    
    }
    if (carro == 'E-JS4') {
        Carro.nome = 'E-JS4'
        Carro.modelo = 'SUV';
        Carro.manutencaoE = Number(manutencaoEl[1]); 
        Carro.consumoE = Number(consumoEl[1]);
        Carro.manutencaoG = Number(manutencaoGas[1]);
        Carro.consumoG = Number(consumoGas[1]);

    changeCarName(carroNome);
    changeCarModel(carroTipo);
    calculateResults();
    }
    if (carro == 'E-J7') {
        Carro.nome = 'E-J7'
        Carro.modelo = 'SEDAN';
        Carro.manutencaoE = Number(manutencaoEl[2]);
        Carro.consumoE = Number(consumoEl[2]);
        Carro.manutencaoG = Number(manutencaoGas[2]);
        Carro.consumoG = Number(consumoGas[2]);

        changeCarName(carroNome);
        changeCarModel(carroTipo);
        calculateResults();
        }
        calculateResults();    
     });
});

const carroTipo = document.querySelectorAll('.carro-tipo');
const carroNome = document.querySelectorAll('.carro-nome');
const changeCarName =(e)=> {
  e.forEach((e) => {
    e.textContent = Carro.nome; 
  })
}

const changeCarModel =   (e) => {
e.forEach((e) => {
  e.textContent = Carro.modelo; 
})
}

rangeValue = defaultRangeValue;
gasValue = defaultGasValue;


const calculateResults = () => {
  if (!Carro.modelo || !timeValue || !rangeValue || !gasValue) {
    Carro.defaultSelection = null;
    return;
  }

  
  // Cálculos para o modelo elétrico
  const kmRodadosE = rangeValue / timeValue;
  const litrosE = kmRodadosE  / Carro.consumoE
  const custoEnergiaE = litrosE * precoEnergia;
  const custoManutencaoE = kmRodadosE * Carro.manutencaoE;
  const custoTotalE = custoEnergiaE + custoManutencaoE;
  
  // Cálculos para o modelo a combustão

  
  const kmRodadosG = rangeValue / timeValue;
  const litrosG = kmRodadosG / Carro.consumoG;
  const custoGasolinaG = litrosG *  gasValue;
  const custoManutencaoG = kmRodadosG * Carro.manutencaoG;
  const custoTotalG = custoGasolinaG + custoManutencaoG;
 
  const emissaoG = kmRodadosG * 2.31;
  const emissaoE = kmRodadosE * 0.5;
  const emissao = (emissaoG - emissaoE) / 1000 * timeValue;

  // Diferença entre os dois modelos
  const economiaManutencao = custoManutencaoG - custoManutencaoE; 
  const economia = custoGasolinaG - custoEnergiaE;
  const economiaTotal = custoTotalG - custoTotalE; 




  document.querySelector('.km-rodados-dia').textContent = kmRodadosE.toFixed(2);
  document.querySelector('.combustivel-dia').textContent = custoGasolinaG.toFixed(2);
  document.querySelector('.energia-dia').textContent = custoEnergiaE.toFixed(2);
  document.querySelector('.economia-dia').textContent = economia.toFixed(2);

  document.querySelector('.km-rodados-mes').textContent = (kmRodadosE * 30).toFixed(2);
  document.querySelector('.combustivel-mes').textContent = `${(custoGasolinaG * 30).toFixed(2)}`;
  document.querySelector('.energia-mes').textContent = `${(custoEnergiaE * 30).toFixed(2)}`;
  document.querySelector('.economia-mes').textContent = `${(economia * 30).toFixed(2)}`;

  document.querySelector('.km-rodados-ano').textContent = (kmRodadosE * 365).toFixed(2);
  document.querySelector('.combustivel-ano').textContent = (custoGasolinaG * 365).toFixed(2);
  document.querySelector('.energia-ano').textContent = (custoEnergiaE * 365).toFixed(2);
  document.querySelector('.economia-ano').textContent = (economia * 365).toFixed(2);

  document.querySelector('.km-rodados-5-anos').textContent = (kmRodadosE * (5 * 365)).toFixed(2);
  document.querySelector('.combustivel-5-anos').textContent = (custoGasolinaG * (5 * 365)).toFixed(2);
  document.querySelector('.energia-5-anos').textContent = (custoEnergiaE * (5 * 365)).toFixed(2);
  document.querySelector('.economia-5-anos').textContent = (economia * (5 * 365)).toFixed(2);
  
  document.querySelector('.economia').textContent = `ECONOMIZA ${(timeValue * economiaTotal).toFixed(2)} REAIS`;
  document.querySelector('.emissao').textContent = emissao.toFixed(1);
  document.querySelector('.termico').textContent = (timeValue * custoManutencaoG).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.querySelector('.eletrico').textContent = (timeValue * custoManutencaoE).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.querySelector('.manutencao-economia').textContent = (30 * economiaManutencao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.querySelector('.economia-total-5-anos').textContent = (economiaTotal * (5 * 365)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
(calculateResults())