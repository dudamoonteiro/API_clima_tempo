# API_clima_tempo

DESCRIÇÃO:
O código abaixo é responsável por consultar o clima de uma cidade a partir do seu nome. A consulta é feita através de uma API local (http://localhost:3000/climatempo/${city}), onde city é o nome da cidade digitado pelo usuário.
Esse código pode ser utilizado para consultar o clima de uma cidade a partir de seu nome. Ele faz uma requisição HTTP para uma API local que retorna informações meteorológicas, como temperatura, umidade, velocidade do vento e descrição do clima atual. O código então exibe essas informações em um formato amigável no navegador.

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

ELEMENTOS DO CÓDIGO QUE ESTÃO SENDO UTILIZADOS:
formClima: formulário que contém o campo de entrada para o nome da cidade.
cityInput: campo de entrada para o nome da cidade.
climaResult: div onde os dados do clima serão exibidos.

OBSERVAÇÕES:
A API usada neste código é local (http://localhost:3000/climatempo/${city}). Para usar uma API externa, basta substituir a URL na linha de código que faz a requisição fetch;
Estamos utilizando um servidor que é configurado para ouvir a porta 3000;
As respostas são enviadas usando res.send() ou res.status().send() dependendo do sucesso da requisição e do tratamento de erros.

ADPTAÇÕES:
O código pode ser modificado,consumindo outras APIs, fazendo com que ele seja útil para outras funções, como a criação de listas(para isso uma api de listas de tarefas deve ser utilizada)



 

  
