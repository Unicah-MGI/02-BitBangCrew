# Trazabilidad de Productos en la Cadena de Suministro

Este repositorio contiene un proyecto de backend en Node.js y Express, diseñado para gestionar la trazabilidad de productos en la cadena de suministro utilizando Apache Cassandra como base de datos.

El proyecto está configurado para ejecutarse con Docker, simplificando el despliegue en entornos locales o de prueba.

---

## Tecnologías Utilizadas

- Node.js + Express: Backend para la API REST.
- Apache Cassandra: Base de datos NoSQL distribuida para almacenar eventos de trazabilidad.
- Docker & Docker Compose: Contenedores para levantar la aplicación y la base de datos.
- Swagger (OpenAPI): Documentación de los endpoints de la API.

---

## Clonar el Proyecto

Abrir una terminal y ejecutar:

```bash
git clone <URL_DEL_REPOSITORIO>
cd nombre-del-repositorio
```

## Ejecutar el Proyecto con Docker

Instalar Docker Desktop en tu sistema.

Ejecutar los contenedores:

```bash
docker-compose up --build
```

Esto levantará:
- El backend de Node.js
- La base de datos Cassandra

## Acceder a la Aplicación

Una vez los contenedores estén activos, puedes probar la API en tu navegador o usando herramientas como Postman o Insomnia:

```
GET http://localhost:3000/
```

Ejemplo de respuesta:

```
{
  "title": "Trazabilidad de Productos",
  "description": "API REST para gestionar eventos de trazabilidad en la cadena de suministro",
  "version": "1.0.0"
}
```

## Base de Datos

### Ejecutar Migraciones en Cassandra

```bash
npm run db:migrate
```

### Ejecutar Seeds

Para todas las seeds:

```bash
npm run db:seed:all
```

Para una seed específica:

```bash
npx sequelize db:seed --seed archivo.js --seeders-path src/seeders --config src/config/config.js
```

(Ajusta la configuración según tu estructura si no usas Sequelize, este es un ejemplo de referencia)

## Documentación de la API

Si has configurado Swagger, puedes acceder a la documentación de los endpoints:

```
http://localhost:<PUERTO>/api-docs
```

Allí encontrarás todos los endpoints, parámetros y ejemplos de request/response.

## Notas de Desarrollo

Por el momento no se implementa autenticación, colas de eventos, visualización de datos, logging ni monitoreo.

El frontend aún está por definir; actualmente el proyecto solo incluye el backend y la base de datos.

## Estructura del Proyecto

```
/src
  /controllers
  /models
  /routes
  /seeders
  /config
docker-compose.yml
package.json
README.md
```

## Contribuciones

Si quieres contribuir al proyecto, por favor abre un pull request o crea un issue para discutir los cambios.
