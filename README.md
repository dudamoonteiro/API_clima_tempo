# API_clima_tempo
---------------------------------------------------------------------------------------------------------------------------------------------
DESCRIÇÃO:
O código abaixo é responsável por consultar o clima de uma cidade a partir do seu nome. A consulta é feita através de uma API local (http://localhost:3000/climatempo/${city}), onde city é o nome da cidade digitado pelo usuário.
Esse código pode ser utilizado para consultar o clima de uma cidade a partir de seu nome. Ele faz uma requisição HTTP para uma API local que retorna informações meteorológicas, como temperatura, umidade, velocidade do vento e descrição do clima atual. O código então exibe essas informações em um formato amigável no navegador.
------------------------------------------------------------------------------------------------------------------------------------------------
FUNCIONAMENTO:
1- O código adiciona um ouvinte de eventos ao formulário com o ID formClima.
2-Quando o formulário é submetido, o evento submit é disparado e a função anônima é executada.
3-A função previne o comportamento padrão do formulário (recarregar a página) usando event.preventDefault().
4-O valor digitado pelo usuário é obtido do campo de entrada com o ID cityInput.
5-O primeiro caractere do nome da cidade é convertido para maiúscula usando charAt(0).toUpperCase() e o restante da string é mantido em minúsculo usando slice(1).
6-Uma requisição fetch é feita para a API com o nome da cidade.
7-A resposta da API é convertida para JSON usando response.json().
8-Os dados retornados pela API são exibidos na página dentro do elemento com o ID climaResult.
9-Se a API retornar dados, eles serão exibidos na página. Caso contrário, uma mensagem de erro será exibida.
------------------------------------------------------------------------------------------------------------------------------------------------
ELEMENTOS DO CÓDIGO QUE ESTÃO SENDO UTILIZADOS:
formClima: formulário que contém o campo de entrada para o nome da cidade.
cityInput: campo de entrada para o nome da cidade.
climaResult: div onde os dados do clima serão exibidos.
---------------------------------------------------------------------------------------------------------------------------------------------------
OBSERVAÇÕES:
A API usada neste código é local (http://localhost:3000/climatempo/${city}). Para usar uma API externa, basta substituir a URL na linha de código que faz a requisição fetch;
Estamos utilizando um servidor que é configurado para ouvir a porta 3000;
As respostas são enviadas usando res.send() ou res.status().send() dependendo do sucesso da requisição e do tratamento de erros.
---------------------------------------------------------------------------------------------------------------------------------------------------
ADPTAÇÕES:
O código pode ser modificado,consumindo outras APIs, fazendo com que ele seja útil para outras funções, como a criação de listas(para isso uma api de listas de tarefas deve ser utilizada)
--------------------------------------------------------------------------------------------------------------------------------------------------
APP.JS-código:

// Importação dos módulos necessários para o servidor e para fazer requisições HTTP
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

// Importação das configurações, incluindo a chave da API
const config = require('./config.json');
const apikey = config.apikey;

// Criação da instância do aplicativo Express
const app = express();

// Configuração do servidor para ouvir na porta 3000
app.listen(3000);

// Middleware para habilitar o CORS
app.use(cors());

// Middleware para analisar solicitações com payload JSON
app.use(express.json());

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para obter dados meteorológicos de uma cidade específica
app.get('/climatempo/:cidade', async (req, res)=>{
    // Extrai o parâmetro da URL que representa o nome da cidade
    const city = req.params.cidade;

    try{
        // Realiza uma requisição à API de previsão do tempo
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=${apikey}&units=metric`);
        
        // Verifica se a resposta da API foi bem-sucedida (status 200)
        if(response.status === 200){
            // Extrai informações relevantes da resposta da API
            const clima = response.data.weather[0].description;
            const climaFormatado = clima.charAt(0).toUpperCase() + clima.slice(1);
            const icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`; 
            const flag = `https://flagsapi.com/${response.data.sys.country}/flat/64.png`;

            // Cria um objeto com os dados do clima a serem enviados como resposta
            const weatherData = {
                Temperatura: response.data.main.temp_min,
                Umidade: response.data.main.humidity,
                VelocidadeDoVento: response.data.wind.speed,
                Clima: climaFormatado,
                Icone: icon,
                Flag: flag
            }

            // Envia os dados do clima como resposta à solicitação
            res.send(weatherData);
        } else {
            // Caso a resposta não tenha sido bem-sucedida, envia uma mensagem de erro
            res.status(response.status).send({erro: 'Erro ao obter dados meteorológicos'})
        }
    } catch(error){
        // Em caso de erro durante a requisição à API, envia uma mensagem de erro detalhada
        res.status(500).send({erro: 'Erro ao obter dados meteorológicos', error});
    }
})
// Importações de módulos: Os módulos express, axios, path, cors e config são importados. O express é o framework utilizado para criar o servidor, axios para fazer requisições HTTP, path para manipulação de caminhos de arquivos e diretórios, cors para habilitar o Cross-Origin Resource Sharing (CORS) e config para carregar configurações, incluindo a chave da API.

// Configuração do servidor: O servidor Express é configurado para ouvir na porta 3000.

// Middlewares: Dois middlewares são configurados usando app.use(). O primeiro é o cors() para habilitar o CORS e permitir requisições de diferentes origens. O segundo é express.json() para analisar solicitações com payload JSON.

// Rota /climatempo/:cidade: Uma rota é definida para responder a solicitações GET para /climatempo/:cidade, onde :cidade é um parâmetro dinâmico representando o nome da cidade.

// Lógica da rota: A função de tratamento de rota é uma função assíncrona que extrai o parâmetro da cidade da URL e realiza uma requisição à API de previsão do tempo usando o módulo Axios.

// Manipulação da resposta da API: Se a resposta da API for bem-sucedida (status 200), os dados relevantes são extraídos e formatados antes de serem enviados como resposta. Caso contrário, uma mensagem de erro é enviada.
// Manipulação de erros: O bloco try...catch é utilizado para capturar erros durante a requisição à API. Se ocorrer um erro, uma mensagem de erro é enviada com um status HTTP 500.

// Envio de respostas: As respostas são enviadas usando res.send() ou res.status().send() dependendo do sucesso da requisição e do tratamento de erros.

---------------------------------------------------------------------------------------------------------------------------------------------------------
SCRIPT.JS-código

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
