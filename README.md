# Trazabilidad de Productos en la Cadena de Suministro

Este repositorio contiene un proyecto de backend en Node.js y Express, diseñado para gestionar la trazabilidad de productos en la cadena de suministro utilizando Apache Cassandra como base de datos.

El proyecto está configurado para ejecutarse con Docker, simplificando el despliegue en entornos locales o de prueba.

---

## Tecnologías Utilizadas

- Node.js + Express: Backend para la API REST.
- Apache Cassandra: Base de datos NoSQL distribuida para almacenar eventos de trazabilidad.
- Docker & Docker Compose: Contenedores para levantar la aplicación y la base de datos.
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

---

## Exponer Cassandra con Pinggy

Si necesitas acceder a Cassandra desde fuera de tu red local (por ejemplo, para desarrollo remoto o integración), puedes usar Pinggy para exponer el puerto 9042:

```bash
ssh -p 443 -R0:localhost:9042 tcp@free.pinggy.io
```

Esto generará una URL pública que redirige al puerto 9042 de Cassandra. Úsala para conectar clientes externos o herramientas de administración.

---

## Verificar la Base de Datos Cassandra

Para conectarte y verificar la creación de keyspaces y tablas:

1. Accede al contenedor Cassandra:
   ```bash
   docker exec -it cassandra-container cqlsh
   ```
2. Verifica los keyspaces:
   ```sql
   DESCRIBE KEYSPACES;
   ```
3. Verifica la configuración del keyspace supplier:
   ```sql
   DESCRIBE KEYSPACE supplier;
   ```

Puedes agregar comandos CQL en el archivo `init/init.cql` para inicializar la base de datos automáticamente al levantar los contenedores.

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
```

## Migraciones y Seeds en Cassandra

Si usas scripts de migración, agrégalos en `init/init.cql` y se ejecutarán automáticamente al iniciar Cassandra gracias al servicio `cassandra-init` definido en `docker-compose.yaml`.

Para ejecutar scripts adicionales después del despliegue:

```bash
docker exec -it cassandra-container cqlsh -f /ruta/al/script.cql
```

## Documentación de la API

Si has configurado Swagger, puedes acceder a la documentación de los endpoints:

```
http://localhost:3000/api-docs
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

## Integrantes

```
Hugo Sanabria
Gustavo Cano
Carlos Navarro
Jessie Martel
David Morales
```
