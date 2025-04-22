A Physical Store é uma API REST desenvolvida com NestJS + MongoDB que permite cadastrar lojas físicas e localizar a mais próxima de um CEP, com cálculo de entrega via Motoboy (PDV) ou Melhor Envio (PAC/SEDEX).

Funcionalidades
-CRUD completo de lojas físicas
-Localização da loja mais próxima via CEP
-Cálculo automático de frete (Motoboy ou Melhor Envio)
-Filtros por tipo de loja (PDV ou LOJA)
-Paginação nos endpoints de listagem
-Logs com Winston (JSON + arquivos)
-Testes unitários com Jest
-Documentação Swagger

Exemplo de uso
Buscar a loja mais próxima: GET /store/nearest/01310-100
Listar lojas com filtros: GET /store?type=PDV&limit=5&offset=0

Criar uma nova loja:
POST /store
Content-Type: application/json

{
  "storeName": "Loja Centro",
  "postalCode": "01310-100",
  "address1": "Av. Paulista, 1000",
  "city": "São Paulo",
  "state": "SP",
  "type": "PDV",
  "shippingTimeInDays": 2,
  "latitude": "-23.55",
  "longitude": "-46.63"
}
Tecnologias
NestJS
MongoDB (via Mongoose)
Google Maps API (Geocoding + Distance Matrix)
Melhor Envio API
ViaCEP
Winston (logs)
Jest (testes)
Instalação

1. Clone o projeto
git clone https://github.com/guilhermeJ15/Desafio3_PS.git

2. Instale as dependências
npm install

3. Configure o .env
cp .env.example .env
edite o .env com suas chaves

4. Inicie a aplicação
npm run start:dev
env
PORT=3000
MONGO_URI=ChaveDeAcesso
GOOGLE_MAPS_API_KEY=AIzaSyExemplo123
MELHOR_ENVIO_API_TOKEN=Bearer seu_token_aqui
MELHOR_ENVIO_API_URL=https://www.melhorenvio.com.br/api/v2

Testes

Executar testes
npm run test

Cobertura de testes
npm run test:cov

Documentação Swagger
Acesse: http://localhost:3000/docs

Estrutura de Pastas
src/
├── core/
│   ├── model/store/dto/
│   └── services/
├── modules/store/
│   ├── controllers/
│   ├── repositories/
│   ├── services/
│   ├── tests/
│   └── schemas/
├── common/
│   └── middleware/

Logs
Logs em JSON salvos em logs/app.log e logs/error.log

Logs antigos são limpos automaticamente após 4 dias
