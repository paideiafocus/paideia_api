# Informações

## Comandos

### Inicio

Inicializa package.json: `yarn init`

Inicializa typescript: `yarn tsc --init`

### Typeorm:

Criar migration: `yarn typeorm migration:create -n MigrationName`

Executar migration: `yarn typeorm migration:run`

Reverter migration: `yarn typeorm migration:revert`

### Tests:

Arquivo configuração jest: `yarn jest --init`

Executar testes: `yarn test`

- Script executar teste (Windows): `set NODE_ENV=test jest`
- Script executar teste (Linux/Mac): `NODE_ENV=test jest`

## Controllers métodos:

- index: Listar todos registros;
- show: Exibir um registro;
- store: Criar novo registro;
- update: Alterar um registro;
- destroy: Remover um registro;
