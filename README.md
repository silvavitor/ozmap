# Descrição

Estamos ansiosos para ver sua implementação e criatividade em ação! Boa sorte e que a força do código esteja com você! 🚀

O sistema foi desenvolvido priorizando o desacoplamento de camadas, para isso temos repositories e suas interfaces que possibilitam a alteração da fonte de dados(muito útil para mockar para os testes), factories para criar os controllers e useCases e injetar suas dependências. A parte mais externa da regra de negócio são os controllers, que podem ser utilizados pelo “server”(independente de framework/biblioteca). A parte mais interna são as regras de negócios que ficam em um useCase, esse não sabe quem o chama e não sabe como a fonte de dados pega os valores que necessita, apenas executa os passos para realizar a tarefa.

A parte de implementacao(server) foi construída com express e a ali de geolocalização utilizada foi a do Google Maps.

# Para rodar

```
docker-compose up --build
```

e acessar `http://localhost:3000`, é necessário configurar a chave de api do Google.

# Para testar

```
yarn test
```

# API de Usuários

## Endpoints

<details>
  <summary>Criar Usuário - POST /users/</summary>
  
  **Descrição:** Cria um novo usuário no sistema.  
  **Body:**  
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "address": {
      "street": "Main St",
      "neighborhood": "Downtown",
      "number": 123,
      "state": "Anystate",
      "zipCode": "12345",
      "country": "Country",
    },
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.006,
    }
  }  
  ```
  **Resposta de Sucesso (201):**  
  ```json
  {
    "id": "123",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "address": {
      "street": "Main St",
      "neighborhood": "Downtown",
      "number": 123,
      "state": "Anystate",
      "zipCode": "12345",
      "country": "Country",
    },
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.006,
    }
  }
  ```
</details>

<details>
  <summary>Listar Usuários - GET /users/</summary>
  
  **Descrição:** Retorna uma lista de usuários paginada.  
  **Query Params:**  
  - `skip`: Número de usuários a pular (opcional).  
  - `limit`: Número de usuários a retornar (opcional).  
  **Exemplo de Requisição:** `/users/?skip=0&limit=10`  
  **Resposta de Sucesso (200):**
  ```json
  {
    "total": 2,
    "users": [
      {
        "id": "123",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "address": {
          "street": "Main St",
          "neighborhood": "Downtown",
          "number": 123,
          "state": "Anystate",
          "zipCode": "12345",
          "country": "Country",
        },
        "coordinates": {
          "latitude": 40.7128,
          "longitude": -74.006,
        }
      },
      {
        "id": "124",
        "name": "Jane",
        "email": "jane@example.com",
        "address": {
          "street": "Main St",
          "neighborhood": "Downtown",
          "number": 123,
          "state": "Anystate",
          "zipCode": "12345",
          "country": "Country",
        },
        "coordinates": {
          "latitude": 40.7128,
          "longitude": -74.006,
        }
      }
    ]
  }  
  ```  
  {
    "total": 2,
    "users": [
      {
        "id": "123",
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      {
        "id": "124",
        "name": "Jane Smith",
        "email": "jane.smith@example.com"
      }
    ]
  }
</details>

<details>
  <summary>Buscar Usuário por ID - GET /users/:id</summary>
  
  **Descrição:** Retorna os detalhes de um usuário específico.  
  **Parâmetro de URL:**  
  - `id`: ID do usuário.  
  **Resposta de Sucesso (200):**  
  ```json
  {
    "name": "John Updated",
    "email": "john.updated@example.com",
    "address": {
      "street": "Main St",
      "neighborhood": "Downtown",
      "number": 123,
      "state": "Anystate",
      "zipCode": "12345",
      "country": "Country",
    },
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.006,
    }
  }  
  ```
</details>

<details>
  <summary>Atualizar Usuário - PATCH /users/:id</summary>
  
  **Descrição:** Atualiza os dados de um usuário específico.  
  **Parâmetro de URL:**  
  - `id`: ID do usuário.  
  **Body:**  
  ```json
  {
    "name": "John Updated",
    "email": "john.updated@example.com",
    "address": {
      "street": "Main St",
      "neighborhood": "Downtown",
      "number": 123,
      "state": "Anystate",
      "zipCode": "12345",
      "country": "Country",
    },
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.006,
    }
  }  
  ```
  **Resposta de Sucesso (200):**  
  ```json 
  {
    "id": "123",
    "name": "John Updated",
    "email": "john.updated@example.com",
    "address": {
      "street": "Main St",
      "neighborhood": "Downtown",
      "number": 123,
      "state": "Anystate",
      "zipCode": "12345",
      "country": "Country",
    },
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.006,
    }
  }
  ```
</details>

<details>
  <summary>Deletar Usuário - DELETE /users/:id</summary>
  
  **Descrição:** Remove um usuário do sistema.  
  **Parâmetro de URL:**  
  - `id`: ID do usuário.  
  **Resposta de Sucesso (204):**  
  Sem conteúdo.
</details>

# API de Regiões

## Endpoints

<details>
  <summary>Criar Região - POST /regions/</summary>
  
  **Descrição:** Cria uma nova região no sistema.  
  **Body:**  
  ```json
  {
    "name": "Região Central",
    "userId": "123",
    "coordinates": [
      [
        {
          "latitude": -23.55052,
          "longitude": -46.633308
        },
        {
          "latitude": -23.551,
          "longitude": -46.634
        }
      ]
    ]
  }  
  ```
  **Resposta de Sucesso (201):**  
  ```json
  {
    "name": "Região Central",
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "address": {
        "street": "123 Main St",
        "number": 10,
        "neighborhood": "Centro",
        "state": "SP",
        "zipCode": "12345-678",
        "country": "Brasil"
      },
      "coordinates": {
        "latitude": -23.55052,
        "longitude": -46.633308
      }
    },
    "coordinates": [
      [
        {
          "latitude": -23.55052,
          "longitude": -46.633308
        },
        {
          "latitude": -23.551,
          "longitude": -46.634
        }
      ]
    ]
  }  
