## Championship Films

Para executar a aplicação é necessário

  + ASP. Net Core 3.1
  + MongoDB (instalado com as configurações default)
  + NPM

## Executando a API

``` sh
dotnet run --project api/championship-films-api/championship-films-api.csproj
```

## Executando a aplicação Angular

``` sh
cd ui && npm start
```

## Executando os testes da API

``` sh
dotnet test api/championship-films-unit-tests/championship-films-unit-tests.csproj /p: CollectCoverage=true /p: CoverletOutputFormat=lcov /p: CoverletOutput=./lcov.info
```

## Executando os testes de integração da API

  Utilizar o [Postman](https://www.postman.com/) ou [Newman](https://learning.postman.com/docs/postman/collection-runs/command-line-integration-with-newman/)
  
  ### Postman

  + Com o postman basta importar a collection e o environment que estão no diretorio api/championship-films-integration-tests/
  + Desabilitar a opção SSL Certificate Verification nas configurações
  + Executar os testes com o runner selecionando respectivamente a collection e o enviroinment

 
  ### Newman

``` sh
newman run api/championship-films-integration-tests/championship-films.postman_collection.json -e api/championship-films-integration-tests/championship-films-env.postman_environment.json --insecure
```
