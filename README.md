
# Dougs - Test tech Dev SE
## API Validation de synchronisation bancaire

### Author
- Auteur / Candidat - [Frederic Lossignol](https://www.linkedin.com/in/flossignol/)

### Description
L'API permet de générer des données (mouvements bancaires synchronisés), et de **vérifier leur validité** par comparaison avec une source de vérité que sont les soldes des relevés bancaires

## Instructions

**Récupérer le projet**
```bash
git clone https://github.com/NumericFactory/dougs-test-tech-api.git
```

**Puis, installer les dépendances**
```bash
npm install
```
**Lancer le serveur**
```bash
npm run start:dev
```

## Lancer les tests unitaires
```bash
# unit tests
npm run test
```

**Tester l'API sur Swagger**
http://localhost:3000/api

---------------------

### Data types

- `Movement`  { **id**: number, **date**: Date, **wording**: string, **amount**: number }
- `BankStatement`  { **id**: number, **date**: Date, **balance**: number }


### Base URL

The base URL for all API requests is : 
`http://localhost:3000`

### Endpoints 1/2

#### `GET /data-from-sync`

Returns a an object of 2 data : 
- **movements**: Movement [ ]
- **bankStatements**: BankStatement [ ] * 

*BankStatements are computed with clean Movement[ ] 
*(NO duplicate or missing entries)*

#### Parameters

`startAt` (optional, string)
the beginning date for movements generation. Default is `2023-01-01`

`withDuplicate` (optional, boolean)
if value is TRUE, the api return a Movement [ ] with 10 duplicate entries

`withMissing` (optional, boolean)
if value is TRUE, the api return a Movement [ ] with 5 missing entries


#### Response

Returns a JSON object with the following properties:

- **movements**: An array of  Movement objects, each with the following properties : 
  - `id` the unique identier of the Movement
  - `date` the date of the movement
  - `wording` the label of the movement
  - `amount` : the amount of the movement

- **bankStatements**: An array of BankStatement object, each with the following properties : 
  - `id` the unique identier of the BankStatement
  - `date` the date of the BankStatement
  - `balance` : the balance of the BankStatement

#### Example

**Request** :
GET /data-from-sync?startAt=2023-09-01

**Response**:

JSON

```json
{
  "movements": [
    {
      "id": 9,
      "date": "2023-10-05T23:51:25.842Z",
      "wording": "paiement",
      "amount": 1000.00
    },
    {
      "id": 8,
      "date": "2023-10-02T11:00:54.851Z",
      "wording": "facture",
      "amount": -300.00
    },
  ],
  "bankStatements": [
    {
      "id": 2,
      "date": "2023-10-06T21:59:59.999Z",
      "balance": 700.00
    }
  ]
}

```

### Errors

This API uses the following error codes:
- `400 Bad Request`: The request was malformed or missing required parameters.
- `500 Internal Server Error`: An unexpected error occurred on the server.

### Tester l'API sur Swagger
[localhost:3000/api](http://localhost:3000/api)





-------------------





### Endpoints 2/2

#### `POST /api/movements/validate`

Returns a 202 "Accepted" or a 418 error "I'm a teapot" (with reasons of error)

#### BODY Parameters

an object with 2 properties : 
- `movements` (required, Movement[]) An array of movements

- `bankStatements` (required, BankStatement[]) An array of bank statements

### Querystring Parameters

`removeDuplicateEntries` (optional, boolean)
if TRUE, the API removed duplicates movement before, and verify if synchronization is valid

#### Example

**Request** :
POST /api/movements/validation

#### Response
- `202 {message : Accepted!}` : Api response if syncrhonization is valid
 
### Errors
This API uses the following error codes:
- `418 I'm a teapot!` : Api response if syncrhonization is not valid 


```json
{
  "response": {
    "message": "i'm a teapot",
    "reasons": [
      {
        "date": "2023-10-06T21:59:59.999Z",
        "isSyncValid": true,
        "isduplicateEntriesFound": false,
        "isMissingEntries": false
      },
      {
        "date": "2023-09-06T21:59:59.999Z",
        "isSyncValid": false,
        "isduplicateEntriesFound": true,
        "isMissingEntries": false
      },
      {
        "date": "2023-08-06T21:59:59.999Z",
        "isSyncValid": false,
        "isduplicateEntriesFound": false,
        "isMissingEntries": true
      }
    ]
  }
}
```
- `400 Bad Request`: The request was malformed or missing required parameters.
- `500 Internal Server Error`: An unexpected error occurred on the server.

### Tester l'API sur Swagger
[localhost:3000/api](http://localhost:3000/api)

![Dougs test tech - Frederic Lossginol](https://github.com/NumericFactory/dougs-test-tech-api/blob/main/capture-swagger.png?raw=true)
