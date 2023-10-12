
## TEST TECH DOUGS SE API

## Description
L'API permet de : 
- générer un jeu de données de type Movement[ ] pour chaque mois de l'année (avec des doublons ou pas)
- valider un jeu de données de type Movement[ ], par comparaison avec le solde bancaire réel

## Instructions
Récupérer le répo, puis installer les dépendance et enfin lancer le serveur de développement.

## Installation
`git clone https://github.com/NumericFactory/dougs-test-tech-api.git`

Puis, installer les dépendance
```bash
$ npm install
```

## Lancer le serveur en local

```bash
$ npm run start:dev
```
Accéder à la page d'accueil de l'API sur `localhost:3000`

## Accéder à la documentation de l'API
`localhost:3000/api`

### Les endpoints :
1. Retourne un jeu de données de type Movement [], pour chaque mois
  - `[GET] /movements` (queryParam : withDuplicate - value : true|false)

2. Vérifie et valide un jeu de données de type Movement [], pour un mois précis
  - `[POST] /movements/validation` (body : Array<Movement[ ]>, queryParam : filterByMonth - value : 1-12) 

[API doc](localhost:3000/api) La documentation API sur Swagger.

## Test
```bash
# unit tests
$ npm run test
```
## Author
- Author - [Frederic Lossignol](https://www.linkedin.com/in/flossignol/)

