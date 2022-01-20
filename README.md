# Curso NodeJS Backend con PostgreSQL

## Comandos básicos de Docker
Comandos utilizados de dockers para los contenedores a utilizar.
Se crea el siguiente archivo YML para los contenedores
```dockerfile
version: '3.3'

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=my_store
      - POSTGRES_USER=richie
      - POSTGRES_PASSWORD=admin123
    ports:
      - 5432:5432
    volumes:
      - ./postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@mail.com
      - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - 5050:80

  mysql:
    image: mysql:5
    environment:
      - MYSQL_DATABASE=my_store
      - MYSQL_USER=root
      - MYSQL_ROOT_PASSWORD=admin1234
      - MYSQL_PORT=3306
    ports:
      - 3307:3306
    volumes:
      - ./mysql_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    environment:
      - MYSQL_ROOT_PASSWORD=admin1234
      - PMA_HOST=mysql
    ports:
    - 8080:80

```

El siguiente comando nos sirve para inicializar los contenedores descritos en el YML
```docker
docker-compose up -d
```

## Migraciones

Just like you use version control systems such as Git to manage changes in your source code, you can use migrations to keep track of changes to the database. With migrations you can transfer your existing database into another state and vice versa: Those state transitions are saved in migration files, which describe how to get to the new state and how to revert the changes in order to get back to the old state.

### Installing the CLI
```nodejs
npm install --save-dev sequelize-cli
```
reference 
https://sequelize.org/master/manual/migrations.html

### Generating a migration
#### Scripts
```json
"migration:generate": "sequelize-cli migration:generate --name",
    "migration:run": "sequelize-cli db:migrate",
    "migration:revert": "sequelize-cli db:migrate:undo",
    "migration:delete": "sequelize-cli db:migrate:undo:all"
```

```nodejs
npm run migration:generate 'name-of-migration'
```
### Running migration
```bash
npm run migration:run
```