```
</details>

<details>
  <summary>Listar Regiões - GET /regions/</summary>
  
  **Descrição:** Retorna uma lista de regiões paginada.  
  **Query Params:**  
  - `skip`: Número de registros a pular (opcional).  
  - `limit`: Número de registros a retornar (opcional).  
  **Exemplo de Requisição:** `/regions/?skip=0&limit=10`  
  **Resposta de Sucesso (200):**
  ```json  
  {
    "total": 2,
    "skip": 0,
    "regions": [
      {
        "id": "100",
        "name": "Região Central",
        "user": {
          "id": "123",
          "name": "John Doe",
          "email": "john.doe@example.com",
          "address": {
            "street": "123 Main St",
            "number": 10,
            "neighborhood": "Centro",
            "state": "SP",
            "zipCode": "12345-678",
            "country": "Brasil"
          },
          "coordinates": {
            "latitude": -23.55052,
            "longitude": -46.633308
          }
        },
        "coordinates": [
          [
            {
              "latitude": -23.55052,
              "longitude": -46.633308
            },
            {
              "latitude": -23.551,
              "longitude": -46.634
            }
          ]
        ]
      },
      {
        "id": "101",
        "name": "Região Norte",
        "user": {
          "id": "123",
          "name": "John Doe",
          "email": "john.doe@example.com",
          "address": {
            "street": "123 Main St",
            "number": 10,
            "neighborhood": "Centro",
            "state": "SP",
            "zipCode": "12345-678",
            "country": "Brasil"
          },
          "coordinates": {
            "latitude": -23.55052,
            "longitude": -46.633308
          }
        },
        "coordinates": [
          [
            {
              "latitude": -23.55052,
              "longitude": -46.633308
            },
            {
              "latitude": -23.551,
              "longitude": -46.634
            }
          ]
        ]
      } 
    ]
  }
  ```
</details>

<details>
  <summary>Buscar Região por ID - GET /regions/:id</summary>
  
  **Descrição:** Retorna os detalhes de uma região específica.  
  **Parâmetro de URL:**  
  - `id`: ID da região.  
  **Resposta de Sucesso (200):**  
  ```json
  {
    "id": "100",
    "name": "Região Central",
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "address": {
        "street": "123 Main St",
        "number": 10,
        "neighborhood": "Centro",
        "state": "SP",
        "zipCode": "12345-678",
        "country": "Brasil"
      },
      "coordinates": {
        "latitude": -23.55052,
        "longitude": -46.633308
      }
    },
    "coordinates": [
      [
        {
          "latitude": -23.55052,
          "longitude": -46.633308
        },
        {
          "latitude": -23.551,
          "longitude": -46.634
        }
      ]
    ]
  }
  ```
</details>

<details>
  <summary>Buscar Região por Coordenadas - GET /regions/coordinates</summary>
  
  **Descrição:** Retorna as regiões que incluem as coordenadas fornecidas.  
  **Query Params:**  
  - `skip`: Número de registros a pular (opcional).  
  - `limit`: Número de registros a retornar (opcional).  
  **Body:**  
  ```json
  {
    "coordinates": {
      "latitude": -23.55052,
      "longitude": -46.633308
    }
  }  
  ```
  **Resposta de Sucesso (200):**  
  ```json
  {
    "total": 1,
    "skip": 0,
    "regions": [
      {
        "id": "100",
        "name": "Região Central",
        "user": {
          "id": "123",
          "name": "John Doe",
          "email": "john.doe@example.com",
          "address": {
            "street": "123 Main St",
            "number": 10,
            "neighborhood": "Centro",
            "state": "SP",
            "zipCode": "12345-678",
            "country": "Brasil"
          },
          "coordinates": {
            "latitude": -23.55052,
            "longitude": -46.633308
          }
        },
        "coordinates": [
          [
            {
              "latitude": -23.55052,
              "longitude": -46.633308
            },
            {
              "latitude": -23.551,
              "longitude": -46.634
            }
          ]
        ]
      }
    ]
  }
  ```
</details>

<details>
  <summary>Buscar Região por Distância de Coordenadas - GET /regions/coordinates/distance</summary>
  
  **Descrição:** Retorna as regiões dentro de uma distância especificada das coordenadas fornecidas.  
  **Query Params:**  
  - `skip`: Número de registros a pular (opcional).  
  - `limit`: Número de registros a retornar (opcional).  
  **Body:** 
  ```json
  {
    "coordinates": {
      "latitude": -23.55052,
      "longitude": -46.633308
    },
    "distance": 1000 // metros
  }  
  ``` 
  **Resposta de Sucesso (200):**  
  ```json
  {
    "total": 1,
    "skip": 0,
    "regions": [
      {
        "id": "100",
        "name": "Região Central",
        "user": {
          "id": "123",
          "name": "John Doe",
          "email": "john.doe@example.com",
          "address": {
            "street": "123 Main St",
            "number": 10,
            "neighborhood": "Centro",
            "state": "SP",
            "zipCode": "12345-678",
            "country": "Brasil"
          },
          "coordinates": {
            "latitude": -23.55052,
            "longitude": -46.633308
          }
        },
        "coordinates": [
          [
            {
              "latitude": -23.55052,
              "longitude": -46.633308
            },
            {
              "latitude": -23.551,
              "longitude": -46.634
            }
          ]
        ]
      }
    ]
  }
  ```
</details>

<details>
  <summary>Atualizar Região - PATCH /regions/:id</summary>
  
  **Descrição:** Atualiza os dados de uma região específica.  
  **Parâmetro de URL:**  
  - `id`: ID da região.  
  **Body:**  
  ```json
  {
    "name": "Região Atualizada",
    "coordinates": [
      [
        {
          "latitude": -23.55052,
          "longitude": -46.633308
        },
        {
          "latitude": -23.552,
          "longitude": -46.635
        }
      ]
    ]
  }  
  ```
  **Resposta de Sucesso (200):** 
  ```json
  {
    "id": "100",
    "name": "Região Atualizada",
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "address": {
        "street": "123 Main St",
        "number": 10,
        "neighborhood": "Centro",
        "state": "SP",
        "zipCode": "12345-678",
        "country": "Brasil"
      },
      "coordinates": {
        "latitude": -23.55052,
        "longitude": -46.633308
      }
    },
    "coordinates": [
      [
        {
          "latitude": -23.55052,
          "longitude": -46.633308
        },
        {
          "latitude": -23.552,
          "longitude": -46.635
        }
      ]
    ]
  }
  ```
</details>

<details>
  <summary>Deletar Região - DELETE /regions/:id</summary>
  
  **Descrição:** Remove uma região do sistema.  
  **Parâmetro de URL:**  
  - `id`: ID da região.  
  **Resposta de Sucesso (204):**  
  Sem conteúdo.
</details>
