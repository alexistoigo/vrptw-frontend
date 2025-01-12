# VRPTW Optimization Frontend

![Interface Screenshot](./images/frontend_screenshot.png)

## Descrição
Esta aplicação web em React permite aos usuários inserir pontos de entrega com horários de início e fim para cada endereço, enviar os dados para a API de otimização de rotas (VRPTW) e receber um link do Google Maps com a rota otimizada. A interface possui autenticação simples, formulários intuitivos e é responsiva para dispositivos móveis e desktops.

## Arquitetura
- **React**: Biblioteca principal para construção da interface.
- **React Router**: Gerenciamento de rotas internas (login e formulário).
- **Componentes**:
  - `Login.js`: Tela de autenticação simples com usuário e senha fixos.
  - `RouteForm.js`: Formulário para inserção de origem, destinos e janelas de tempo.
- **Estilização**: CSS moderno e responsivo definido em `App.css`.

## Funcionamento da Aplicação
1. **Login**: Usuário faz login com credenciais fixas.
2. **Formulário de Rotas**: Após o login, o usuário insere a origem e adiciona múltiplos destinos. Para cada destino, define:
   - Endereço
   - Hora Inicial (opcional)
   - Hora Final (opcional)
3. **Envio para API**: Os dados são convertidos e enviados para a API Python via fetch.
4. **Recebimento da Rota**: A aplicação recebe um link do Google Maps com a rota otimizada e o exibe ao usuário.

## Como Utilizar
1. Certifique-se de que a API Python está rodando e acessível.
2. Instale as dependências do frontend:

````bash
  npm install
````

3. Execute a aplicação React:
````bash
  npm start
````

4. Insira a origem e os destinos com horários desejados, clique em "Otimizar Rota" e visualize a rota otimizada pelo link gerado.

## Imagens do Funcionamento

![Route Form Screen](https://i.ibb.co/59KVCF4/route-form.png)
*Formulário de rota com campos para inserir endereços e janelas de tempo.*


![Route Form Screnn](https://i.ibb.co/3C4nTmR/routeform-full.png)
*Formulário de rotas com campos e edereços preenchidos.*

![Route Screen](https://i.ibb.co/Nxwrk5j/trajeto-google-maps.png)
*Trajeto no google maps gerado pela API*