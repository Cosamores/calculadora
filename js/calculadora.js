const mq = window.matchMedia( "(min-width: 1300px)");
const rangeLabel = document.querySelector(".km-input");
const rangeInput = rangeLabel.children[0];

const gasLabel = document.querySelector(".gasolina-range");
const gasInput = gasLabel.children[0];

/* const thumbWidth = 22;
 const thumbWidthG = 30;
*/
let timeValue;
let defaultTimeValue = 30;
let newDefaultValue;
let newMax;
let textA;
let textB;
let rangeValue;
let gasValue; 
timeValue = defaultTimeValue;

rangeLabel.insertAdjacentHTML(
  "beforeend",
  `<span class="bubble"></span>${rangeInput.value}</span>`
);

gasLabel.insertAdjacentHTML(
  "beforeend",
  `<span class="bubble"></span>${gasInput.value}</span>`
);

const rangeBubble = rangeLabel.children[1];
const gasBubble = gasLabel.children[1];

function positionBubble() {
  const { min, max, value } = rangeInput;
  const total = Math.round(max) - Math.round(min);
  const perc = (Math.round(value) - Math.round(min)) / total;

  const bubbleWidth = rangeBubble.clientWidth;
  const rangeWidth = rangeInput.clientWidth;
  const offset = perc * rangeWidth - bubbleWidth * perc;

  // Calculate the additional offset based on the screen width
  const screenWidth = window.innerWidth;
  let additionalOffset;
  if (screenWidth < 768) { // Adjust this value based on your mobile breakpoint
    additionalOffset = 10; // Adjust this value to fit the bubble better on mobile
  } else {
    additionalOffset = 10; // The original value for desktop
  }

  rangeBubble.style.left = `${offset + additionalOffset}px`;
  rangeBubble.textContent = value;

  // Update the range input's background
  rangeInput.style.setProperty("--perc", `${perc * 100}%`);
}


function positionGasBubble() {
  const { min, max, value } = gasInput;
  const total = parseFloat(max) - parseFloat(min);
  const perc = (parseFloat(value) - parseFloat(min)) / total;

  const bubbleWidth = gasBubble.clientWidth;
  const rangeWidth = gasInput.clientWidth;
  const offset = perc * rangeWidth - bubbleWidth * perc;

  // Calculate the additional offset based on the screen width
  const screenWidth = window.innerWidth;
  let additionalOffset;
  if (screenWidth < 768) { // Adjust this value based on your mobile breakpoint
    additionalOffset = 20; // Adjust this value to fit the bubble better on mobile
  } else {
    additionalOffset = 70; // The original value for desktop
  }

  gasBubble.style.left = `${offset + additionalOffset}px`;
  gasBubble.textContent = value;

  gasInput.style.setProperty("--perc", `${perc * 100}%`);
}


positionBubble();
positionGasBubble();
window.addEventListener('resize', positionGasBubble);
window.addEventListener('resize', positionBubble);


const timeList = document.querySelectorAll(".tempo-button");
const kmInput = document.querySelector("#km");
const tempoResultados = document.querySelectorAll(".tempo-resultados");
const timeStamp = document.querySelectorAll(".time-stamp");

timeList.forEach((e) => {
  e.addEventListener("click", (event) => {
    timeKm = document.querySelector(".tempo");
    timeValue = Number(event.target.id);

    defineDefaults();

    kmInput.setAttribute("max",  Math.round(newMax));
    kmInput.style.setProperty("--max", Math.round(newMax));
    kmInput.value = (newDefaultValue);
    gasBubble.textContent = (newDefaultValue);

    positionBubble();
    positionGasBubble();

    timeList.forEach((button) => button.classList.remove("active"));
    event.target.classList.add("active");
    tempoResultados.forEach((e) => {
      e.textContent = textA;
    });

    timeStamp.forEach((e) => {
      e.textContent = textB;
    });
    calculateResults();
  });
});

const carNames = document.querySelectorAll(".nome-carro");
function toggleActiveClass(event) {
  carNames.forEach((span) => span.classList.remove("active"));
  event.target.classList.add("active");
}

carNames.forEach((span) => span.addEventListener("click", toggleActiveClass));

rangeInput.addEventListener("input", () => {
  positionBubble();
  rangeValue = rangeBubble.textContent;
  calculateResults();
});

gasInput.addEventListener("input", () => {
  positionGasBubble();
  gasValue = gasBubble.textContent;
  calculateResults();
});
let defaultRangeValue = Number(rangeBubble.textContent);
let defaultGasValue = Number(gasBubble.textContent);

