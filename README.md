
# Dougs - Test tech Dev SE
## API Validation de synchronisation bancaire

### Author
- Author - [Frederic Lossignol](https://www.linkedin.com/in/flossignol/)

### Description
L'API permet de générer des données (mouvements bancaires synchronisés), et vérifier leur validitité par comparaison avec une source de vérité que sont les soldes des relevés bancaires

## Instructions
Récupérer le répo, puis installer les dépendance et enfin lancer le serveur de développement.

**Installation**
`git clone https://github.com/NumericFactory/dougs-test-tech-api.git`

**Puis, installer les dépendance**
```bash
$ npm install
```
**Lancer le serveur en local**
```bash
$ npm run start:dev
```
---------------------

### Types des données 

`Movement`  { id: number, date: Date, wording: String, amount: number }
`BankStatement`  { id: number, date: Date, balance: number }


### Base URL

The base URL for all API requests is : 
`http://localhost:3000`

### Endpoints

#### GET /data-from-sync

Returns a an object of 2 data : 
- **movements**: Movement [ ]
- **bankStatements**: BankStatement [ ] * 

*BankStatements are computed with clean Movement[ ] 
*(NO duplicate or missing entries)*

#### Parameters

**startAt** (optional, string)
the beginning date for movements generation. Default is `2023-01-01`

**withMissing** (optional, boolean)
if value is TRUE, the api return a Movement [ ] with 5 missing entries

**withDuplicate** (optional, boolean)
if value is TRUE, the api return a Movement [ ] with 10 duplicate entries

#### Response

Returns a JSON object with the following properties:

**movements**: An array of  Movement objects, each with the following properties : 
- `id` the unique identier of the Movement
- `date` the date of the movement
- `wording` the label of the movement
- `amount` : the amount of the movement

**bankStatements**: An array of BankStatement object, each with the following properties : 
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
      "date": "2023-10-09T23:51:25.842Z",
      "wording": "paiement",
      "amount": -308.73
    },
    {
      "id": 8,
      "date": "2023-10-09T11:00:54.851Z",
      "wording": "facture",
      "amount": -279.62
    },
    {
      "id": 7,
      "date": "2023-10-05T01:54:16.957Z",
      "wording": "retrait",
      "amount": -193.29
    },
    {
      "id": 6,
      "date": "2023-09-23T18:31:38.608Z",
      "wording": "paiement",
      "amount": -311.9
    },
    {
      "id": 5,
      "date": "2023-09-17T17:28:28.267Z",
      "wording": "Facture client payée",
      "amount": 2919.07
    },
    {
      "id": 4,
      "date": "2023-09-12T22:43:16.818Z",
      "wording": "dépôt",
      "amount": -227.21
    },
    {
      "id": 3,
      "date": "2023-09-09T03:43:08.236Z",
      "wording": "paiement",
      "amount": -153.52
    },
    {
      "id": 2,
      "date": "2023-09-07T01:43:03.180Z",
      "wording": "facture",
      "amount": -306.13
    },
    {
      "id": 1,
      "date": "2023-09-02T21:05:13.350Z",
      "wording": "Facture client payée",
      "amount": 2243.57
    }
  ],
  "bankStatements": [
    {
      "id": 2,
      "date": "2023-10-06T21:59:59.999Z",
      "balance": 3970.59
    },
    {
      "id": 1,
      "date": "2023-09-06T21:59:59.999Z",
      "balance": 2243.57
    }
  ]
}

```



### Errors

This API uses the following error codes:
400 Bad Request: The request was malformed or missing required parameters.

[API doc](localhost:3000/api) Tester l'API sur Swagger.

## Test
```bash
# unit tests
$ npm run test
```


