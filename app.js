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