const consumoEl = [10.03, 7.64, 8.04];
const consumoGas = [9.0, 7.8, 8.0];
const manutencaoEl = [0.045, 0.05, 0.049];
const manutencaoGas = [0.19, 0.22, 0.21];
const precoEnergia = 0.85;

const ejs1 = 145900;
const ejs4 = 242900;
const ej7 = 252900;
const hatchTermico = 100000;
const suvTermico = 170000;
const sedanTermico = 180000;

const Carro = {};
let precoCompraEl = ejs1;
let precoCompraG = hatchTermico;

Carro.nome = "E-JS1";
Carro.modelo = "hatch";
Carro.manutencaoE = Number(manutencaoEl[0]);
Carro.manutencaoG = Number(manutencaoGas[0]);
Carro.consumoE = Number(consumoEl[0]);
Carro.consumoG = Number(consumoGas[0]);

const carros = document.querySelectorAll(".nome-carro");
carros.forEach((e) => {
  e.addEventListener("click", (e) => {
    const carro = (
      e.target.alt ||
      e.target.innerText ||
      e.target.value ||
      e.textContent
    )
      .trim()
      .toUpperCase();
    if (carro == "E-JS1") {
      Carro.nome = "E-JS1";
      Carro.modelo = "HATCH";
      Carro.manutencaoE = Number(manutencaoEl[0]);
      Carro.manutencaoG = Number(manutencaoGas[0]);
      Carro.consumoE = Number(consumoEl[0]);
      Carro.consumoG = Number(consumoGas[0]);
      precoCompraEl = ejs1;
      precoCompraG = hatchTermico;
      changeCarName(carroNome);
      changeCarModel(carroTipo);
      calculateResults();
    }
    if (carro == "E-JS4") {
      Carro.nome = "E-JS4";
      Carro.modelo = "SUV";
      Carro.manutencaoE = Number(manutencaoEl[1]);
      Carro.consumoE = Number(consumoEl[1]);
      Carro.manutencaoG = Number(manutencaoGas[1]);
      Carro.consumoG = Number(consumoGas[1]);
      precoCompraEl = ejs4;
      precoCompraG = suvTermico;
      changeCarName(carroNome);
      changeCarModel(carroTipo);
      calculateResults();
      
    }
    if (carro == "E-J7") {
      Carro.nome = "E-J7";
      Carro.modelo = "SEDAN";
      Carro.manutencaoE = Number(manutencaoEl[2]);
      Carro.consumoE = Number(consumoEl[2]);
      Carro.manutencaoG = Number(manutencaoGas[2]);
      Carro.consumoG = Number(consumoGas[2]);
      precoCompraEl = ej7;
      precoCompraG = sedanTermico;
      
      changeCarName(carroNome);
      changeCarModel(carroTipo);
      calculateResults();
    }
    calculateResults();
  });
});

const carroTipo = document.querySelectorAll(".carro-tipo");
const carroNome = document.querySelectorAll(".carro-nome");
const changeCarName = (e) => {
  e.forEach((e) => {
    e.textContent = Carro.nome;
  });
};

const changeCarModel = (e) => {
  e.forEach((e) => {
    e.textContent = Carro.modelo;
  });
};

rangeValue = defaultRangeValue;
gasValue = defaultGasValue;

const defineDefaults = () => {
  if (timeValue === null) {
    timeValue = 30;
    calculateResults();
  }

  if (timeValue === 1) {
    newMax = 10000 / 30;
    newDefaultValue = 5000 / 30;
    rangeValue = newDefaultValue;
    textA = " POR DIA";
    textB = " DIÁRIA";
  } else if (timeValue === 360) {
    newMax = 10000 * 12;
    newDefaultValue = 5000 * 12;
    rangeValue = newDefaultValue;
    textA = " POR ANO";
    textB = " ANUAL";
  } else {
    newMax = 10000;
    newDefaultValue = 5000;
    rangeValue = newDefaultValue;
    textA = ` POR MÊS`;
    textB = " MENSAL";
  }
};

const defineRate = (total, valor2) => {
  let rate = (valor2 / total) * 100; 
  return Math.round(rate);
}

const capitalize = (word) =>{
  const firstChar = word.charAt(0);
  const upper = firstChar.toUpperCase();
  const capitalized = upper + word.slice(1);
  return capitalized; 
}

