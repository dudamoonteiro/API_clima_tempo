// Seleciona o formulário de clima no documento HTML
document.getElementById("formClima")
  .addEventListener("submit", function (event) {
    
    // Impede o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

    // Seleciona o valor do campo de entrada de cidade
    const city = document.getElementById("cityInput").value;

    // Formata a cidade com a primeira letra em maiúscula
    const cidadeFormatada = city.charAt(0).toUpperCase() + city.slice(1);

    // Faz uma requisição HTTP GET para a API de clima
    fetch(`http://localhost:3000/climatempo/${city}`)
      .then((response) => response.json()) // Converte a resposta em JSON
      .then((data) => {
        
        // Seleciona o elemento onde os dados do clima serão exibidos
        const tempoResult = document.getElementById("climaResult");

        // Exibe o elemento de resultado
        document.getElementById("climaResult").style.display = "block";

        // Verifica se a temperatura está presente nos dados retornados
        if (data.Temperatura) {
          tempoResult.innerHTML = `
            <div class="clima-city-name">
              <i class="ph-fill ph-map-pin" id="pin_map"></i>
              <p id="cityResult">${cidadeFormatada}</p>
              <img src="${data.Flag}" class="flag-city">
            </div>
            <div class="clima-city-temp">
              <i class="ph ph-thermometer-simple"></i>
              <p id="tempResult">${data.Temperatura}ºC</p>
            </div>
            <div class="clima-city-icon">
              <p id="climaDescriptionResult">${data.Clima}</p>
              <img src="${data.Icone}">
            </div>
            <div class="clima-city-bot">
              <div class="clima-city-umidade">
                <i class="ph ph-drop"></i>
                <p id="umidadeResult">${data.Umidade}%</p>
              </div>
              <p class="espacamento">|</p>
              <div class="clima-city-vento">
                <i class="ph ph-wind"></i>
                <p id="ventoResult">${data.VelocidadeDoVento} m/s</p>
              </div>
            </div>
          `;
        } else {
          tempoResult.innerHTML = "Erro ao obter dados metereológicos!";
        }
      });
  });