const createChart = () => {
const elCanvas = document.getElementById("eletrico-chart").getContext("2d");
const gasCanvas = document.getElementById("termico-chart").getContext("2d");

  const elChartData = {
    labels: [Carro.nome, 'Energia', 'Manutenção'],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgb(90, 123, 191, 0.5)',
          'rgb(255, 190, 135, 0.5)',
          'rgb(213, 215, 210, 0.5)'
        ],
        borderColor: [
          'rgb(37, 150, 190, 1)',
          'rgb(255, 146, 51, 1)',
          'rgb(154, 159, 147)'
        ],
        cutout: '50%',
        offset: 1
      },
    ],
  };

  const gasChartData = {
    labels: [`${capitalize(Carro.modelo)} Térmico`, 'Combustível', 'Manutenção'],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgb(90, 123, 191, 0.5)',
          'rgb(255, 190, 135, 0.5)',
          'rgb(213, 215, 210, 0.5)'
        ],
        borderColor: [
          'rgb(37, 150, 190, 1)',
          'rgb(255, 146, 51, 1)',
          'rgb(154, 159, 147)'
        ],
        cutout: '50%',
        offset: 1,
      },
    ],
  };

  const chartOptions = {
  }
  
   const customDatalabels = {
    id: 'customDatalabels', 
    afterDatasetsDraw: (chart, args, pluginOptions) => {
      const {ctx, data, chartArea: {top, bottom, left, right, width, height} } = chart;
      ctx.save();
      const halfWidth = width / 2 + left;
      const halfHeight = height / 2 + top;

    data.datasets[0].data.forEach((datapoint, index) => {
      const {x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();
        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = data.datasets[0].borderColor[index];
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        

      if(mq.matches) {
        const xLine = x >= halfWidth ? x + 90 : x - 90;
        const yLine = x >= halfHeight ? y - 25 : y + 25;
        const extraLine = x >= halfWidth ? 15 : -15;
        const textWidth = ctx.measureText(datapoint).width;
        const textWidthPosition = x >= halfWidth ? textWidth -30 : -textWidth +30;

        ctx.strokeStyle = data.datasets[0].borderColor[index];
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xLine, yLine);
        ctx.lineTo(xLine + extraLine, yLine);
        ctx.stroke();
        ctx.fillText(datapoint, xLine  + extraLine + textWidthPosition, yLine);
      } else {
        const xLine = x >= halfWidth ? x + 50 : x - 60;
        const yLine = x >= halfHeight ? y - 25 : y + 25;
        const extraLine = x >= halfWidth ? 15 : -15;
        const textWidth = ctx.measureText(datapoint).width;
        const textWidthPosition = x >= halfWidth ? textWidth -30 : -textWidth +30;
        ctx.fillText(datapoint, x, y);
      }
    
    }) 
  }
} 

const customLayout = {
  id: 'customPadding',
  beforeUpdate: (chart, args, pluginOptions) => {
    if (mq.matches) {
      chart.options.layout.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      };
      
    } else {
      chart.options.layout.padding = -10;
    }
    
  },
  
};



/* Chart.overrides.doughnut.plugins.legend.display = false;
 */  const elChart = new Chart(elCanvas, {
    type: 'doughnut',
    data: elChartData,
    
    options: {
      borderAlign: 'inner',
      plugins: {
        legend: {
          display: true,
          position: 'bottom', 
          maxWidth: mq.matches ? 100 : 200,
          fullWidth: false,
   
        },
        title: {
          display: true,
          text: `Valores para ${Carro.nome}`,
          padding: {
            top: 20,
            bottom: 40          }
        },
      }
    },
    plugins: [customDatalabels, customLayout],
    });

  const gasChart = new Chart(gasCanvas, {
    type: 'doughnut',
    data: gasChartData,
    options: {
      layout: {
        padding: 40
      },
      borderAlign: 'inner',
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',  
        },
        title: {
          display: true,
          text: `Valores para ${capitalize(Carro.modelo)} Térmico`,
          padding: {
            top: 20,
            bottom: 40
          }
        },
      }
    },
    plugins: [customDatalabels, customLayout],
    });

  const updateChartData = (precoCompraEl, custoPorCemEl, manutencaoPorCemEl, precoCompraG, custoPorCemGas, manutencaoPorCemGas, totalEl, totalGas) => {
    elChartData.datasets[0].data = [
      Number(19000).toFixed(2),
      Number(custoPorCemEl).toFixed(2), 
      Number(manutencaoPorCemEl).toFixed(2)
    ];
    
    gasChartData.datasets[0].data = [
      Number(precoCompraG).toFixed(2), 
      Number(custoPorCemGas).toFixed(2), 
      Number(manutencaoPorCemGas).toFixed(2)
    ];
    elChart.update();
    gasChart.update();
  }
  
  return updateChartData;
  
};

const chartUpdater = createChart();



const calculateResults = () => {
  if (!Carro.modelo || !timeValue || !rangeValue || !gasValue) {
    return;
  }

  // Cálculos para o modelo elétrico
  const kmRodadosE = rangeValue / timeValue;
  const litrosE = kmRodadosE / Carro.consumoE;
  const custoEnergiaE = litrosE * precoEnergia;
  const custoManutencaoE = kmRodadosE * Carro.manutencaoE;
  const custototalEl = custoEnergiaE + custoManutencaoE;
 

  // Cálculos para o modelo a combustão
  const kmRodadosG = parseFloat(rangeValue / timeValue);
  const litrosG = kmRodadosG / Carro.consumoG;
  const custoGasolinaG = litrosG * gasValue;
  const custoManutencaoG = kmRodadosG * Carro.manutencaoG;
  const custoTotalG = custoGasolinaG + custoManutencaoG;
  
 
  
  const emissaoG = kmRodadosG * 2.31;
  const emissaoE = kmRodadosE * 0.5;
  const emissao = ((emissaoG - emissaoE) / 1000) * timeValue;

  // Diferença entre os dois modelos
  const economiaManutencao = custoManutencaoG - custoManutencaoE;
  const economia = custoGasolinaG - custoEnergiaE;
  const economiaTotal = custoTotalG - custototalEl;



   // Cálculos para o gráfico:
   const custoCincoAnosEl = (custoEnergiaE * 360) * 5;
   const manutencaoCincoAnosEl = (custoManutencaoE * 360) * 5;
   const custoCincoAnosGas = (custoGasolinaG * 360) * 5;
   const manutencaoCincoAnosGas = (custoManutencaoG * 360) * 5;
   const totalEl = Number(precoCompraEl) + custoCincoAnosEl + manutencaoCincoAnosEl;
   const totalGas = Number(precoCompraG) + custoCincoAnosGas + manutencaoCincoAnosGas;


/*   const precoPorCemEl = defineRate(totalEl, precoCompraEl);
  const custoPorCemEl = defineRate(totalEl, custoCincoAnosEl);
  const manutencaoPorCemEl = defineRate(totalEl, manutencaoCincoAnosEl);
  
  const precoPorCemGas = defineRate(totalGas, precoCompraG);
  const custoPorCemGas = defineRate(totalGas, custoCincoAnosGas);
  const manutencaoPorCemGas = defineRate(totalGas, manutencaoCincoAnosGas);
 */



  document.querySelector(".km-rodados-dia").textContent = Math.round(kmRodadosG);
  document.querySelector(".combustivel-dia").textContent = custoGasolinaG
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".energia-dia").textContent = (custoEnergiaE)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".economia-dia").textContent = economia
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".km-rodados-mes").textContent = (kmRodadosG * 30)
    .toFixed(0);
  document.querySelector(".combustivel-mes").textContent = `${(
    custoGasolinaG * 30)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "")}`;
  document.querySelector(".energia-mes").textContent = (custoEnergiaE * 30)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".economia-mes").textContent = `${(economia * 30)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "")}`;

  document.querySelector(".km-rodados-ano").textContent = Math.round((kmRodadosG * 30) * 12)
    .toFixed(0);
  document.querySelector(".combustivel-ano").textContent = (
    custoGasolinaG * 360
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".energia-ano").textContent = (custoEnergiaE * 360)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".economia-ano").textContent = (economia * 360)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");

  document.querySelector(".km-rodados-5-anos").textContent = (
    (kmRodadosG  * 360) * 5
  )
    .toFixed(0);
  document.querySelector(".combustivel-5-anos").textContent = (
    (custoGasolinaG * 360) * 5
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".energia-5-anos").textContent = (
    (custoEnergiaE * 360) * 5
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".economia-5-anos").textContent = (
    (economia * 360) * 5
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");

  document.querySelector(".economia").textContent = `${(
    timeValue *
    (custoGasolinaG - custoEnergiaE)
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "")}`;
  document.querySelector(".emissao").textContent = emissao.toFixed(1);
  document.querySelector(".termico").textContent = (
    timeValue * custoManutencaoG
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".eletrico").textContent = (
    timeValue * custoManutencaoE
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".manutencao-economia").textContent = (
    30 * economiaManutencao
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".economia-total-5-anos").textContent = (
    economiaTotal * 360 * 5
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  document.querySelector(".combustivel-termico").textContent = (
    custoGasolinaG * timeValue
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");
  document.querySelector(".combustivel-eletrico").textContent = (
    custoEnergiaE * timeValue
  )
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "");

  document.querySelector('.total-eletrico').textContent = totalEl.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  document.querySelector('.total-termico').textContent = totalGas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    (chartUpdater(precoCompraEl, custoCincoAnosEl, manutencaoCincoAnosEl, precoCompraG, custoCincoAnosGas, manutencaoCincoAnosGas, totalEl, totalGas));
  };

  calculateResults();

  
 

